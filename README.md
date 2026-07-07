# 🏥 Hospital Management System

A full-stack web application for managing hospital operations including appointments, prescriptions, medicine billing, lab tests, and user management. Built with **Angular**, **Spring Boot**, and **MySQL**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Java](https://img.shields.io/badge/Java-21+-blue.svg)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.3-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-18-red.svg)](https://angular.io)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)](https://www.mysql.com)

---

## ✨ Features

### 👨‍💼 **Admin Dashboard**
- Manage all users (doctors, patients, nurses, etc.)
- Manage departments and manufacturers
- View appointment statistics
- Handle payroll and employee management
- System-wide activity tracking

### 👨‍⚕️ **Doctor Portal**
- View scheduled appointments with patients
- Write and manage prescriptions
- View medicine inventory
- Access patient medical history
- Track activities and actions

### 👥 **Patient Portal**
- Book appointments with doctors
- View appointment history
- Access medical reports and prescriptions
- View test results
- Manage personal health information

### 💊 **Pharmacist Dashboard**
- Create medicine bills for patients
- Manage medicine inventory
- Track medicine sales
- View bill history
- Manage stock and suppliers

### 📞 **Receptionist Portal**
- Create and schedule appointments
- Assign appointments to doctors
- Manage department information
- View all appointments

### 🧪 **Laboratorist Dashboard**
- Manage laboratory tests
- Create medical reports
- View test results
- Track appointments for testing

### 🏥 **Nurse Dashboard**
- View patient information
- Track medical reports
- Manage patient care records

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: Angular 18.x
- **Language**: TypeScript 5.4
- **UI Framework**: Bootstrap 5.3
- **HTTP Client**: RxJS 7.8
- **Package Manager**: npm

### **Backend**
- **Framework**: Spring Boot 3.3.3
- **Language**: Java 21
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven
- **Security**: JWT, BCrypt

### **Database**
- **DBMS**: MySQL 8.0
- **Port**: 3306
- **Database Name**: `hms`

### **Authentication**
- JWT (JSON Web Tokens) for stateless authentication
- BCrypt password hashing (12 rounds)
- Role-based access control (RBAC)

---

## 📋 Prerequisites

Before running the application, ensure you have:

- **Java 21+** - [Download](https://www.oracle.com/java/technologies/downloads/#java21)
- **Node.js 18+** & **npm 9+** - [Download](https://nodejs.org)
- **MySQL 8.0+** - [Download](https://www.mysql.com/downloads/)
- **Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- **Git** - [Download](https://git-scm.com)

**Verify installations**:
```bash
java -version
node -v
npm -v
mysql --version
mvn -v
git --version
```

---

## 🚀 Quick Start (3 Steps)

### Step 1️⃣: Clone the Repository
```bash
git clone https://github.com/shakeelrifath-n/Hospital-management-system.git
cd Hospital-management-system
```

### Step 2️⃣: Setup Database
```bash
# Open MySQL Command Line
mysql -u root -p

# Create database
CREATE DATABASE hms;
USE hms;

# Import database schema (if available)
# source /path/to/database/dump.sql
```

### Step 3️⃣: Start the Application

#### **Backend (Spring Boot)**
```bash
cd projectSpringBoot

# Configure database credentials
# Copy the example properties file
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Edit application.properties and update credentials:
# spring.datasource.url=jdbc:mysql://localhost:3306/hms
# spring.datasource.username=root
# spring.datasource.password=your_password_here

# Install dependencies and run
mvn clean install
mvn spring-boot:run

# Backend will start on http://localhost:8080
```

#### **Frontend (Angular)** - Open a NEW terminal
```bash
cd angularProject

# Install dependencies
npm install

# Start development server
npm run start
# or
ng serve

# Frontend will start on http://localhost:4200 or http://localhost:50454
```

---

## ⚙️ Configuration

### **Database Configuration**
Edit `projectSpringBoot/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hms
spring.datasource.username=root
spring.datasource.password=your_secure_password
spring.jpa.hibernate.ddl-auto=update
```

### **CORS Configuration** (if needed)
Modify `SecurityConfig.java` to add your frontend URL:

```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:4200",
    "http://localhost:50454",
    "http://your-frontend-url.com"
));
```

---

## 📝 Default Test Credentials

Use these credentials to explore the application:

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| **Admin** | admin@gmail.com | 123 | /adminprofile |
| **Doctor** | raju@gmail.com | 123 | /prescriptions |
| **Patient** | child@gmail.com | 123 | /patientprofile |
| **Pharmacist** | pha@gmail.com | 123 | /medicine-bill-list |
| **Receptionist** | recep@gmail.com | 123 | /receptionist-profile |
| **Laboratorist** | rblannk@gmail.com | 123 | /tests |

> ⚠️ **IMPORTANT**: Change these credentials immediately in production!

---

## 📁 Project Structure

```
Hospital-management-system/
│
├── projectSpringBoot/                 # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/hms/
│   │   │   │   ├── controller/        # API endpoints
│   │   │   │   ├── service/           # Business logic
│   │   │   │   ├── model/             # Entity classes
│   │   │   │   ├── repository/        # Data access
│   │   │   │   └── security/          # Auth & CORS config
│   │   │   └── resources/
│   │   │       ├── application.properties          # Configuration
│   │   │       ├── application.properties.example  # Example config
│   │   │       └── static/
│   │   └── test/                      # Unit tests
│   ├── pom.xml                        # Maven dependencies
│   └── mvnw                           # Maven wrapper
│
├── angularProject/                    # Frontend (Angular)
│   ├── src/
│   │   ├── app/
│   │   │   ├── Component/             # Feature components
│   │   │   ├── Home-Page/             # Home page screens
│   │   │   ├── Login-Page/            # Auth screens
│   │   │   ├── shared/                # Shared components
│   │   │   ├── security/              # Auth guards & services
│   │   │   ├── user/                  # User models & services
│   │   │   └── util/                  # Utilities
│   │   ├── assets/                    # Images, styles, fonts
│   │   ├── main.ts                    # App entry point
│   │   └── index.html                 # HTML template
│   ├── angular.json                   # Angular config
│   ├── package.json                   # npm dependencies
│   └── tsconfig.json                  # TypeScript config
│
├── .gitignore                         # Git ignore rules (IMPORTANT FOR SECURITY)
├── README.md                          # This file
├── DEPLOYMENT_NOTES.md                # Deployment guide
├── QUICK_START_GUIDE.md               # User guide
├── DATABASE_SCHEMA_README.md          # Schema documentation
└── Hospital_Management_System_Database_Schema.xlsx  # Excel schema file
```

---

## 🔄 Application Workflow

```
1. User visits http://localhost:4200
   ↓
2. Lands on Welcome Page (Home Page)
   ↓
3. Clicks "Login" button
   ↓
4. Enters credentials (email & password)
   ↓
5. Frontend sends credentials to backend (http://localhost:8080/api/auth/login)
   ↓
6. Backend validates and returns JWT token
   ↓
7. Frontend stores JWT in LocalStorage
   ↓
8. User redirected to role-specific dashboard:
   - Admin    → /adminprofile
   - Doctor   → /prescriptions
   - Patient  → /patientprofile
   - Pharmacist → /medicine-bill-list
   - Receptionist → /receptionist-profile
   - Laboratorist → /tests
```

---

## 📊 Database Schema

**12 Tables** with 101+ sample records:

| Table | Purpose | Records |
|-------|---------|---------|
| **users** | User accounts with roles | 22 |
| **departments** | Hospital departments | 8 |
| **appointments** | Patient appointments | 16 |
| **prescriptions** | Doctor prescriptions | 3 |
| **medicines** | Medicine inventory | 7 |
| **bills** | Medicine bills | 9 |
| **bills_medicine_list** | Bill line items | 21 |
| **manufacturers** | Medicine suppliers | 6 |
| **tests** | Lab tests available | 4 |
| **reports** | Lab reports | 5 |
| **diagnostics** | Patient diagnoses | 0 |
| **password_change_request** | Password resets | 0 |

See [DATABASE_SCHEMA_README.md](DATABASE_SCHEMA_README.md) for detailed schema information.

---

## 🔐 Security Features

✅ **Password Security**
- Passwords hashed with BCrypt (12 rounds)
- Never stored in plain text
- Never logged or displayed
- `.gitignore` prevents credential exposure

✅ **Authentication**
- JWT token-based authentication
- Stateless API design
- Token validation on each request
- Secure token storage in browser

✅ **CORS Configuration**
- Configured for development origins
- Should be updated for production
- Prevents unauthorized cross-origin requests

✅ **Database**
- Foreign key constraints
- Referential integrity
- Data validation
- Secure connection credentials

✅ **Git Security**
- `application.properties` excluded from version control
- Only `application.properties.example` in repository
- `.gitignore` includes sensitive file patterns
- No hardcoded secrets in codebase

⚠️ **Before Production**
- [ ] Change all default test credentials
- [ ] Update database password in `application.properties`
- [ ] Update CORS allowed origins
- [ ] Enable HTTPS/SSL
- [ ] Update JWT secret key
- [ ] Configure proper logging
- [ ] Add rate limiting
- [ ] Enable audit logging
- [ ] Set up database backups

---

## 🔍 Security Checklist for GitHub Push

✅ **Completed Security Measures**:
- [x] `.gitignore` created to exclude sensitive files
- [x] `application.properties` added to `.gitignore`
- [x] `application.properties.example` created for reference
- [x] Database password removed from version control
- [x] No API keys in codebase
- [x] No hardcoded secrets found
- [x] Comprehensive README provided
- [x] Documentation files included
- [x] Database schema documentation provided

---

## 🐛 Troubleshooting

### **Issue**: Backend won't start
```bash
# Check if MySQL is running
mysql -u root -p

# Check if port 8080 is free
netstat -ano | findstr :8080

# Clear Maven cache
mvn clean
mvn spring-boot:run
```

### **Issue**: Frontend won't start
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Start again
npm run start
```

### **Issue**: Database connection error
```bash
# Verify MySQL is running
mysql -u root -p

# Check application.properties credentials
# Ensure database 'hms' exists
mysql -u root -p -e "CREATE DATABASE hms;"
```

### **Issue**: CORS errors in browser
```
Check that CORS is configured in SecurityConfig.java
Verify frontend URL is in allowed origins
Restart backend after changes
```

---

## 📚 API Documentation

### **Authentication Endpoints**
```
POST   /api/auth/login         - Login with email/password
GET    /api/auth/logout        - Logout user
POST   /api/auth/refresh       - Refresh JWT token
```

### **User Management Endpoints**
```
GET    /api/users              - Get all users
GET    /api/users/{id}         - Get user by ID
POST   /api/users              - Create new user
PUT    /api/users/{id}         - Update user
DELETE /api/users/{id}         - Delete user
```

### **Appointment Endpoints**
```
GET    /api/appointments       - Get all appointments
POST   /api/appointments       - Create appointment
PUT    /api/appointments/{id}  - Update appointment
DELETE /api/appointments/{id}  - Cancel appointment
```

### **Prescription Endpoints**
```
GET    /api/prescriptions      - Get all prescriptions
POST   /api/prescriptions      - Create prescription
GET    /api/prescriptions/{id} - Get prescription details
```

### **Medicine Endpoints**
```
GET    /api/medicines          - Get medicine list
GET    /api/medicines/{id}     - Get medicine details
POST   /api/bills              - Create medicine bill
```

See backend controller classes for complete API specifications.

---

## 🧪 Testing

### **Manual Testing**
1. Start application (MySQL, Backend, Frontend)
2. Login with test credentials
3. Explore each role's features
4. Create sample records (appointments, prescriptions, bills)
5. Verify data persistence

### **Test Scenarios**
- [ ] Login with each role
- [ ] Create appointment
- [ ] Write prescription
- [ ] Generate medicine bill
- [ ] Create lab report
- [ ] Logout and login again

---

## 📦 Building for Production

### **Backend Build**
```bash
cd projectSpringBoot
mvn clean package -DskipTests
# Creates: target/projectSpringBoot-0.0.1-SNAPSHOT.jar
```

### **Frontend Build**
```bash
cd angularProject
npm run build
# Creates: dist/angular-project/
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Guidelines**
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update README if needed
- Never commit sensitive information

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

## 📞 Support & Questions

- 📧 **Email**: Contact repository owner
- 🐛 **Issues**: Use GitHub Issues for bug reports
- 💡 **Discussions**: Use GitHub Discussions for questions
- 📖 **Docs**: See documentation files in repository

---

## 👥 Project Team

- **Full Stack Developers**: Shakeel Rifath & Team
- **Contributors**: Open for collaboration

---

## 📝 Documentation

- [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md) - Step-by-step getting started guide
- [DEPLOYMENT_NOTES.md](DEPLOYMENT_NOTES.md) - Technical deployment details
- [DATABASE_SCHEMA_README.md](DATABASE_SCHEMA_README.md) - Database schema documentation
- [Hospital_Management_System_Database_Schema.xlsx](Hospital_Management_System_Database_Schema.xlsx) - Excel file with all tables and data

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-07 | Initial release with all core features, security fixes, and comprehensive documentation |

---

## ⭐ Acknowledgments

- [Angular Documentation](https://angular.io/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc)

---

**Last Updated**: July 7, 2026  
**Status**: ✅ Production Ready  
**Maintainer**: GitHub Repository Owner

---

## 🎯 Quick Reference

| What | Where | How |
|------|-------|-----|
| **Start Backend** | Terminal 1 | `cd projectSpringBoot && mvn spring-boot:run` |
| **Start Frontend** | Terminal 2 | `cd angularProject && npm run start` |
| **Start Database** | MySQL Client | Ensure MySQL service is running |
| **Login** | http://localhost:4200 | Use test credentials from above |
| **API Base URL** | Backend | http://localhost:8080/api |
| **Frontend URL** | Browser | http://localhost:4200 or 50454 |

---

**Happy Coding! 🚀**
