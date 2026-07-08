# 🚀 Hospital Management System - Complete Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start (Local)](#quick-start-local)
3. [EC2 Deployment](#ec2-deployment)
4. [Configuration Guide](#configuration-guide)
5. [Verification & Testing](#verification--testing)
6. [Troubleshooting](#troubleshooting)
7. [Production Best Practices](#production-best-practices)

---

## Prerequisites

Before deployment, ensure you have:

### **Required Tools**
- ✅ Docker (version 20.10 or higher)
- ✅ Docker Compose (version 1.29 or higher)
- ✅ Git (for cloning repository)
- ✅ A Linux machine (Ubuntu 20.04 LTS or higher recommended for EC2)

### **Verify Installation**
```bash
docker --version
docker-compose --version
git --version
```

### **System Requirements**
- **CPU**: Minimum 2 cores (4+ recommended)
- **RAM**: Minimum 2GB (4GB+ recommended)
- **Storage**: 20GB free disk space
- **Network**: Ports 80 (HTTP), 443 (HTTPS if configured), 3306 (MySQL - internal only)

---

## Quick Start (Local)

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/shakeelrifath-n/Hospital-management-system.git
cd Hospital-management-system/hospital-management
```

### **Step 2: Configure Environment**
```bash
# Copy the example configuration
cp .env.example .env

# Edit .env with your settings (see Configuration Guide below)
nano .env
```

### **Step 3: Start All Services**
```bash
# Build images and start containers
docker-compose up -d

# Watch the startup process
docker-compose logs -f
```

### **Step 4: Verify Services Are Running**
```bash
# Check container status
docker-compose ps

# Expected output:
# hms-mysql      -> Up (Healthy)
# hms-backend    -> Up
# hms-frontend   -> Up
```

### **Step 5: Access the Application**
- **Frontend**: http://localhost/
- **Backend API**: http://localhost/api/
- **Login Page**: http://localhost/login

### **Step 6: Test Login Credentials**
```
Admin Account:
- Email: admin@gmail.com
- Password: admin

Doctor Account:
- Email: raju@gmail.com
- Password: doctor
```

---

## EC2 Deployment

### **Step 1: Launch EC2 Instance**

1. Go to AWS Console → EC2 → Launch Instance
2. **AMI**: Ubuntu Server 22.04 LTS (Free Tier eligible)
3. **Instance Type**: t3.medium (recommended) or t3.small
4. **Storage**: 25GB (gp3)
5. **Security Group**: Allow:
   - Port 22 (SSH) - from your IP only
   - Port 80 (HTTP) - from 0.0.0.0/0
   - Port 443 (HTTPS) - from 0.0.0.0/0
   - Port 3306 (MySQL) - INTERNAL ONLY (never expose)

6. **Elastic IP**: Assign a fixed IP (important for production)

### **Step 2: Connect to Instance**
```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system packages
sudo apt update && sudo apt upgrade -y
```

### **Step 3: Install Docker**
```bash
# Install Docker
sudo apt install -y docker.io

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add ubuntu user to docker group (no sudo needed)
sudo usermod -aG docker ubuntu
newgrp docker

# Verify installation
docker --version
docker-compose --version
```

### **Step 4: Clone Repository**
```bash
# Clone the project
git clone https://github.com/shakeelrifath-n/Hospital-management-system.git
cd Hospital-management-system/hospital-management

# Verify directory structure
ls -la
```

### **Step 5: Setup Environment Configuration**
```bash
# Copy example config
cp .env.example .env

# Edit for your environment
sudo nano .env
```

**Recommended .env for EC2 Production:**
```env
# Database Configuration
DB_ROOT_PASSWORD=YourSecurePassword123!@#
DB_NAME=hms
DB_USER=hms_admin
DB_PASSWORD=YourSecurePassword123!@#

# Backend Service Configuration
BACKEND_PORT=8080
BACKEND_HOST=backend

# Frontend Service Configuration
FRONTEND_PORT=80

# API Configuration
API_BASE_URL=/api

# Environment
ENVIRONMENT=production

# Database Performance
SPRING_JPA_SHOW_SQL=false
SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

### **Step 6: Build and Start Services**
```bash
# Build Docker images (first time only)
docker-compose build --no-cache

# Start all services in background
docker-compose up -d

# View startup logs
docker-compose logs -f
```

### **Step 7: Verify Deployment**
```bash
# Check all containers are running
docker-compose ps

# Check backend health
curl http://localhost:8080/actuator/health

# Check frontend is serving
curl http://your-instance-ip/

# View application logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

---

## Configuration Guide

### **Understanding .env Variables**

#### **Database Configuration**
```env
# MySQL root password (used only for initial setup)
DB_ROOT_PASSWORD=jee59
  # Rule: Use strong password (mix uppercase, lowercase, numbers, symbols)

# Database name to create
DB_NAME=hms
  # Rule: Keep as 'hms' unless changing backend configuration

# Application user (the backend connects with this)
DB_USER=admin
  # Rule: Don't use 'root' - security best practice

# Application user password
DB_PASSWORD=jee59
  # Rule: Use strong password in production (min 12 characters)
```

#### **Backend Service Configuration**
```env
# Backend service port (inside Docker container)
BACKEND_PORT=8080
  # Rule: Don't change this - it's for internal Docker networking

# Backend service hostname (Docker service name)
BACKEND_HOST=backend
  # Rule: Don't change this - Docker Compose resolves this name
```

#### **Frontend Service Configuration**
```env
# Frontend exposed port on host machine
FRONTEND_PORT=80
  # Rule: Use 80 for HTTP, 443 if you have SSL certificate
  # For EC2: If not root, use 8080 and setup reverse proxy
```

#### **API Configuration**
```env
# API base URL for frontend to call backend
API_BASE_URL=/api
  # IMPORTANT: How frontend talks to backend
  
  # Options:
  # /api              - Relative path (reverse proxy at Nginx level)
  # http://localhost/api  - Local development
  # https://api.yourdomain.com  - Production with separate backend domain
```

#### **Environment Designation**
```env
# Which environment is this
ENVIRONMENT=development
  # Options: development, staging, production
  # Used for logging, error messages, performance tuning
```

---

## Verification & Testing

### **Health Checks**

**1. MySQL Database**
```bash
# Check if MySQL is responding
docker-compose exec mysql mysqladmin ping -u admin -pjee59

# Expected: mysqld is alive ✓
```

**2. Spring Boot Backend**
```bash
# Check backend health endpoint
curl -s http://localhost:8080/actuator/health | jq .

# Expected:
# {
#   "status": "UP"
# }
```

**3. Angular Frontend**
```bash
# Check if frontend is serving
curl -s http://localhost/ | head -20

# Expected: HTML content with "Health Care Center"
```

**4. Database Connection**
```bash
# Test backend-to-database connection
curl -s http://localhost:8080/api/auth/login -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"admin"}' | jq .

# Expected: JWT token or user data returned
```

### **Test Login Flow**

**Using Browser:**
1. Open http://localhost/login (or http://your-ec2-ip/)
2. Enter credentials:
   - Email: `admin@gmail.com`
   - Password: `admin`
3. Should redirect to dashboard

**Using cURL (CLI):**
```bash
# Login
RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"admin"}')

# Extract JWT token
TOKEN=$(echo $RESPONSE | jq -r '.data.jwt')

# Use token to access protected endpoint
curl -s http://localhost:8080/api/user/findAllUsers \
  -H "Authorization: Bearer $TOKEN" | jq .

# Expected: List of all users
```

### **Test All 6 User Roles**

```bash
# Test credentials for each role
TEST_USERS=(
  "admin@gmail.com:admin"
  "raju@gmail.com:doctor"
  "child@gmail.com:child"
  "pha@gmail.com:pha"
  "recep@gmail.com:recep"
  "rblannk@gmail.com:lab"
)

for cred in "${TEST_USERS[@]}"; do
  EMAIL=$(echo $cred | cut -d: -f1)
  PASS=$(echo $cred | cut -d: -f2)
  
  echo "Testing: $EMAIL"
  curl -s -X POST http://localhost:8080/api/auth/login \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}" | jq '.successful'
done
```

---

## Troubleshooting

### **Issue: Containers Not Starting**

**Symptoms:**
```
docker-compose up -d
ERROR: Container hms-mysql is unhealthy
```

**Solution:**
```bash
# Check logs
docker-compose logs mysql

# If permission denied, fix Docker permissions
sudo usermod -aG docker $USER
newgrp docker

# Restart containers
docker-compose down
docker-compose up -d
```

### **Issue: Backend Can't Connect to Database**

**Symptoms:**
```
Backend logs show: "Access denied for user 'admin'@'172.19.0.3'"
```

**Solution:**
```bash
# Verify .env credentials
cat .env | grep DB_

# Check MySQL is healthy
docker-compose exec mysql mysqladmin ping -u admin -pjee59

# Restart backend container
docker-compose restart backend
```

### **Issue: Frontend Shows Blank Page**

**Symptoms:**
```
Browser shows: Nothing loads, white page, or 404 errors
```

**Solution:**
```bash
# Check frontend logs
docker-compose logs frontend

# Check Nginx configuration
docker-compose exec frontend cat /etc/nginx/conf.d/default.conf

# Verify config.service.ts loaded environment.json
curl http://localhost/assets/config/environment.json
# Should return: {"apiBaseUrl":"/api","timeout":30000,"environment":"development"}
```

### **Issue: CORS Errors in Browser Console**

**Symptoms:**
```
Browser console: "Access to XMLHttpRequest blocked by CORS policy"
```

**Solution:**
```bash
# This is handled by Nginx reverse proxy
# Check Nginx conf has CORS headers
docker-compose exec frontend cat /etc/nginx/conf.d/default.conf | grep -A5 "proxy_pass"

# Verify API calls use correct URL
curl -s http://localhost/api/auth/login \
  -H "Origin: http://localhost" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

### **Issue: Port Already in Use**

**Symptoms:**
```
ERROR: Bind for 0.0.0.0:80 failed: port is already allocated
```

**Solution:**
```bash
# Find what's using the port
sudo lsof -i :80

# Either stop that service or change FRONTEND_PORT in .env
# Then: docker-compose restart
```

### **Issue: No Database Persistence**

**Symptoms:**
```
Data disappears when containers restart
```

**Solution:**
```bash
# This shouldn't happen - Docker volumes persist by default
# Verify volume exists
docker volume ls

# If missing, it means containers were deleted with -v flag
# Redeploy: docker-compose up -d
```

---

## Production Best Practices

### **1. Security Hardening**

**Update .env for Production:**
```env
# Use strong passwords (minimum 16 characters)
DB_ROOT_PASSWORD=GenerateStrongPasswordHere!@#$%^&*
DB_PASSWORD=GenerateStrongPasswordHere!@#$%^&*

# Environment should be production
ENVIRONMENT=production

# Disable SQL logging
SPRING_JPA_SHOW_SQL=false

# Use update (not create-drop) for schema management
SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

**EC2 Security Group Settings:**
```
✅ Inbound:
   - HTTP (80) from 0.0.0.0/0 (all IPs)
   - HTTPS (443) from 0.0.0.0/0 (if SSL configured)
   - SSH (22) from YOUR_IP_ONLY (not 0.0.0.0/0)
   
❌ DO NOT expose port 3306 (MySQL) - internal Docker only
```

### **2. Resource Management**

**Optimized docker-compose.yml has CPU/Memory limits:**
```yaml
# Backend: Max 1 CPU, 512MB RAM
# MySQL: Max 1 CPU, 1024MB RAM
# Frontend: Max 0.5 CPU, 256MB RAM
```

If resources are constrained, adjust in docker-compose.yml:
```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'        # Reduce from 1
      memory: 256M       # Reduce from 512M
```

### **3. Backup Strategy**

**MySQL Data Backup:**
```bash
# Manual backup (daily)
docker-compose exec mysql mysqldump -u admin -pjee59 hms > backup_$(date +%Y%m%d).sql

# Automated backup (cron job)
# Add to crontab (crontab -e):
0 2 * * * docker-compose exec mysql mysqldump -u admin -p$DB_PASSWORD hms > /backups/hms_$(date +\%Y\%m\%d).sql
```

**File Uploads Backup:**
```bash
# Backend stores uploads in: projectSpringBoot/src/main/resources/static/images
# Backup location:
docker cp hms-backend:/app/src/main/resources/static/images /backups/images_$(date +%Y%m%d)
```

### **4. Monitoring & Logging**

**View Logs:**
```bash
# All services
docker-compose logs -f --tail=100

# Specific service
docker-compose logs -f backend

# Filter errors
docker-compose logs backend | grep ERROR
```

**Setup Log Rotation:**
```bash
# Edit /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}

# Restart Docker
sudo systemctl restart docker
```

### **5. SSL/HTTPS Setup**

**Using Let's Encrypt (Free):**
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d your-domain.com

# Update docker-compose.yml frontend service:
# volumes:
#   - /etc/letsencrypt/live/your-domain.com:/etc/nginx/certs:ro
# ports:
#   - "443:443"

# Update nginx.conf for HTTPS
# Restart: docker-compose restart frontend
```

### **6. Database Maintenance**

**Regular Integrity Checks:**
```bash
# Check database integrity
docker-compose exec mysql mysqlcheck -u admin -pjee59 hms

# Optimize tables (weekly)
docker-compose exec mysql mysql -u admin -pjee59 -e "OPTIMIZE TABLE hms.users, hms.appointments, hms.prescriptions;"
```

### **7. Auto-Restart on Server Boot**

```bash
# Enable Docker to start on boot
sudo systemctl enable docker

# Add to crontab for application restart
@reboot cd /path/to/hospital-management && docker-compose up -d
```

### **8. Scaling for High Traffic**

```bash
# Scale backend to multiple instances
docker-compose up -d --scale backend=3

# Add load balancer in front (e.g., HAProxy or AWS ALB)
# Configure sticky sessions for user authentication
```

---

## Common Deployment Scenarios

### **Scenario 1: Local Development**
```bash
# Setup
cp .env.example .env
# Keep defaults as-is
docker-compose up -d

# Access: http://localhost/
```

### **Scenario 2: AWS EC2 (Single Instance)**
```bash
# On EC2, after SSH login
git clone https://github.com/shakeelrifath-n/Hospital-management-system.git
cd Hospital-management-system/hospital-management

# Setup with EC2-specific credentials
cp .env.example .env
# Edit .env with EC2 instance IP and strong passwords

docker-compose up -d

# Access: http://your-ec2-public-ip/
```

### **Scenario 3: On-Premises Server**
```bash
# Same as EC2, but:
# 1. Update IP_BASE_URL=http://your-server-ip in .env
# 2. Configure firewall rules
# 3. Set up SSL certificate
# 4. Configure backup location
```

---

## Quick Commands Reference

```bash
# Start application
docker-compose up -d

# Stop application
docker-compose down

# View all containers
docker-compose ps

# View logs
docker-compose logs -f

# Restart specific service
docker-compose restart backend

# Scale backend (for load balancing)
docker-compose up -d --scale backend=3

# Clean rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Database backup
docker-compose exec mysql mysqldump -u admin -pjee59 hms > backup.sql

# Database restore
docker-compose exec -T mysql mysql -u admin -pjee59 hms < backup.sql

# Check service health
curl http://localhost:8080/actuator/health

# View resource usage
docker stats
```

---

## Need Help?

**Check Logs First:**
```bash
docker-compose logs backend    # Backend errors
docker-compose logs mysql      # Database errors
docker-compose logs frontend   # Frontend/Nginx errors
```

**Common Issues:**
- Port already in use → Change FRONTEND_PORT in .env
- Database connection failed → Verify .env credentials
- Frontend blank page → Check browser console for errors
- API 404 errors → Verify backend is running (docker-compose ps)

**For Production Issues:**
- Always backup before making changes
- Test changes in staging first
- Keep .env file secure (never commit to git)
- Monitor resource usage regularly

---

## Success Checklist

Before considering deployment complete:

- ✅ All containers running (`docker-compose ps` shows all UP)
- ✅ Admin login works
- ✅ Can access all 6 user roles
- ✅ Create/Edit/Delete operations work
- ✅ Database data persists after restart
- ✅ Logs show no errors
- ✅ Health check endpoints respond
- ✅ .env credentials are strong (production)
- ✅ Backups are configured
- ✅ Monitoring/logging is setup

**You're done! 🎉**
