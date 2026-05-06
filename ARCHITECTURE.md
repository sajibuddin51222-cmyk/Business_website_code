# 🏗️ Architecture & Deployment Overview

## Single Domain Deployment (Easiest)

```
┌─────────────────────────────────────────────────────────┐
│                   yoursite.vercel.app                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  PUBLIC PAGES (/) + ADMIN PANEL (/admin)                │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Next.js 15 Application                          │   │
│  │  ├─ App Router (app/)                            │   │
│  │  ├─ Pages:                                       │   │
│  │  │  ├─ / (homepage)                              │   │
│  │  │  ├─ /portfolio/[id]                           │   │
│  │  │  ├─ /our-team                                 │   │
│  │  │  ├─ /admin/* (protected)                      │   │
│  │  │  └─ /[slug] (CMS pages)                       │   │
│  │  └─ API Routes:                                  │   │
│  │     ├─ /api/projects/*                           │   │
│  │     ├─ /api/services                             │   │
│  │     ├─ /api/admin/* (protected)                  │   │
│  │     └─ /api/send-email                           │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Middleware/Protection                           │   │
│  │  ├─ JWT Auth on /admin/*                         │   │
│  │  ├─ Token verification on API                    │   │
│  │  └─ HTTP-only cookies                            │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
└─────────────────────────────────────────────────────────┘
                          ↓
        ┌─────────────────────────────────────┐
        │    PostgreSQL Database              │
        │  ┌─────────────────────────────────┐│
        │  │ Tables:                         ││
        │  │ ├─ Users (admin)                ││
        │  │ ├─ Projects                     ││
        │  │ ├─ Services                     ││
        │  │ ├─ TeamMembers                  ││
        │  │ ├─ ProjectRequests              ││
        │  │ ├─ Pages (CMS)                  ││
        │  │ └─ ... (9 total)                ││
        │  └─────────────────────────────────┘│
        └─────────────────────────────────────┘
```

## Separate Domain Deployment (Production)

```
                    Shared PostgreSQL Database
                            ↓
        ┌───────────────────────────────────────────┐
        │  (same DATABASE_URL)                      │
        │  Contains all projects, team, etc.        │
        └───────────────────────────────────────────┘
           ↑                              ↑
           │                              │
    ┌──────┴──────┐                ┌──────┴──────┐
    │             │                │             │
┌───────────────────────┐    ┌──────────────────────┐
│ yoursite.vercel.app   │    │ admin.yoursite.com   │
├───────────────────────┤    ├──────────────────────┤
│   PUBLIC SITE         │    │   ADMIN PANEL        │
│  (Different Vercel    │    │  (Different Vercel   │
│   Project/Deployment) │    │   Project/Deployment)│
│                       │    │                      │
│ ✓ Pages              │    │ ✓ Admin Dashboard    │
│ ✓ Portfolio          │    │ ✓ Content Management │
│ ✓ Team               │    │ ✓ Forms             │
│ ✓ Services           │    │ ✓ Analytics         │
│ ✓ Contact            │    │ ✓ Settings          │
│                       │    │                      │
│ Can cache content     │    │ Always fresh         │
│ High traffic okay     │    │ Restricted access    │
│                       │    │ Better security      │
└───────────────────────┘    └──────────────────────┘
```

---

## Data Flow: How Admin Panel Works

```
Admin User Opens Browser
        ↓
    /admin/login (Public)
        ↓
    Enters email + password
        ↓
POST /api/admin/auth/login
        ↓
    ├─ Check credentials in Users table
    ├─ Hash password with bcrypt
    ├─ Generate JWT token
    ├─ Set HTTP-only cookie
    └─ Return success
        ↓
    Redirect to /admin (Protected)
        ↓
    Browser includes cookie in requests
        ↓
GET /api/admin/dashboard-stats
        ↓
    ├─ Check cookie token
    ├─ Verify JWT signature
    ├─ Load stats from database
    └─ Return JSON
        ↓
    Admin sees dashboard with counts
        ↓
Admin clicks "Manage Projects"
        ↓
GET /api/projects
        ↓
    Return all projects (no auth needed for get)
        ↓
    Admin sees list in UI
        ↓
Admin clicks "Edit" on a project
        ↓
POST /api/projects/[id]
        ↓
    ├─ Check auth token
    ├─ Validate data
    ├─ Update database
    └─ Return updated project
        ↓
    UI updates with new data
        ↓
Admin sees confirmation toast
```

---

## Authentication Flow

```
┌─────────────────────────────────────────┐
│         JWT + HTTP-Only Cookies         │
├─────────────────────────────────────────┤
│                                         │
│ 1. Admin logs in                        │
│    └─ POST /api/admin/auth/login       │
│       ├─ Hash password (bcrypt)        │
│       ├─ Generate JWT token            │
│       └─ Set cookie: admin_token      │
│                                         │
│ 2. Browser stores HTTP-only cookie     │
│    └─ Automatic with each request      │
│       ├─ Not accessible via JS         │
│       ├─ Only sent to API endpoints    │
│       └─ Expires in 24 hours           │
│                                         │
│ 3. Admin accesses /admin               │
│    └─ useEffect runs checkAuth()       │
│       ├─ GET /api/admin/auth/me        │
│       ├─ Sends cookie automatically    │
│       ├─ Verify JWT token             │
│       └─ Redirect if unauthorized      │
│                                         │
│ 4. Admin modifies data                 │
│    └─ POST /api/projects               │
│       ├─ Cookie sent in request        │
│       ├─ Verify JWT signature         │
│       ├─ Update database               │
│       └─ Return 200 OK                 │
│                                         │
│ 5. Admin logs out                      │
│    └─ POST /api/admin/auth/logout      │
│       └─ Delete cookie                 │
│                                         │
└─────────────────────────────────────────┘
```

---

## Environment Variables Explained

```
┌──────────────────────────────────────────────────────┐
│                 VERCEL DASHBOARD                     │
│              (Settings → Environment)                │
├──────────────────────────────────────────────────────┤
│                                                      │
│ DATABASE_URL                                        │
│ ├─ What: PostgreSQL connection string               │
│ ├─ Where: Supabase / Railway / Neon                │
│ ├─ Format: postgresql://user:pass@host:port/db     │
│ ├─ Used by: Prisma, all database queries           │
│ └─ ⚠️  NEVER commit to git                          │
│                                                      │
│ JWT_SECRET                                          │
│ ├─ What: Secret key for signing JWT tokens         │
│ ├─ How: Generate at uuidgenerator.net              │
│ ├─ Used by: Auth service, login/session           │
│ ├─ Length: Min 32 chars (use full UUID)            │
│ └─ ⚠️  CHANGE from default!                         │
│                                                      │
│ NODE_ENV                                            │
│ ├─ What: Environment type                          │
│ ├─ Value: "production" (for Vercel)               │
│ ├─ Used by: Next.js build optimization             │
│ └─ Default: auto-set by Vercel                    │
│                                                      │
│ OPTIONAL (for email):                              │
│ SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## File Structure: What Runs Where

```
┌─────────────────────────────────────────────────┐
│     VERCEL DEPLOYMENT (Both options use this)    │
├─────────────────────────────────────────────────┤
│                                                 │
│  app/                       (Next.js App)       │
│  ├─ page.tsx               → / (Homepage)       │
│  ├─ layout.tsx             → Root layout        │
│  ├─ admin/                 → /admin/* (CMS)     │
│  │  ├─ page.tsx            → Dashboard          │
│  │  ├─ projects/           → Manage projects    │
│  │  ├─ services/           → Manage services    │
│  │  └─ ...                                      │
│  └─ api/                   → API Routes         │
│     ├─ projects/           → CRUD projects      │
│     ├─ admin/auth/         → Login/logout       │
│     └─ ...                                      │
│                                                 │
│  components/               (React Components)   │
│  ├─ Hero.tsx              → Animated hero       │
│  ├─ Services.tsx          → Services section    │
│  ├─ Portfolio.tsx         → Projects section    │
│  └─ ...                                         │
│                                                 │
│  lib/                      (Utilities)          │
│  ├─ backend/              → Database services   │
│  ├─ db.ts                 → Prisma client       │
│  ├─ animations.ts         → GSAP setup          │
│  └─ ...                                         │
│                                                 │
│  prisma/                   (Database Schema)    │
│  ├─ schema.prisma         → Database models     │
│  ├─ seed.ts               → Sample data         │
│  └─ dev.db                → Local database      │
│                                                 │
│  public/                   (Static Assets)      │
│  └─ (images, logo, etc.)                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Deployment Checklist

### Before Deployment
- [ ] Code pushed to GitHub
- [ ] DATABASE_URL ready
- [ ] JWT_SECRET generated
- [ ] All env vars documented

### After Deployment  
- [ ] Site loads without errors
- [ ] Database initialized
- [ ] Admin user created
- [ ] Can login to /admin
- [ ] Can create/edit/delete content
- [ ] Images load correctly

### Production
- [ ] Domain configured
- [ ] HTTPS working (automatic)
- [ ] Analytics enabled
- [ ] Backups configured
- [ ] Team invited to admin

---

## Key Features by Component

| Component | Built With | Features |
|-----------|-----------|----------|
| Hero | GSAP + Framer | Animations, parallax, typing effect |
| Services | React | Dynamic list, filtering |
| Portfolio | React | Image gallery, tags, modal |
| Admin | React + Forms | CRUD operations, auth |
| Database | Prisma + PostgreSQL | 10 models, relationships |
| Auth | JWT + bcrypt | Secure sessions, hashed passwords |
| Email | Nodemailer | Contact form integration |
| Analytics | Vercel + GSAP | Built-in tracking |
| Styling | Tailwind + Radix | 40+ components, dark mode |

---

**Understanding the architecture helps with troubleshooting and future enhancements!**

