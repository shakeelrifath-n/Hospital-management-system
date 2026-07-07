# 📊 Database Schema Summary

**File**: `Hospital_Management_System_Database_Schema.xlsx`  
**Generated**: July 7, 2026  
**Database**: `hms` on localhost:3306

---

## 📋 Database Overview

### Connection Details
```
Host: localhost
Port: 3306
Database: hms
Username: root
Password: jee59
```

---

## 📑 Tables in Database (12 Total)

### 1. **users** (22 records)
**Purpose**: Store all user accounts (Admin, Doctors, Patients, Nurses, Pharmacists, Receptionists, Laboratorists)

**Key Columns**:
- `id` - User ID (Primary Key)
- `email` - Login email
- `password` - BCrypt hashed password
- `firstname` - First name
- `lastname` - Last name
- `role` - User role (ADMIN, DOCTOR, PATIENT, NURSE, PHARMACIST, RECEPTIONIST, LAB)
- `departmentid` - Department assignment
- `status` - Active/Inactive

---

### 2. **appointments** (16 records)
**Purpose**: Store patient appointments with doctors

**Key Columns**:
- `appointmentid` - Appointment ID (Primary Key)
- `patientid` - Patient reference (Foreign Key)
- `doctorid` - Doctor reference (Foreign Key)
- `appointmentdate` - Scheduled date
- `appointmentstarttime` - Start time
- `appointmentendtime` - End time
- `status` - Scheduled/Completed/Cancelled
- `notes` - Appointment notes

---

### 3. **departments** (8 records)
**Purpose**: Hospital departments (Cardiology, Neurology, etc.)

**Key Columns**:
- `departmentid` - Department ID (Primary Key)
- `departmentname` - Name of department
- `description` - Department description
- `status` - Active/Inactive

---

### 4. **prescriptions** (3 records)
**Purpose**: Doctor prescriptions for patients

**Key Columns**:
- `prescriptionid` - Prescription ID (Primary Key)
- `appointmentid` - Appointment reference (Foreign Key)
- `patientid` - Patient reference (Foreign Key)
- `doctorid` - Doctor reference (Foreign Key)
- `prescriptiondate` - Date prescribed
- `notes` - Prescription notes/instructions
- `status` - Active/Completed

---

### 5. **medicines** (7 records)
**Purpose**: Medicine/drug inventory

**Key Columns**:
- `medicineid` - Medicine ID (Primary Key)
- `medicinename` - Name of medicine
- `manufactureid` - Manufacturer reference (Foreign Key)
- `description` - Medicine description
- `price` - Cost per unit
- `quantity` - Stock quantity
- `expirydate` - Expiration date
- `status` - Active/Inactive

---

### 6. **manufacturers** (6 records)
**Purpose**: Medicine manufacturers

**Key Columns**:
- `manufacteuerid` - Manufacturer ID (Primary Key)
- `manufacturername` - Company name
- `address` - Company address
- `contactnumber` - Phone contact
- `email` - Email address
- `licensenumber` - License/Registration number

---

### 7. **bills** (9 records)
**Purpose**: Medicine purchase bills for patients

**Key Columns**:
- `billid` - Bill ID (Primary Key)
- `patientid` - Patient reference (Foreign Key)
- `pharmacistid` - Pharmacist who created (Foreign Key)
- `billdate` - Date of bill
- `totalprice` - Total amount
- `paymentmethod` - Cash/Card/Cheque
- `paymentstatus` - Paid/Pending/Failed
- `notes` - Additional notes

---

### 8. **bills_medicine_list** (21 records)
**Purpose**: Medicines included in each bill (Junction table)

**Key Columns**:
- `billmedicineid` - Record ID (Primary Key)
- `billid` - Bill reference (Foreign Key)
- `medicineid` - Medicine reference (Foreign Key)
- `quantity` - Quantity sold
- `unitprice` - Price per unit
- `totalprice` - Quantity × Unit Price

---

### 9. **tests** (4 records)
**Purpose**: Medical laboratory tests available

**Key Columns**:
- `testid` - Test ID (Primary Key)
- `testname` - Name of test (CBC, Blood Sugar, etc.)
- `description` - Test description
- `result` - Expected result fields
- `instructions` - Patient preparation instructions

---

### 10. **reports** (5 records)
**Purpose**: Medical test reports for patients

**Key Columns**:
- `reportid` - Report ID (Primary Key)
- `patientid` - Patient reference (Foreign Key)
- `testid` - Test reference (Foreign Key)
- `laboratoristid` - Laboratorist who created (Foreign Key)
- `reportdate` - Date of report
- `results` - Test results/findings
- `status` - Completed/Pending

---

### 11. **diagnostics** (0 records)
**Purpose**: Patient diagnoses/medical conditions

**Key Columns**:
- `diagnosticid` - Diagnostic ID (Primary Key)
- `patientid` - Patient reference (Foreign Key)
- `doctorid` - Doctor reference (Foreign Key)
- `diagnosisdate` - Date of diagnosis
- `diagnosis` - Medical condition/disease
- `notes` - Additional clinical notes
- `status` - Active/Resolved

---

### 12. **password_change_request** (0 records)
**Purpose**: Track password reset requests

**Key Columns**:
- `requestid` - Request ID (Primary Key)
- `userid` - User reference (Foreign Key)
- `token` - Reset token
- `requestdate` - When requested
- `expirydate` - Token expiration
- `status` - Pending/Used/Expired

---

## 🔗 Database Relationships

```
users (1) ──────→ (many) appointments
users (1) ──────→ (many) prescriptions
users (1) ──────→ (many) bills
users (1) ──────→ (many) reports

appointments (1) ──→ (many) prescriptions

departments (1) ──→ (many) users

medicines (1) ──→ (many) bills_medicine_list
bills (1) ──────→ (many) bills_medicine_list

tests (1) ──────→ (many) reports

manufacturers (1) ──→ (many) medicines
```

---

## 👥 Sample User Accounts (Test Credentials)

### Admin
- **Email**: admin@gmail.com
- **Password**: 123
- **Role**: ADMIN

### Doctor
- **Email**: raju@gmail.com
- **Password**: 123
- **Role**: DOCTOR

### Patient
- **Email**: child@gmail.com
- **Password**: 123
- **Role**: PATIENT

### Pharmacist
- **Email**: pha@gmail.com
- **Password**: 123
- **Role**: PHARMACIST

### Receptionist
- **Email**: recep@gmail.com
- **Password**: 123
- **Role**: RECEPTIONIST

### Laboratorist
- **Email**: rblannk@gmail.com
- **Password**: 123
- **Role**: LAB

---

## 📊 Data Statistics

| Table | Records |
|-------|---------|
| users | 22 |
| appointments | 16 |
| bills | 9 |
| bills_medicine_list | 21 |
| departments | 8 |
| manufacturers | 6 |
| medicines | 7 |
| tests | 4 |
| reports | 5 |
| prescriptions | 3 |
| diagnostics | 0 |
| password_change_request | 0 |
| **TOTAL** | **101** |

---

## 📥 Excel File Tabs

The Excel file `Hospital_Management_System_Database_Schema.xlsx` contains:

1. **DATABASE SCHEMA** (Tab 1)
   - Complete schema information
   - All tables and their columns
   - Data types and constraints

2. **users** (Tab 2)
   - All user accounts
   - 22 records

3. **appointments** (Tab 3)
   - Patient appointments
   - 16 records

4. **bills** (Tab 4)
   - Medicine bills
   - 9 records

5. **bills_medicine_list** (Tab 5)
   - Bill details
   - 21 records

6. **departments** (Tab 6)
   - Hospital departments
   - 8 records

7. **medicines** (Tab 7)
   - Medicine inventory
   - 7 records

8. **manufacturers** (Tab 8)
   - Medicine manufacturers
   - 6 records

9. **tests** (Tab 9)
   - Available lab tests
   - 4 records

10. **reports** (Tab 10)
    - Lab reports
    - 5 records

11. **prescriptions** (Tab 11)
    - Doctor prescriptions
    - 3 records

12. **diagnostics** (Tab 12)
    - Patient diagnostics
    - 0 records (empty)

13. **password_change_request** (Tab 13)
    - Password reset requests
    - 0 records (empty)

---

## 🔐 Data Types

Common data types used:

| Type | Example | Usage |
|------|---------|-------|
| INT | 1, 2, 3 | IDs, quantities |
| VARCHAR(255) | Email, names | Text fields |
| DATETIME | 2026-07-07 09:30:00 | Timestamps |
| DECIMAL(10,2) | 99.99 | Prices, amounts |
| TEXT | Long descriptions | Notes, comments |
| ENUM | ADMIN, DOCTOR | Fixed options |

---

## 🛠️ How to Use This Schema

1. **For Development**:
   - Use this to understand database structure
   - Know which tables contain which data
   - Understand relationships between tables

2. **For Queries**:
   - Reference column names for SQL queries
   - Know data types for filtering/joining
   - Understand foreign key relationships

3. **For API Design**:
   - Map endpoints to tables
   - Know what data each endpoint returns
   - Plan request/response formats

4. **For Debugging**:
   - Check if data exists in tables
   - Verify record counts
   - Look at sample data

---

## 📝 Notes

- All passwords are hashed with BCrypt (not readable)
- Foreign keys maintain referential integrity
- Timestamps are in datetime format (YYYY-MM-DD HH:MM:SS)
- Status fields typically use ENUM or VARCHAR for Pending/Active/Completed/Inactive

---

**Generated by**: Database Schema Export Tool  
**Format**: Microsoft Excel (.xlsx)  
**Compatibility**: Excel 2010+, Google Sheets, LibreOffice Calc
