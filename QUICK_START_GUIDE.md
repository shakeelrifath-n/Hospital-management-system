# 🏥 Hospital Management System - Simple Start Guide

**Easy-to-follow steps for beginners**

---

## PART 1: Starting the Application (3 Simple Steps)

### Step 1️⃣: Start the Database
**What it does**: Creates the storage system where all hospital data lives

```
1. Open the MySQL application or Command Prompt
2. Make sure MySQL is running on your computer
3. Verify the database exists: "hospital_management_system"
```

**How to check if it's running**:
- Open Command Prompt and type: `mysql -u root -p`
- If it asks for password and connects, database is ready ✅

---

### Step 2️⃣: Start the Backend (Server)
**What it does**: Runs the Java application that handles all the business logic

```
1. Open Command Prompt or PowerShell
2. Navigate to the project folder:
   cd "C:\Users\YourName\OneDrive - Nexturn\NexTurn-Related\testing-projects\Hospital management system\hospital-management\projectSpringBoot"

3. Type this command:
   mvn spring-boot:run

4. Wait 30-60 seconds for messages like:
   "Started Application in X seconds"
   "Tomcat started on port(s): 8080"
   
✅ Backend is now running on: http://localhost:8080
```

**What to look for**:
- You should see "BUILD SUCCESS" message
- No error messages in red

---

### Step 3️⃣: Start the Frontend (Website)
**What it does**: Opens the user interface that people see and click on

```
1. Open a NEW Command Prompt or PowerShell (keep backend running)
2. Navigate to Angular folder:
   cd "C:\Users\YourName\OneDrive - Nexturn\NexTurn-Related\testing-projects\Hospital management system\hospital-management\angularProject"

3. Type this command:
   npm run start

4. Wait 40-60 seconds. Browser should open automatically showing:
   http://localhost:50454 or http://localhost:4200
   
✅ Frontend is now running
```

**What to look for**:
- Browser opens automatically
- You see "Care Health Center" welcome page
- No error messages

---

### ✅ Application Started!
You should now have:
- 🗄️ MySQL Database running
- ⚙️ Backend (Java) running on port 8080
- 🎨 Frontend (Angular) running on port 4200 or 50454

**Verify all 3 are running before proceeding** ✅

---

---

## PART 2: Complete User Journey (Learn All Features)

### 📋 What You'll Do
You'll login as **6 different roles** and explore each role's features

**Time needed**: ~30 minutes

---

## Journey 1: ADMIN Role (Hospital Manager)

### Login Credentials
```
Email: admin@gmail.com
Password: 123
```

### What Admin Can Do
1. **Dashboard** - See overall hospital statistics
2. **Manage Users** - Add/edit/delete doctors, nurses, staff
3. **Manage Departments** - View all hospital departments
4. **Manage Manufacturers** - Add medicine manufacturers
5. **Manage Appointments** - View all hospital appointments
6. **Payroll** - Manage employee salaries
7. **Settings** - Change password, leave management

### Steps to Explore
```
1. Click "Login" button on homepage
2. Enter: admin@gmail.com and 123
3. You'll land on: Admin Dashboard (/adminprofile)
4. Explore menu on left side:
   - Click "User" → see user management
   - Click "Departments" → see departments
   - Click "Manufacturers" → see medicine suppliers
   - Click "Payroll" → see salary management
   - Click "Settings" → change password option
5. To logout: Click your profile icon (top right) → Logout
```

---

## Journey 2: DOCTOR Role

### Login Credentials
```
Email: raju@gmail.com
Password: 123
```

### What Doctor Can Do
1. **Dashboard** - Personal doctor dashboard
2. **Appointments** - View scheduled patient appointments
3. **Prescriptions** - Write and manage patient prescriptions
4. **Medicines List** - View available medicines
5. **Departments** - View hospital departments
6. **Activities** - See activity history

### Steps to Explore
```
1. Click "Login" button on homepage
2. Enter: raju@gmail.com and 123
3. You'll land on: Prescriptions page (/prescriptions)
4. Explore menu:
   - Click "Dashboard" → view doctor info
   - Click "Appointment" → schedule appointments
   - Click "Prescription" → write prescriptions
   - Click "Medicines List" → see available drugs
   - Click "Activities" → see action history
5. To logout: Click profile icon → Logout
```

---

## Journey 3: PATIENT Role

### Login Credentials
```
Email: child@gmail.com
Password: 123
```

### What Patient Can Do
1. **Dashboard** - Personal health dashboard
2. **Appointments** - Book/view appointments with doctors
3. **Medical Reports** - View prescription history
4. **Activities** - See personal medical history

### Steps to Explore
```
1. Click "Login" button on homepage
2. Enter: child@gmail.com and 123
3. You'll land on: Patient Dashboard (/patientprofile)
4. Explore menu:
   - Click "Dashboard" → view your health info
   - Click "Appointment" → book appointments
   - Click "Activities" → see your medical history
5. To logout: Click profile icon → Logout
```

---

## Journey 4: PHARMACIST Role

### Login Credentials
```
Email: pha@gmail.com
Password: 123
```

### What Pharmacist Can Do
1. **Create Medicine Bills** - Generate bills for patients
2. **Medicines List** - Manage medicine inventory
3. **Medicine Bills** - View all bills created
4. **Activities** - See transaction history
5. **Settings** - Manage salary and password

### Steps to Explore
```
1. Click "Login" button on homepage
2. Enter: pha@gmail.com and 123
3. You'll land on: Medicine Bills page (/medicine-bill-list)
4. Explore menu:
   - Click "Create Medicine Bill" → generate new bill
   - Click "Medicines" → view all medicines
   - Click "Medicine Bills" → see all bills created
   - Click "Activities" → see transaction log
   - Click "Salary" → view salary info
5. To logout: Click profile icon → Logout
```

---

## Journey 5: RECEPTIONIST Role

### Login Credentials
```
Email: recep@gmail.com
Password: 123
```

### What Receptionist Can Do
1. **Dashboard** - Receptionist dashboard
2. **Create Appointment** - Create appointments for patients
3. **Assign Appointments** - Assign appointments to doctors
4. **Departments** - View all departments
5. **Activities** - See all actions performed

### Steps to Explore
```
1. Click "Login" button on homepage
2. Enter: recep@gmail.com and 123
3. You'll land on: Receptionist Dashboard (/receptionist-profile)
4. Explore menu:
   - Click "Dashboard" → view receptionist info
   - Click "Create Appointment" → create new appointment
   - Click "Assign Appointment" → assign to doctor
   - Click "Departments" → view departments
   - Click "Activities" → see appointment log
5. To logout: Click profile icon → Logout
```

---

## Journey 6: LABORATORIST (Lab Technician) Role

### Login Credentials
```
Email: rblannk@gmail.com
Password: 123
```

### What Laboratorist Can Do
1. **Dashboard** - Lab dashboard
2. **Test Lists** - View all available medical tests
3. **Medical Reports** - Create and manage lab reports
4. **Appointment List** - View patient appointments

### Steps to Explore
```
1. Click "Login" button on homepage
2. Enter: rblannk@gmail.com and 123
3. You'll land on: Test List page (/tests)
4. Explore menu:
   - Click "Dashboard" → view lab info
   - Click "Test Lists" → view all available tests
   - Click "Medical Report" → create lab reports
   - Click "Appointment List" → see patient schedules
5. To logout: Click profile icon → Logout
```

---

---

## 📊 QUICK REFERENCE: Role Features Summary

| Role | Main Feature | Key Screens |
|------|-------------|------------|
| **Admin** | Hospital Management | Dashboard, Users, Departments, Payroll |
| **Doctor** | Patient Care | Dashboard, Appointments, Prescriptions |
| **Patient** | Health Management | Dashboard, Book Appointments, View History |
| **Pharmacist** | Medicine Management | Create Bills, Manage Medicines, Inventory |
| **Receptionist** | Appointment Management | Create Appointments, Assign to Doctors |
| **Laboratorist** | Lab Testing | Manage Tests, Create Reports |

---

## 🔍 Exploring More Features

### After completing all 6 roles, try these:

1. **Create an Appointment** (as Receptionist)
   - Create Appointment → Select Patient → Select Doctor → Save
   
2. **Write a Prescription** (as Doctor)
   - Prescriptions → View Appointments → Write Notes
   
3. **Create a Medicine Bill** (as Pharmacist)
   - Create Medicine Bill → Select Patient → Add Medicines → Generate Bill

4. **Check Activities** (as any role)
   - Click Activities → See all your actions logged

---

## ⚠️ Common Issues & Fixes

### Problem: "Cannot connect to localhost:8080"
**Fix**: Check if backend is running
- Look for "Tomcat started on port(s): 8080" in backend terminal
- Restart backend if needed

### Problem: "Cannot connect to localhost:50454"
**Fix**: Check if frontend is running
- Look for successful Angular compilation in frontend terminal
- Restart frontend if needed

### Problem: "Database connection error"
**Fix**: Check if MySQL is running
- Open MySQL service
- Verify database exists: `hospital_management_system`

### Problem: "Login fails with 'Email is required'"
**Fix**: Make sure both backend and frontend are running
- Restart both applications
- Use exact credentials from guide (case-sensitive)

---

## 🎯 Tips for Exploration

✅ **DO:**
- Start with Admin role to understand overall system
- Use the test credentials provided exactly
- Check Activities log to see what each action does
- Try creating/editing records to understand workflow

❌ **DON'T:**
- Don't worry about breaking anything - this is a test system
- Don't delete important records during exploration
- Don't close terminal windows while applications running

---

## 📝 Testing Checklist

After exploring all features, verify:

- [ ] All 6 roles can login successfully
- [ ] Each role lands on correct dashboard
- [ ] Navigation menu shows role-specific options
- [ ] Can view appointments/prescriptions/tests/bills
- [ ] Can see Activity log
- [ ] Can logout successfully
- [ ] Can login as different role (data persists)
- [ ] No error messages in browser console

---

## 🚀 Next Steps After Learning

Once you understand the system:

1. **Understand the Code** - Read the README.md files
2. **Test Data** - Know what test data exists in database
3. **Key Workflows** - Understand appointment → prescription → bill flow
4. **Database Schema** - Learn the table relationships
5. **API Endpoints** - Study backend API calls
6. **Error Handling** - Test edge cases and errors

---

## 📞 Quick Help

**Need help?**
- Terminal showing red errors? → Check terminal output carefully
- Application won't start? → Make sure all 3 (MySQL, Backend, Frontend) are running
- Confused about a feature? → Try exploring the UI and clicking buttons
- Want to restart everything? → Stop all terminals and start over from Step 1

---

**Start Date**: July 7, 2026  
**Difficulty Level**: ⭐ Beginner Friendly  
**Time to Complete**: ~45 minutes for full exploration
