# 🚀 FusionBytePro Deployment Guide - Vercel

## Setup Overview

This project is deployed on Vercel with the following structure:
- **Main Site**: Your public website (homepage, portfolio, team, etc.)
- **Admin Panel**: Content management dashboard (separate deployment or same app)

---

## ✅ Pre-Deployment Checklist

### 1. **Database Setup (Required)**
- [ ] Create a PostgreSQL database (use Railway, Supabase, or Neon)
- [ ] Get your `DATABASE_URL`

### 2. **Environment Variables**
Set these in Vercel Project Settings → Environment Variables:

```
DATABASE_URL=postgresql://[your-db-url]
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=production
```

Optional (for email):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. **Run Database Migrations**
After first deployment, run:
```bash
npx prisma migrate deploy
npx prisma db seed
```

---

## 📦 Deployment Options

### **Option 1: Single Vercel Deployment (Recommended for Beginners)**

Both site and admin panel on the same domain:
- Site: `https://yoursite.vercel.app/`
- Admin: `https://yoursite.vercel.app/admin`
- Admin API: `https://yoursite.vercel.app/api/admin/*`

**Pros:**
- Simpler setup
- Single database
- Shared authentication

**Steps:**
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy!

---

### **Option 2: Separate Admin Deployment (Recommended for Production)**

Admin panel on a separate Vercel project:
- Site: `https://yoursite.vercel.app/`
- Admin: `https://admin.yoursite.vercel.app/`
- API: Shared database (same DATABASE_URL)

**Pros:**
- Independent scaling
- Separate analytics
- Better security (can restrict admin domain)

**Setup Steps:**

#### A. Deploy Main Site First
1. Create Vercel project for main site
2. Set environment variables
3. Deploy

#### B. Create Separate Admin Deployment
1. Create a new GitHub branch: `admin-deployment`
2. In that branch, set up Vercel to deploy only admin routes
3. Use same DATABASE_URL
4. Deploy to `admin.[yoursite].com`

**Implementation:**
Create `vercel.json` in root:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

---

## 🔧 Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Session encryption key | Random 32+ char string |
| `NODE_ENV` | Environment | `production` |
| `SMTP_*` | Email sending (optional) | Gmail/SendGrid credentials |

---

## 🚨 Common Deployment Errors & Solutions

### Error: "DATABASE_URL is not set"
**Solution:** Add `DATABASE_URL` to Vercel environment variables

### Error: "Cannot find module"
**Solution:** Run `npm install` locally, commit `package-lock.json`

### Error: "TypeScript errors during build"
**Solution:** Already ignored via `next.config.mjs`, but check imports

### Error: "Images not loading"
**Solution:** Ensure images use relative paths or add domains in `next.config.mjs`

---

## 📊 Post-Deployment Setup

### 1. **Initialize Database**
After first deploy, go to Vercel deployment logs and run:
```bash
npx prisma db push
npx prisma db seed
```

### 2. **Create First Admin User**
You can use Prisma Studio to create users:
```bash
npx prisma studio
```

Or create via API (temporary endpoint):
```bash
POST /api/admin/auth/register
{
  "email": "admin@yoursite.com",
  "password": "securepassword",
  "name": "Admin Name"
}
```

### 3. **Access Admin Panel**
- Main Site: `https://yoursite.vercel.app/`
- Admin Login: `https://yoursite.vercel.app/admin/login`

---

## 🔐 Security Best Practices

1. **Change JWT_SECRET**
   - Generate strong random string
   - Don't commit to git
   - Use Vercel secret rotation

2. **Database Security**
   - Use SSL connections
   - Restrict access to admin IPs (if possible)
   - Regular backups

3. **Admin Access**
   - Strong passwords
   - Consider IP whitelisting
   - Monitor login attempts

---

## 📈 Monitoring & Maintenance

### View Logs
```bash
vercel logs
```

### Database Optimization
```bash
npx prisma generate
npx prisma db execute
```

### Update Dependencies
```bash
npm update
npm audit fix
```

---

## 🆘 Getting Help

If deployment fails:
1. Check Vercel logs: `vercel logs`
2. Verify environment variables are set
3. Ensure DATABASE_URL is valid
4. Check build output for TypeScript errors
5. Review Next.js deployment docs: https://nextjs.org/docs/deployment

