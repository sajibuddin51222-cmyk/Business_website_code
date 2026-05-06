# DEPLOYMENT CHECKLIST ✓

Print this or keep it handy while deploying.

---

## PRE-DEPLOYMENT (Do Before Vercel)

### Repository
- [ ] Code committed to GitHub
- [ ] All files pushed to `main` branch
- [ ] No uncommitted changes
- [ ] `.env.local` NOT in git (check .gitignore)

### Database Setup
- [ ] Chose database provider (Supabase/Railway/Neon)
- [ ] Created database instance
- [ ] Copied CONNECTION STRING (DATABASE_URL)
- [ ] Saved connection string somewhere safe

### Secrets
- [ ] Generated JWT_SECRET (use uuidgenerator.net)
- [ ] Copied full UUID
- [ ] Saved JWT_SECRET somewhere safe
- [ ] Chose strong admin password (12+ chars)

---

## VERCEL DEPLOYMENT

### Create Vercel Project
- [ ] Went to vercel.com/new
- [ ] Imported GitHub repository
- [ ] Selected correct branch (main)
- [ ] Connected account if needed

### Configure Project
- [ ] Framework auto-detected as Next.js
- [ ] Root directory is ./ (default)
- [ ] Build command: npm run build (default)

### Add Environment Variables
- [ ] Added DATABASE_URL
- [ ] Added JWT_SECRET
- [ ] Added NODE_ENV = production
- [ ] Verified no typos in key names

### Deploy
- [ ] Clicked "Deploy" button
- [ ] Waited 2-3 minutes for build
- [ ] Saw "Deployment Successful" message
- [ ] Got deployment URL (e.g., your-project.vercel.app)

---

## POST-DEPLOYMENT

### Database Initialization
- [ ] Copied DATABASE_URL from Vercel env vars
- [ ] Ran: `DATABASE_URL="..." npx prisma db push`
- [ ] Database tables created successfully
- [ ] No migration errors

### Create Admin User
- [ ] Opened Prisma Studio
- [ ] Navigated to Users table
- [ ] Clicked "Create record"
- [ ] Filled in:
  - [ ] email: admin@yoursite.com
  - [ ] name: Admin
  - [ ] password: (see password hash below)
  - [ ] role: ADMIN
- [ ] Saved record

### Generate Password Hash
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword123!', 10).then(h => console.log(h));"
```
- [ ] Generated bcrypt hash
- [ ] Copied full hash (includes $2a$...)
- [ ] Pasted into password field

### Verify Site Works
- [ ] Opened https://your-project.vercel.app/
- [ ] Homepage loads without errors
- [ ] Can see hero section
- [ ] Can see projects/services sections
- [ ] Images load correctly

### Verify Admin Panel
- [ ] Went to https://your-project.vercel.app/admin/login
- [ ] Entered email: admin@yoursite.com
- [ ] Entered password: YourPassword123!
- [ ] Successfully logged in
- [ ] Saw admin dashboard
- [ ] Can see all management sections

---

## TEST ADMIN FEATURES

### Try Creating Content
- [ ] Go to Projects → Create new
- [ ] Fill in title, description, etc.
- [ ] Save successfully
- [ ] See it on homepage

- [ ] Go to Services → Create new
- [ ] Fill in service details
- [ ] Save successfully
- [ ] Appears in Services section

- [ ] Go to Team → Create new
- [ ] Add team member
- [ ] Save successfully
- [ ] Can edit member details

### Test Other Features
- [ ] View Project Requests (forms)
- [ ] Edit Contact Info
- [ ] Update Company Stats
- [ ] Change Homepage Settings
- [ ] Create CMS Page

---

## DOMAIN SETUP (Optional)

### Connect Custom Domain
- [ ] Own custom domain
- [ ] Updated DNS records at registrar
  - [ ] CNAME or A record
  - [ ] Points to Vercel
- [ ] Waited 24-48 hours for propagation
- [ ] Verified custom domain works
- [ ] HTTPS working (Vercel auto)

### Update Social/Links
- [ ] Updated Contact Info with new domain
- [ ] Sent new domain to team
- [ ] Updated any external links
- [ ] Updated email signatures

---

## SECURITY CHECKLIST

### Protect Admin Access
- [ ] Changed default JWT_SECRET ✓
- [ ] Set strong admin password ✓
- [ ] Verified HTTPS enabled ✓
- [ ] HTTP-only cookies working ✓
- [ ] Password hashed with bcrypt ✓

### Database Security
- [ ] Database has SSL connection
- [ ] DATABASE_URL in Vercel only (not git)
- [ ] No hardcoded secrets in code
- [ ] Regular backups enabled
- [ ] Database provider monitoring enabled

### Monitor & Maintain
- [ ] Set up Vercel notifications
- [ ] Check logs regularly: `vercel logs`
- [ ] Monitor database usage
- [ ] Keep dependencies updated
- [ ] Review admin activity logs

---

## FINAL VERIFICATION

### Desktop Test
- [ ] Homepage responsive
- [ ] Mobile menu works
- [ ] Dark mode toggle works
- [ ] All links functional
- [ ] Forms submit correctly
- [ ] Admin panel accessible

### Mobile Test
- [ ] Site responsive on mobile
- [ ] Tap targets proper size
- [ ] Images load on mobile data
- [ ] Forms usable on phone
- [ ] No console errors

### Browser Test
- [ ] Chrome ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Edge ✓

---

## HAND-OFF & MAINTENANCE

### Documentation
- [ ] Saved all .md files
- [ ] Documented admin login credentials (safe place)
- [ ] Shared QUICK_START.md with team
- [ ] Created backup of DATABASE_URL

### Team Setup
- [ ] Invited team members to Vercel project
- [ ] Explained admin panel access
- [ ] Created admin users for team
- [ ] Showed content management workflow

### Ongoing
- [ ] Schedule regular backups
- [ ] Monitor Vercel analytics
- [ ] Keep dependencies updated: `npm update`
- [ ] Review admin login activity
- [ ] Update content regularly

---

## SUCCESS! 🎉

If you've checked all boxes above, your site is:
- ✅ Live and accessible
- ✅ Admin panel working
- ✅ Database connected
- ✅ Secure and protected
- ✅ Ready for production

### Next Steps:
1. Add your content (projects, team, etc.)
2. Configure analytics
3. Test email forms (if enabled)
4. Share with stakeholders
5. Plan content updates

---

**Deployment Complete! Your site is live! 🚀**

For help, see: QUICK_START.md | DEPLOYMENT.md | ARCHITECTURE.md

