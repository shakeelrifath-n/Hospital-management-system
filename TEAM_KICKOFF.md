# 🚀 Team Kickoff - Hospital Management System

**Status**: ✅ Project pushed to GitHub and ready for testing  
**Repository**: https://github.com/shakeelrifath-n/Hospital-management-system.git

---

## 📢 What We Did

We fixed the complete login system and pushed the Hospital Management System to GitHub. The system is now:
- ✅ Fully functional (all 6 user roles working)
- ✅ Secure (no credentials exposed)
- ✅ Documented (complete guides included)
- ✅ Ready for deployment

---

## 🎯 For Your Team - Let's Get Started!

### Option 1: Local Setup (Quick Testing - 10 minutes)

#### Prerequisites:
- Java 21 (for backend)
- Node.js 18+ (for frontend)
- MySQL 8.0 (for database)

#### Step 1: Clone the Project
```bash
git clone https://github.com/shakeelrifath-n/Hospital-management-system.git
cd Hospital-management-system
```

#### Step 2: Setup Database
```bash
# Create the database
mysql -u root -p < database_schema.sql

# OR manually create:
# CREATE DATABASE hms;
# Then import the schema file
```

#### Step 3: Configure Backend
```bash
cd projectSpringBoot/src/main/resources
cp application.properties.example application.properties

# Edit application.properties:
# spring.datasource.url=jdbc:mysql://localhost:3306/hms
# spring.datasource.username=root
# spring.datasource.password=your_password
```

#### Step 4: Run Backend
```bash
cd projectSpringBoot
mvn clean install
mvn spring-boot:run
# Backend will start on http://localhost:8080
```

#### Step 5: Run Frontend
```bash
cd angularProject
npm install
npm run start
# Frontend will start on http://localhost:4200 or 50454
```

#### Step 6: Test Login
- Go to http://localhost:4200
- Use credentials:
  - **Admin**: admin@gmail.com / 123
  - **Doctor**: raju@gmail.com / 123
  - **Patient**: child@gmail.com / 123
  - **Pharmacist**: pha@gmail.com / 123
  - **Receptionist**: recep@gmail.com / 123
  - **Laboratorist**: rblannk@gmail.com / 123

✅ **Done!** Each role goes to their own dashboard.

---

### Option 2: Docker Setup (Professional - 15 minutes)

#### What is Docker?
Docker packages your entire application (code + dependencies + database) into a single container. One command = entire system running.

#### Prerequisites:
- Docker installed
- Docker Compose installed

#### Step 1: Create Dockerfile (Backend)

Create file: `projectSpringBoot/Dockerfile`
```dockerfile
FROM openjdk:21
WORKDIR /app
COPY target/projectSpringBoot-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

#### Step 2: Create Dockerfile (Frontend)

Create file: `angularProject/Dockerfile`
```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist/angular-project /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Step 3: Create Docker Compose File

Create file: `docker-compose.yml` (in root)
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password123
      MYSQL_DATABASE: hms
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: ./projectSpringBoot
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/hms
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: password123
    ports:
      - "8080:8080"
    depends_on:
      - mysql

  frontend:
    build: ./angularProject
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

#### Step 4: Build and Run
```bash
# Build the images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

✅ **Done!** Access at:
- Frontend: http://localhost
- Backend: http://localhost:8080
- Database: localhost:3306

---

### Option 3: Deploy to AWS EC2 (Production - 30 minutes)

#### What You'll Need:
- AWS Account with EC2 access
- EC2 instance (Ubuntu 22.04, t2.medium or larger)
- Security groups configured (ports 80, 443, 8080, 3306)

#### Step 1: SSH into EC2 Instance
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

#### Step 2: Install Dependencies on EC2
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git
sudo apt install git -y
```

#### Step 3: Clone Project on EC2
```bash
cd /home/ubuntu
git clone https://github.com/shakeelrifath-n/Hospital-management-system.git
cd Hospital-management-system
```

#### Step 4: Build Backend JAR
```bash
cd projectSpringBoot

# On your local machine, run this first:
mvn clean package -DskipTests

# Then upload to EC2 or:
# Copy the target/projectSpringBoot-0.0.1-SNAPSHOT.jar to EC2
```

#### Step 5: Update Environment for EC2

Edit `docker-compose.yml`:
```yaml
# Change localhost to EC2 IP
# Change port 80 to 443 with SSL certificate
# Update database password
```

#### Step 6: Deploy with Docker
```bash
# On EC2
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs backend
docker-compose logs frontend
```

#### Step 7: Access Your Application
```
Frontend: http://your-ec2-ip
Backend: http://your-ec2-ip:8080
```

---

## 📋 Quick Reference: What is What?

| Component | Purpose | Port | Setup Time |
|-----------|---------|------|-----------|
| **MySQL** | Database | 3306 | 1 min |
| **Backend** | API Server | 8080 | 5 min |
| **Frontend** | Web Interface | 4200/80 | 3 min |

---

## 🎯 Dependencies Explained Simply

### For Local Development:
- **Java 21**: Needed to run backend code
- **Node.js 18+**: Needed to run frontend
- **MySQL 8.0**: Database to store data
- **Maven**: Tool to build backend
- **npm**: Tool to build frontend

### For Docker:
- **Docker**: Packages everything (no need to install Java/Node/MySQL separately)
- **Docker Compose**: Runs multiple containers together

### For EC2 Production:
- **Docker**: Package your app
- **Docker Compose**: Run it on server
- **AWS EC2**: Virtual machine in cloud

---

## 🚀 Three Ways to Run - Which One?

| Setup | When to Use | Difficulty |
|-------|------------|-----------|
| **Local Setup** | Testing on your machine | Easy |
| **Docker Local** | Professional testing | Medium |
| **EC2 Production** | Deploy to live server | Medium |

---

## ✅ Testing Checklist

After setup, test these:
```
□ Can access login page
□ Can login with admin@gmail.com / 123
□ Admin sees admin dashboard
□ Can logout
□ Can login as different role
□ Different roles see different dashboards
□ API responding on :8080
□ Database has data (check patients, doctors, etc.)
□ No errors in console
```

---

## 🆘 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Port 8080 already in use | `lsof -i :8080` then kill process |
| Can't connect to database | Check MySQL is running and credentials are correct |
| Frontend shows blank | Check backend is running on 8080 |
| Docker won't start | Check `docker-compose.yml` syntax |
| EC2 connection refused | Check security groups allow ports 80, 8080, 443 |

---

## 📞 Need Help?

Check these files in the repository:
- **README.md** - Complete documentation
- **DEPLOYMENT_NOTES.md** - Technical details
- **QUICK_START_GUIDE.md** - Step by step guide
- **DATABASE_SCHEMA_README.md** - Database info

---

## 🎉 You're Ready!

Pick your setup option above and get started. 

**Local** → Docker → **EC2** is the recommended progression.

Good luck team! 🚀

---

**Repository**: https://github.com/shakeelrifath-n/Hospital-management-system.git  
**Status**: Ready for testing and deployment  
**Last Updated**: July 7, 2026
