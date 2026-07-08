# 🚀 Deploy to Railway, Render, or Vercel

## Platform Comparison

| Feature | Railway | Render | Vercel |
|---------|---------|--------|--------|
| **Frontend** | ✅ Yes | ✅ Yes | ✅✅ Best |
| **Backend** | ✅✅ Best | ✅✅ Best | ❌ No (Serverless only) |
| **Database** | ✅✅ Built-in MySQL | ✅✅ Built-in PostgreSQL | ❌ No |
| **Docker** | ✅✅ Full support | ✅✅ Full support | ⚠️ Limited |
| **Full Stack** | ✅✅ Perfect | ✅✅ Perfect | ❌ Not ideal |
| **Free Tier** | ✅ Yes ($5/mo credit) | ✅ Yes (limited) | ✅ Yes (frontend only) |
| **Monthly Cost** | $10-30 | $12-50+ | $0-50+ |
| **Best For** | Full-stack apps | Full-stack apps | Frontend only |

---

## 🏆 Recommendation

**Use Railway or Render for this project** - They both support:
- ✅ Docker deployment
- ✅ MySQL database
- ✅ Full-stack applications
- ✅ Environment variables

**Vercel** is only suitable if you deploy backend separately (not recommended).

---

# 1️⃣ DEPLOYMENT ON RAILWAY

## Why Railway?
- ✅ Simplest setup for Docker projects
- ✅ Built-in MySQL support
- ✅ One-click GitHub integration
- ✅ Best free tier ($5/month credit)
- ✅ Automatic deploys on git push

---

## Step 1: Prepare Your Repository

```bash
# Ensure .env.example exists
ls -la .env.example

# Ensure Dockerfile and docker-compose.yml exist
ls -la Dockerfile docker-compose.yml
```

---

## Step 2: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Click "Start Project"
3. Choose "GitHub" or "GitLab"
4. Authorize Railway to access your repositories
5. Select: `Hospital-management-system`

---

## Step 3: Add Services

### **3a. Add MySQL Database**

```bash
# In Railway dashboard:
1. Click "+ New"
2. Select "Database"
3. Choose "MySQL"
4. Leave settings default
5. Railway creates database automatically
```

Railway automatically provides:
- `MYSQLHOST` - Database hostname
- `MYSQLPORT` - Database port (3306)
- `MYSQLUSER` - Database user
- `MYSQLPASSWORD` - Database password
- `MYSQL_DB` - Database name

### **3b. Deploy Backend Service**

```bash
# In Railway dashboard:
1. Click "+ New"
2. Select "GitHub Repo"
3. Select this repository
4. Choose root directory: "/" or specific to "projectSpringBoot"
```

### **3c. Deploy Frontend Service**

```bash
# In Railway dashboard:
1. Click "+ New"
2. Select "GitHub Repo"
3. Select this repository
4. Choose root directory to "angularProject"
```

---

## Step 4: Configure Environment Variables

### **For Backend Service:**

Click on backend service → "Variables" tab

```env
# Database (Railway provides these automatically)
SPRING_DATASOURCE_URL=jdbc:mysql://${{ MYSQLHOST }}:${{ MYSQLPORT }}/${{ MYSQL_DB }}?serverTimezone=UTC&allowPublicKeyRetrieval=true&useSSL=false
SPRING_DATASOURCE_USERNAME=${{ MYSQLUSER }}
SPRING_DATASOURCE_PASSWORD=${{ MYSQLPASSWORD }}
SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.mysql.cj.jdbc.Driver

# JPA Configuration
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false

# Server
SERVER_PORT=8080
TZ=UTC
```

### **For Frontend Service:**

Click on frontend service → "Variables" tab

```env
# Frontend build args
API_BASE_URL=/api
ENVIRONMENT=production
FRONTEND_PORT=80
```

---

## Step 5: Configure Nginx for Frontend

Frontend needs special setup. Create `railway.json` in root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "dockerfile",
    "dockerfile": "angularProject/Dockerfile"
  },
  "deploy": {
    "numReplicas": 1,
    "startCommand": "nginx -g 'daemon off;'"
  }
}
```

Or, in Railway dashboard for frontend:

1. Go to frontend service → "Settings"
2. Set "Start Command": `nginx -g 'daemon off;'`
3. Set "Dockerfile Path": `angularProject/Dockerfile`

---

## Step 6: Setup Routing (Optional - For Single Domain)

If using single domain:

1. Frontend → "Settings" → "Public Networking"
2. Copy provided Railway domain
3. Your app is live at: `https://your-app.up.railway.app`

Backend will be auto-discovered on same domain via Nginx reverse proxy.

---

## Step 7: Deploy!

```bash
# Just push to GitHub main branch
git push origin main

# Railway automatically:
# 1. Detects changes
# 2. Rebuilds Docker images
# 3. Deploys new containers
# 4. Restarts services
```

Watch deployment in Railway dashboard:
- Green checkmark = Success ✅
- Red X = Failed (check logs)

---

## Step 8: Verify Deployment

```bash
# Get your Railway domain
RAILWAY_URL="https://your-app.up.railway.app"

# Test frontend
curl $RAILWAY_URL

# Test backend health
curl $RAILWAY_URL/api/actuator/health

# Test login
curl -X POST $RAILWAY_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"admin"}'
```

---

## Railway Troubleshooting

**Issue: "Build failed - Dockerfile not found"**
```
Solution: Set Dockerfile Path in service settings to "Dockerfile" (at root)
or "angularProject/Dockerfile" for frontend
```

**Issue: "Database connection refused"**
```
Solution: 
1. Check MySQL service is running (green in Railway dashboard)
2. Wait 30 seconds after MySQL creation
3. Verify environment variables match
4. Check backend logs for exact error
```

**Issue: "frontend shows blank page"**
```
Solution:
1. Check API_BASE_URL=/api in frontend variables
2. Verify environment.json generated correctly
3. Check Nginx logs: Railway logs tab
```

**Railway Dashboard Logs:**
```bash
# View real-time logs
1. Go to service
2. Click "Logs" tab
3. Watch deployment and runtime logs
```

---

---

# 2️⃣ DEPLOYMENT ON RENDER

## Why Render?
- ✅ Similar to Railway but more control
- ✅ PostgreSQL/MySQL support
- ✅ Better free tier for testing
- ✅ Great documentation
- ✅ Good performance

---

## Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access repositories

---

## Step 2: Create MySQL Database

```bash
# In Render dashboard:
1. Click "New +"
2. Select "MySQL"
3. Name: "hospital-mysql"
4. Region: Choose closest to you
5. Leave other settings default
6. Click "Create Database"
```

Render provides:
- `MYSQL_HOST` - Hostname
- `MYSQL_PORT` - Port (usually 3306)
- `MYSQL_USER` - User
- `MYSQL_PASSWORD` - Password
- `MYSQL_DATABASE` - DB name

---

## Step 3: Create Backend Service

```bash
# In Render dashboard:
1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub repo
4. Fill in:
   - Name: "hospital-backend"
   - Region: Same as database
   - Branch: "main"
   - Runtime: "Docker"
   - Dockerfile Path: "projectSpringBoot/Dockerfile"
   - Build Command: (leave empty)
   - Start Command: (leave empty)
```

### **Add Environment Variables to Backend:**

```env
# Database
SPRING_DATASOURCE_URL=mysql://${{ mysql.MYSQL_HOST }}:${{ mysql.MYSQL_PORT }}/${{ mysql.MYSQL_DATABASE }}?serverTimezone=UTC&allowPublicKeyRetrieval=true&useSSL=false
SPRING_DATASOURCE_USERNAME=${{ mysql.MYSQL_USER }}
SPRING_DATASOURCE_PASSWORD=${{ mysql.MYSQL_PASSWORD }}

# JPA
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false

# Server
SERVER_PORT=8080
TZ=UTC
```

---

## Step 4: Create Frontend Service

```bash
# In Render dashboard:
1. Click "New +"
2. Select "Static Site" OR "Web Service" (if custom build needed)
3. Connect GitHub repo
4. Fill in:
   - Name: "hospital-frontend"
   - Branch: "main"
   - Build Command: "cd angularProject && npm install && npm run build"
   - Publish Directory: "angularProject/dist/angular-project/browser"
```

### **Or use Web Service with Docker (better):**

```bash
1. New Web Service
2. Name: "hospital-frontend"
3. Runtime: Docker
4. Dockerfile Path: "angularProject/Dockerfile"
5. Build Command: (empty)
6. Start Command: "nginx -g 'daemon off;'"
```

### **Frontend Environment Variables:**

```env
API_BASE_URL=/api
ENVIRONMENT=production
FRONTEND_PORT=80
```

---

## Step 5: Create Services

1. Fill in all settings
2. Choose "Free" or "Starter" plan
3. Click "Create Web Service"

Render automatically:
- Clones repository
- Builds Docker image
- Deploys containers
- Provides public URL

---

## Step 6: Link Services

In Render dashboard:

**For Backend:**
- Environment Variables → Add
- `BACKEND_URL`: Your backend Render URL

**For Frontend:**
- Environment Variables → Add
- `API_BASE_URL`: `/api` (for same-domain proxy)
- Or: `https://your-backend.onrender.com` (if different domain)

---

## Step 7: Deploy

```bash
# Push to GitHub
git push origin main

# Render auto-deploys on push
# Check "Deployments" tab in service
```

---

## Step 8: Verify

```bash
# Get Render URLs
BACKEND_URL="https://hospital-backend.onrender.com"
FRONTEND_URL="https://hospital-frontend.onrender.com"

# Test
curl $FRONTEND_URL
curl $BACKEND_URL/api/actuator/health
```

---

## Render Troubleshooting

**Issue: "Render is suspending my free web service"**
```
Reason: Free services go down after 15 minutes of inactivity
Solution: Upgrade to "Starter" ($7/month) or keep hitting health endpoint
Command: curl https://your-service.onrender.com/api/actuator/health (every 14 min)
```

**Issue: "Can't connect to database"**
```
Solution:
1. Ensure MySQL service is created first
2. Copy exact connection string from MySQL dashboard
3. Paste into backend environment variables
4. Redeploy backend
```

**Issue: "Frontend shows 404 or blank page"**
```
Solution:
1. Check Build Command ran successfully
2. Verify Publish Directory path
3. Check Nginx configuration
4. View deploy logs for errors
```

**View Logs:**
```bash
1. Go to service
2. Click "Logs" section
3. Watch real-time deployment
```

---

---

# 3️⃣ DEPLOYMENT ON VERCEL

## ⚠️ Important: Vercel is NOT ideal for this project

**Why?** Vercel is designed for:
- ✅ Static sites (HTML/CSS)
- ✅ Next.js frontend
- ✅ Serverless functions
- ✅ Client-side rendering

**But this project has:**
- ❌ Spring Boot backend (needs persistent runtime)
- ❌ MySQL database
- ❌ Server-side processing

---

## Possible Workaround (Not Recommended)

If you MUST use Vercel:

### **Option 1: Frontend Only on Vercel + Backend Elsewhere**

```
Vercel (Frontend)
    ↓
    ↓ API calls to
    ↓
Railway (Backend + Database)
```

**Steps:**

1. **Deploy Frontend to Vercel:**
```bash
# In Vercel dashboard
1. Import Git Repository
2. Choose: Hospital-management-system
3. Root Directory: angularProject
4. Build: npm run build
5. Output: dist/angular-project/browser
6. Environment Variable:
   - VITE_API_URL: https://your-railway-backend.com
```

2. **Deploy Backend to Railway** (as explained above)

3. **Update Angular Config:**

In `angularProject/src/app/util/config.service.ts`:
```typescript
// Add environment variable support
const apiBaseUrl = process.env['VITE_API_URL'] || '/api';
```

**Pros:**
- Vercel provides good CDN for frontend
- Lightning fast frontend loading

**Cons:**
- API calls go across the internet (slower)
- Two separate deployments to manage
- More expensive overall

---

### **Option 2: Next.js Wrapper (Better)**

Use Vercel + Next.js as backend proxy:

1. Create Next.js API routes that proxy to Spring Boot
2. Deploy on Vercel
3. Vercel calls your Railway backend

**But this is complex and not recommended for this stack.**

---

## Verdict: Don't Use Vercel for Backend

**For a full-stack app like this:**
- ❌ Vercel: Only for frontend
- ✅ Railway: Best choice (simplest)
- ✅ Render: Second best choice (more control)

---

---

# COST COMPARISON

## Free Tier / Starter Plans

### Railway
```
MySQL Database:    Free ($5/month credit)
Backend Service:   Free ($5/month credit)
Frontend Service:  Free ($5/month credit)
─────────────────
Total:             FREE first month, then ~$10-15/month
```

### Render
```
MySQL Database:    Free with strict limits
Starter Backend:   $7/month
Starter Frontend:  Free (Static Site)
─────────────────
Total:             FREE static site, $7-20/month with backend
```

### Vercel
```
Frontend Only:     Free
Backend:           Not possible (or use functions: $20/month)
─────────────────
Total:             FREE for frontend only
```

---

# QUICK DECISION TABLE

| You Want | Best Choice | Cost | Setup Time |
|----------|-------------|------|-----------|
| Simplest full-stack deploy | **Railway** | $10/mo | 15 min |
| More control | **Render** | $15/mo | 20 min |
| Frontend only | **Vercel** | Free | 10 min |
| Testing/Staging | **Railway Free** | $5/mo | 15 min |
| Production scale | **Railway Pro** | $30+/mo | 20 min |

---

# DEPLOYMENT COMPARISON SIDE-BY-SIDE

## Getting Started

### Railway
```bash
1. Sign up at railway.app
2. Click "Start Project"
3. Connect GitHub
4. Select repo
5. Add MySQL
6. Add Backend
7. Add Frontend
8. Set variables
9. Done! Auto-deploys on git push
Time: 15 minutes
```

### Render
```bash
1. Sign up at render.com
2. Click "New +"
3. Create MySQL
4. Create Backend service
5. Create Frontend service
6. Set variables
7. Trigger deploy
8. Monitor deployment
Time: 20 minutes
```

### Vercel
```bash
1. Sign up at vercel.com
2. Import GitHub repo
3. Select angularProject folder
4. Deploy
5. Done!
Time: 5 minutes (frontend only)
```

---

# SCALING CONSIDERATIONS

## If Traffic Increases

### Railway
```bash
# Increase resources in dashboard
1. Select service
2. Click "Settings"
3. Increase CPU/RAM
4. Auto-restart with new size
Cost: +$0.10/hour per upgrade
```

### Render
```bash
# Upgrade to higher tier
1. Go to service
2. Click "Plan" settings
3. Choose Pro ($12/month)
4. Auto-scales with Render's infrastructure
Cost: +$5-10/month
```

### Vercel
```bash
# Serverless functions scale automatically
# But backend still limited on functions
Cost: Pay per invocation ($0.50/1M)
```

---

# MY RECOMMENDATION

## 🏆 **Use Railway**

**Why?**
1. ✅ Simplest setup (one-click everything)
2. ✅ Best for Docker projects
3. ✅ Cheapest full-stack option ($10-15/mo)
4. ✅ Auto-deploys on git push
5. ✅ Excellent free tier ($5 credit/mo)
6. ✅ Great for testing → scaling to production

## 📊 **If You Prefer More Control**

Use **Render**

**Why?**
1. ✅ More granular control
2. ✅ Better PostgreSQL support (if switching DB)
3. ✅ Good documentation
4. ✅ Reliable performance

## ❌ **Avoid Vercel for Full Stack**

Unless you only deploy frontend + use Railway/Render for backend separately.

---

# QUICK START: Railway Deployment

```bash
# 1. Go to railway.app → New Project
# 2. Connect GitHub repo
# 3. In Railway dashboard:
#    - Click "+ New"
#    - Select "MySQL"
#    - Click "+ New"
#    - Select "GitHub Repo" → this repo
#    - Repeat for Frontend service
#
# 4. For Backend service, set Environment Variables:
#    SPRING_DATASOURCE_URL=mysql://${{ MYSQLHOST }}:${{ MYSQLPORT }}/${{ MYSQL_DB }}?serverTimezone=UTC&allowPublicKeyRetrieval=true&useSSL=false
#    SPRING_DATASOURCE_USERNAME=${{ MYSQLUSER }}
#    SPRING_DATASOURCE_PASSWORD=${{ MYSQLPASSWORD }}
#    SPRING_JPA_HIBERNATE_DDL_AUTO=update
#    SERVER_PORT=8080
#
# 5. For Frontend service:
#    API_BASE_URL=/api
#    ENVIRONMENT=production
#
# 6. Push to GitHub:
#    git push origin main
#
# 7. Watch Railway dashboard for auto-deployment ✅

# Done! Your app is live at Railway's provided URL
```

---

# Need More Help?

- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs (frontend only)

Each platform has excellent documentation and support teams!
