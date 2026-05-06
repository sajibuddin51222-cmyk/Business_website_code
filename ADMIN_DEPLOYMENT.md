# Admin Panel Deployment Guide

## 🎯 Admin Panel Setup Options

Your admin panel can be deployed in **two ways**:

### Option A: Same Domain (Simple)
```
Main Site: https://yoursite.vercel.app/
Admin: https://yoursite.vercel.app/admin
Login: https://yoursite.vercel.app/admin/login
```

**Pros:**
- Simplest setup
- One deployment
- Shared resources
- One database

**Steps:**
1. Deploy normally to Vercel
2. Access admin at `/admin` path

---

### Option B: Separate Domain (Production Recommended)
```
Main Site: https://yoursite.vercel.app/
Admin: https://admin.yoursite.com/
Login: https://admin.yoursite.com/login
API: Shared database with main site
```

**Pros:**
- Better security
- Independent scaling
- Separate monitoring
- Can restrict access by domain

**Setup Instructions:**

#### Step 1: Deploy Main Site
1. Connect GitHub repo to Vercel (main branch)
2. Set environment variables
3. Deploy main site to `yoursite.vercel.app`

#### Step 2: Create Admin-Only Branch
```bash
# Clone current branch
git checkout -b admin-deployment

# No code changes needed - just a separate deployment
git push origin admin-deployment
```

#### Step 3: Create Second Vercel Project
1. Go to https://vercel.com/new
2. Import your GitHub repo (same one)
3. **Select branch:** `admin-deployment`
4. **Project name:** `admin` (will be `admin.yoursite.com`)
5. Add same environment variables:
   - `DATABASE_URL` (same database!)
   - `JWT_SECRET` (same secret!)
   - `NODE_ENV=production`
6. Deploy

#### Step 4: Configure Domain
1. In Vercel, go to admin project settings
2. Go to Domains
3. Add your custom domain: `admin.yoursite.com`
4. Update DNS records (Vercel will show you how)

---

## 🔑 Admin Panel Access

### First Time Setup

1. **Create Admin User**
   
   Option A - Using Prisma Studio:
   ```bash
   npx prisma studio
   ```
   - Create User in the `users` table
   - Set role to "ADMIN"
   - Password must be hashed with bcrypt (or use CLI option below)

   Option B - Using API (create temp endpoint):
   ```bash
   POST /api/auth/register
   {
     "email": "admin@yoursite.com",
     "password": "securepassword",
     "name": "Admin Name"
   }
   ```

   Option C - Using Node.js:
   ```bash
   node -e "
   const bcrypt = require('bcryptjs');
   const { PrismaClient } = require('@prisma/client');
   const prisma = new PrismaClient();
   
   (async () => {
     const hashedPassword = await bcrypt.hash('yourpassword', 10);
     const user = await prisma.user.create({
       data: {
         email: 'admin@yoursite.com',
         password: hashedPassword,
         name: 'Admin',
         role: 'ADMIN'
       }
     });
     console.log('User created:', user.email);
   })();
   "
   ```

2. **Login to Admin Panel**
   - Go to admin URL
   - Click "Login" on `/admin/login`
   - Enter email and password
   - You'll be redirected to dashboard

---

## 📊 Admin Panel Features

Once logged in, you can manage:

| Section | Purpose | Edit |
|---------|---------|------|
| **Projects** | Portfolio items | Add/Edit/Delete projects, images, tags |
| **Services** | Service listings | Manage services with features & ordering |
| **Team Members** | Team showcase | Add team members with bio & social links |
| **Project Requests** | Form submissions | View and manage customer inquiries |
| **Pages** | CMS pages | Create dynamic pages by slug (Privacy, Terms) |
| **Footer Links** | Navigation | Manage footer links by column |
| **About Section** | Why Choose Us | Add/edit company value points |
| **Contact Info** | Contact details | Update email, phone, address, socials |
| **Company Stats** | Homepage numbers | Update projects, clients, team, years |
| **Settings** | Site config | Hero title, description, background image |

---

## 🔐 Admin Security Features

The admin panel includes:

✅ **JWT Authentication**
- 24-hour session expiration
- Secure HTTP-only cookies
- Token verification on every request

✅ **Password Security**
- Bcrypt hashing (10 rounds)
- No plain-text storage
- Strong password recommended

✅ **Route Protection**
- All admin routes check authentication
- Unauthorized redirects to login
- API endpoints verify tokens

---

## 🚨 Troubleshooting Admin Panel

### Problem: Can't Login
**Solution:**
1. Ensure user exists in database
2. Check password is correct
3. Verify JWT_SECRET is set
4. Check cookies are enabled in browser

### Problem: Changes Not Saving
**Solution:**
1. Check DATABASE_URL is correct
2. Verify database connection
3. Check browser console for API errors
4. Review Vercel logs for server errors

### Problem: Admin Not Accessible
**Solution:**
1. For same domain: check `/admin` path exists
2. For separate domain: verify DNS is configured
3. Check Vercel deployment is complete
4. Clear browser cache

### Problem: Token Expired
**Solution:**
- Just login again
- Session duration is 24 hours
- Can be extended in `lib/backend/auth.service.ts`

---

## 📈 Monitoring Admin Usage

### View Admin Activity
```bash
# Check Vercel logs for admin requests
vercel logs --follow
```

### Database Size
```bash
# Check how much data is stored
npx prisma db execute "SELECT sum(pg_total_relation_size('"'"'public.'"'"'||tablename||'"'"'::regclass)) FROM pg_tables WHERE schemaname='public';"
```

---

## 🔄 Updating Admin Credentials

### Change Admin Password
1. Using Prisma Studio:
   ```bash
   npx prisma studio
   ```
   - Find user in `users` table
   - Update password (must hash with bcrypt)

2. Or use API (if you add a change password endpoint)

### Create Additional Admin Users
Same process as "First Time Setup" - create multiple users in database

---

## 💾 Backup & Recovery

### Database Backup
- Your database provider (Railway, Supabase, Neon) handles backups
- Check their dashboard for backup schedules
- Download backups regularly

### Export Admin Data
```bash
# Export all data
npx prisma db execute "COPY (SELECT * FROM projects) TO STDOUT CSV HEADER;" > backup.csv
```

---

## 📞 Support

If admin panel isn't working:
1. Check Vercel logs: `vercel logs`
2. Check database connection
3. Verify environment variables
4. Review `DEPLOYMENT.md` for common issues
5. Check JWT_SECRET matches between deployments

