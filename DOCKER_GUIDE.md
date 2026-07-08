# 🐳 Docker Deployment Guide

**Status**: ✅ All Docker files created and ready to deploy!

---

## 📁 **What We Created**

```
Your Project
├── projectSpringBoot/
│   ├── Dockerfile              ← Backend image recipe
│   ├── .dockerignore           ← What to exclude from image
│   └── src/main/resources/
│       └── application.properties  ← Updated for Docker
│
├── angularProject/
│   ├── Dockerfile              ← Frontend image recipe
│   ├── nginx.conf              ← Web server configuration
│   └── .dockerignore           ← What to exclude from image
│
├── docker-compose.yml          ← Master orchestration file
├── .env.example                ← Environment variables template
└── ScreenShot/
    └── MySQL\ Database.sql     ← Database schema (auto-imported)
```

---

## 🚀 **Quick Start (3 Steps)**

### **Step 1: Create .env File (Local Machine)**
```bash
# Copy the example
cp .env.example .env

# Edit .env if you want different passwords:
# DB_ROOT_PASSWORD=your_password
# DB_PASSWORD=your_password
```

### **Step 2: Build All Images**
```bash
docker-compose build
```
✅ This creates 3 Docker images:
- Backend image (Spring Boot)
- Frontend image (Angular)
- Database image (MySQL - from official image)

### **Step 3: Start All Services**
```bash
docker-compose up -d
```

✅ All 3 containers are now running!

---

## 📊 **What Happened Behind the Scenes**

```
docker-compose up -d command does this:

1. Starts MySQL container
   - Waits for it to be healthy (5-10 seconds)
   - Automatically imports your database schema
   - Creates tables with sample data

2. Starts Backend container
   - Waits for MySQL to be healthy
   - Connects to MySQL at "mysql:3306"
   - API ready at http://localhost:8080

3. Starts Frontend container
   - Waits for Backend to be ready
   - Serves Angular app on port 80
   - Proxies API calls to backend
   - Web app ready at http://localhost
```

---

## 🎯 **How to Use**

### **Access Your Application**

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost |
| **Backend API** | http://localhost:8080 |
| **Database** | localhost:3306 |

### **Login Credentials**
- **Email**: admin@gmail.com
- **Password**: 123

---

## 🛠️ **Useful Commands**

### **Check Status**
```bash
docker-compose ps
```
Shows all running containers and their status.

### **View Logs**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### **Stop Everything**
```bash
docker-compose down
```
Stops all containers (data persists in volumes).

### **Stop and Delete Everything**
```bash
docker-compose down -v
```
⚠️ Warning: This deletes the database volume (data loss!)

### **Restart a Service**
```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart mysql
```

### **View Database**
```bash
# Connect to MySQL container
docker exec -it hms-mysql mysql -u admin -ppassword123 -e "use hms; show tables;"

# Or use your favorite MySQL client on localhost:3306
```

---

## 🌐 **Deploying to AWS EC2**

### **On Your Local Machine:**
1. Build images: `docker-compose build`
2. Push to GitHub: `git add . && git commit && git push`

### **On EC2 Instance:**

**Step 1: SSH into EC2**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

**Step 2: Install Docker**
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
newgrp docker
```

**Step 3: Clone and Deploy**
```bash
git clone https://github.com/your-username/Hospital-management-system.git
cd Hospital-management-system

# Create .env file
cp .env.example .env

# Start all services
docker-compose build
docker-compose up -d

# Check status
docker-compose ps
```

**Step 4: Access Your App**
```
http://your-ec2-public-ip
```

---

## 🔧 **Customization**

### **Change Database Password**

Edit `.env`:
```
DB_PASSWORD=your_new_secure_password
```

Then restart:
```bash
docker-compose down
docker-compose up -d
```

### **Change Ports**

Edit `docker-compose.yml`:
```yaml
backend:
  ports:
    - "8080:8080"  # Change first number (external port)
    
frontend:
  ports:
    - "80:80"      # Change first number (external port)
```

### **Change Database Name**

Edit `.env`:
```
DB_NAME=my_hospital_db
```

---

## 🐛 **Troubleshooting**

### **Containers won't start**
```bash
# Check logs
docker-compose logs

# If MySQL fails:
# - Wait 10 seconds and try again (MySQL needs time to init)
# - Check permissions: docker-compose down -v && docker-compose up

# If Backend can't connect to MySQL:
# - Ensure MySQL container is running: docker-compose ps
# - Check MySQL health: docker-compose logs mysql
```

### **Can't access frontend**
```bash
# Check if running
docker-compose ps

# Check Nginx logs
docker-compose logs frontend

# Check if port 80 is available
# On Windows: netstat -ano | findstr :80
# On Mac/Linux: lsof -i :80
```

### **Database not initialized**
```bash
# MySQL usually initializes within 5-10 seconds
# If not, check logs:
docker-compose logs mysql

# If schema didn't import, manually import:
docker exec -i hms-mysql mysql -u admin -ppassword123 hms < ScreenShot/MySQL\ Database.sql
```

### **Port already in use**
```bash
# Find what's using the port (example: port 80)
# Windows:
netstat -ano | findstr :80

# Mac/Linux:
lsof -i :80

# Kill the process or change docker-compose port mapping
```

---

## 📊 **How Docker Networking Works**

Inside docker-compose:
- **Frontend container** → Calls backend at: `http://backend:8080` (Docker resolves "backend" to backend container)
- **Backend container** → Calls MySQL at: `jdbc:mysql://mysql:3306` (Docker resolves "mysql" to mysql container)
- **Both** → Talk through internal Docker bridge network

From outside (your browser):
- **You** → Access frontend at: `http://localhost` (Port 80)
- **Frontend** → Proxies API calls to: `http://localhost:8080` (Port 8080 exposed)

---

## 🔐 **Security Notes**

### **For Testing/Development:**
✅ Current setup is fine
- Passwords in .env are weak
- All ports exposed

### **For Production:**
- [ ] Use strong passwords in .env
- [ ] Don't commit .env to GitHub (add to .gitignore)
- [ ] Use environment-specific configs
- [ ] Add SSL/TLS certificates
- [ ] Restrict port access via security groups
- [ ] Use secrets management (AWS Secrets Manager, etc.)

---

## 🎓 **File Explanations**

### **Dockerfile (Backend)**
- Multi-stage build (builds app, then runs it)
- Uses Maven to compile Java code
- Creates optimized Alpine Linux image
- Exposes port 8080

### **Dockerfile (Frontend)**
- Multi-stage build (builds Angular, then serves)
- Stage 1: Node.js builds the app
- Stage 2: Nginx serves the files
- Includes nginx.conf for configuration
- Exposes port 80

### **docker-compose.yml**
- Defines 3 services: mysql, backend, frontend
- Sets up networking between services
- Configures volumes for database persistence
- Passes environment variables
- Sets health checks

### **nginx.conf**
- Routes API requests to backend (http://backend:8080)
- Handles Angular routing (single-page app)
- Caches static assets
- Enables CORS headers

### **.env.example**
- Template for configuration
- Never committed to GitHub
- Copy to .env and fill in your values

### **.dockerignore**
- Excludes unnecessary files from image
- Keeps image size small
- Similar to .gitignore but for Docker

---

## 📈 **What's Next?**

1. ✅ Run locally: `docker-compose up`
2. ✅ Test everything works
3. ✅ Push to GitHub: `git push`
4. ✅ Deploy to EC2: Follow EC2 steps above
5. ✅ Celebrate! 🎉

---

## 💾 **Environment Variables Reference**

| Variable | Default | Purpose |
|----------|---------|---------|
| `DB_ROOT_PASSWORD` | password123 | MySQL root password |
| `DB_NAME` | hms | Database name |
| `DB_USER` | admin | Database user |
| `DB_PASSWORD` | password123 | Database user password |
| `SERVER_PORT` | 8080 | Backend port |

---

## 🚀 **One Command Deployment**

After pushing to GitHub and setting up EC2:

```bash
git clone [repo-url]
cd Hospital-management-system
docker-compose build
docker-compose up -d
```

**Your app is live in 2-3 minutes!** ✅

---

**You're all set! Your application is now containerized and ready for the cloud!** 🐳

For questions, check the troubleshooting section above.
