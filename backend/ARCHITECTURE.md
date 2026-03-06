# Backend Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React/TypeScript)                 │
│                                                                 │
│  • LoginPage, DashboardHome, StudentManagement, etc.           │
│  • Components, Pages, UI Components                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │ JSON Requests
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER (Node.js)                     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Express.js API                         │  │
│  │                                                          │  │
│  │  ┌──────────────────────────────────────────────┐       │  │
│  │  │  Routes (/api/students, /api/employees...)  │       │  │
│  │  └──────────────────────────────────────────────┘       │  │
│  │                        │                                │  │
│  │                        ▼                                │  │
│  │  ┌──────────────────────────────────────────────┐       │  │
│  │  │      Middleware (Auth, Error Handler)       │       │  │
│  │  │  • authMiddleware (JWT verification)        │       │  │
│  │  │  • errorHandler (Global error handling)     │       │  │
│  │  └──────────────────────────────────────────────┘       │  │
│  │                        │                                │  │
│  │                        ▼                                │  │
│  │  ┌──────────────────────────────────────────────┐       │  │
│  │  │    Controllers (Business Logic)              │       │  │
│  │  │                                              │       │  │
│  │  │  • authController (Login, Register)          │       │  │
│  │  │  • studentController (CRUD Students)         │       │  │
│  │  │  • employeeController (CRUD Employees)       │       │  │
│  │  │  • attendanceController (Track Attendance)   │       │  │
│  │  │  • feeController (Fee Management)            │       │  │
│  │  │  • payrollController (Payroll Processing)    │       │  │
│  │  │  • inventoryController (Inventory Tracking)  │       │  │
│  │  │  • assetController (Asset Management)        │       │  │
│  │  │  • gradeController (Grade Management)        │       │  │
│  │  │  • libraryController (Library Books)         │       │  │
│  │  │  • eventController (Events Management)       │       │  │
│  │  │  • complaintController (Complaint Handling)  │       │  │
│  │  │  • notificationController (Notifications)    │       │  │
│  │  └──────────────────────────────────────────────┘       │  │
│  │                        │                                │  │
│  │                        ▼                                │  │
│  │  ┌──────────────────────────────────────────────┐       │  │
│  │  │    Database Models (Mongoose Schemas)       │       │  │
│  │  │                                              │       │  │
│  │  │  • User (Authentication & Roles)             │       │  │
│  │  │  • Student (Student Records)                 │       │  │
│  │  │  • Employee (Employee Data)                  │       │  │
│  │  │  • Attendance (Track Attendance)             │       │  │
│  │  │  • Fee (Fee Information)                     │       │  │
│  │  │  • Payroll (Salary Management)               │       │  │
│  │  │  • Inventory (Equipment & Supplies)          │       │  │
│  │  │  • Asset (Asset Tracking)                    │       │  │
│  │  │  • Grade (Academic Grades)                   │       │  │
│  │  │  • Library (Book Inventory)                  │       │  │
│  │  │  • Event (School Events)                     │       │  │
│  │  │  • Complaint (Complaint Records)             │       │  │
│  │  │  • Notification (User Notifications)         │       │  │
│  │  └──────────────────────────────────────────────┘       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Utilities & Configuration                      │  │
│  │  • tokenUtils (JWT Generation & Verification)            │  │
│  │  • authUtils (Password Hashing)                          │  │
│  │  • ApiResponse (Standardized Responses)                  │  │
│  │  • constants (Constants & Helpers)                       │  │
│  │  • seedData (Sample Data Generator)                      │  │
│  │  • database (MongoDB Connection)                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                         │
                         │ MongoDB Protocol
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  MONGODB DATABASE                               │
│                                                                 │
│  Collections:                                                   │
│  ├── users           (User authentication & roles)              │
│  ├── students        (Student information)                      │
│  ├── employees       (Employee records)                         │
│  ├── attendances     (Attendance records)                       │
│  ├── fees            (Fee information)                          │
│  ├── payrolls        (Payroll records)                          │
│  ├── inventories     (Inventory items)                          │
│  ├── assets          (Asset tracking)                           │
│  ├── grades          (Academic grades)                          │
│  ├── libraries       (Book inventory)                           │
│  ├── events          (School events)                            │
│  ├── complaints      (Complaint records)                        │
│  └── notifications   (User notifications)                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request-Response Flow

```
┌──────────┐
│ Frontend │
└────┬─────┘
     │
     │ 1. HTTP Request
     │    (with JWT token in header)
     │
     ▼
┌──────────────────────────────────────┐
│  Express Router                       │
│  Matches URL to Route Handler         │
└────┬─────────────────────────────────┘
     │
     │ 2. Route Handler
     │
     ▼
┌──────────────────────────────────────┐
│  Middleware Chain                     │
│  • CORS Check                         │
│  • JSON Parsing                       │
│  • Auth Verification (JWT)            │
│  • Error Catching                     │
└────┬─────────────────────────────────┘
     │
     │ 3. Controller Logic
     │
     ▼
┌──────────────────────────────────────┐
│  Controller                           │
│  Processes Business Logic             │
│  Validates Input                      │
└────┬─────────────────────────────────┘
     │
     │ 4. Database Operations
     │
     ▼
┌──────────────────────────────────────┐
│  Mongoose Model                       │
│  • Query Building                     │
│  • Validation                         │
│  • Hook Execution                     │
└────┬─────────────────────────────────┘
     │
     │ 5. MongoDB Operation
     │
     ▼
┌──────────────────────────────────────┐
│  MongoDB                              │
│  • Execute Query                      │
│  • Return Data                        │
└────┬─────────────────────────────────┘
     │
     │ 6. Response Data
     │
     ▼
┌──────────────────────────────────────┐
│  Controller                           │
│  Format Response                      │
│  Set Status Code                      │
└────┬─────────────────────────────────┘
     │
     │ 7. Send Response
     │
     ▼
┌──────────────────────────────────────┐
│  HTTP Response                        │
│  JSON Data + Status Code              │
└────┬─────────────────────────────────┘
     │
     │ 8. Receive Response
     │
     ▼
┌──────────┐
│ Frontend │
│ Render   │
│ UI       │
└──────────┘
```

---

## Database Schema Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                         User                                │
│  (Base user for all system users)                          │
│  • Admin, Teacher, Staff, Parent, Student roles            │
│  ╔═══════════════════════════════════════════════════════╗ │
│  ║ id, name, email, password, role, department           ║ │
│  ║ phone, avatar, isActive, lastLogin                    ║ │
│  ╚═══════════════════════════════════════════════════════╝ │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ (One User → Many Records)
       │
       ├──► ┌──────────────────────────┐
       │    │   Student                │
       │    │ (Student Information)    │
       │    ├──────────────────────────┤
       │    │ rollNumber, firstName    │
       │    │ lastName, grade, section │
       │    │ parent info, address     │
       │    └──────────────────────────┘
       │         │
       │         │ (1 Student → Many Records)
       │         │
       │         ├──► ┌──────────────────────┐
       │         │    │ Fee                  │
       │         │    │ (Fee Records)        │
       │         │    ├──────────────────────┤
       │         │    │ amount, dueDate      │
       │         │    │ status, payment      │
       │         │    └──────────────────────┘
       │         │
       │         └──► ┌──────────────────────┐
       │              │ Grade                │
       │              │ (Academic Grades)    │
       │              ├──────────────────────┤
       │              │ subject, marks       │
       │              │ percentage, grade    │
       │              └──────────────────────┘
       │
       ├──► ┌──────────────────────────┐
       │    │   Employee               │
       │    │ (Employee Information)   │
       │    ├──────────────────────────┤
       │    │ employeeId, position     │
       │    │ department, salary       │
       │    │ dateOfJoining            │
       │    └──────────────────────────┘
       │         │
       │         │ (1 Employee → Many Records)
       │         │
       │         ├──► ┌──────────────────────┐
       │         │    │ Attendance           │
       │         │    │ (Attendance Records) │
       │         │    ├──────────────────────┤
       │         │    │ date, status         │
       │         │    │ checkInTime          │
       │         │    │ checkOutTime         │
       │         │    └──────────────────────┘
       │         │
       │         └──► ┌──────────────────────┐
       │              │ Payroll              │
       │              │ (Salary Records)     │
       │              ├──────────────────────┤
       │              │ month, baseSalary    │
       │              │ allowances, status   │
       │              └──────────────────────┘
       │
       └──► ┌──────────────────────────┐
            │   Notification           │
            │ (User Notifications)     │
            ├──────────────────────────┤
            │ title, message, type     │
            │ isRead, timestamp        │
            └──────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  Shared Collections (Not directly linked to User)            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Inventory              Complaint          Asset            │
│  (Equipment & Supplies) (Grievance System) (Fixed Assets)   │
│  ├── itemCode           ├── complaintId    ├── assetCode    │
│  ├── itemName           ├── subject        ├── assetName    │
│  ├── quantity           ├── category       ├── custodian    │
│  ├── status             ├── status         ├── status       │
│  └── supplier           └── assignedTo     └── warranty     │
│                                                              │
│  Library               Event               Notification     │
│  (Book Inventory)      (School Events)     (System Alerts)  │
│  ├── bookId            ├── eventName       ├── userId       │
│  ├── title             ├── startDate       ├── title        │
│  ├── author            ├── endDate         ├── message      │
│  ├── quantity          ├── participants    ├── type         │
│  └── category          └── budget          └── isRead       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Module Dependencies

```
Core Authentication
    ├── authController
    ├── User Model
    ├── tokenUtils
    └── authUtils

Application Modules
    ├── Student Management
    │   ├── Student Model
    │   ├── Fee Management
    │   │   └── Fee Model
    │   └── Grade Management
    │       └── Grade Model
    │
    ├── HR Management
    │   ├── Employee Model
    │   ├── Attendance Tracking
    │   │   └── Attendance Model
    │   └── Payroll System
    │       └── Payroll Model
    │
    ├── Inventory & Assets
    │   ├── Inventory Model
    │   └── Asset Model
    │
    ├── Knowledge Management
    │   └── Library Model
    │
    ├── Activities
    │   └── Event Model
    │
    └── Feedback System
        └── Complaint Model

Support Services
    ├── Notification System
    │   └── Notification Model
    │
    ├── Middleware
    │   ├── Auth Middleware
    │   └── Error Handler
    │
    └── Utilities
        ├── Constants
        ├── ApiResponse
        └── seedData
```

---

## Technology Stack Visualization

```
                    ┌─────────────────────┐
                    │   Frontend (React)  │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   HTTP/HTTPS REST   │
                    │    API Transport    │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────▼──────────────────────┐
        │          Node.js Runtime Environment        │
        │                                            │
        │  ┌──────────────────────────────────────┐  │
        │  │  Express.js Framework                │  │
        │  │                                      │  │
        │  │  ┌──────────────────────────────┐   │  │
        │  │  │ Mongoose ODM                 │   │  │
        │  │  │                              │   │  │
        │  │  │ ┌──────────────────────────┐ │   │  │
        │  │  │ │  MongoDB Database Driver │ │   │  │
        │  │  │ └──────────────────────────┘ │   │  │
        │  │  └──────────────────────────────┘   │  │
        │  │                                      │  │
        │  │  ┌──────────────────────────────┐   │  │
        │  │  │ Security Libraries           │   │  │
        │  │  │ • JWT (jsonwebtoken)         │   │  │
        │  │  │ • bcryptjs (encryption)      │   │  │
        │  │  │ • CORS                       │   │  │
        │  │  └──────────────────────────────┘   │  │
        │  └──────────────────────────────────────┘  │
        │                                            │
        └────────────────┬─────────────────────────┘
                         │
                         │ MongoDB Protocol
                         │
              ┌──────────▼─────────────┐
              │  MongoDB Database      │
              │                        │
              │  Collections (13):     │
              │  • users               │
              │  • students            │
              │  • employees           │
              │  • attendances         │
              │  • fees                │
              │  • payrolls            │
              │  • inventories         │
              │  • assets              │
              │  • grades              │
              │  • libraries           │
              │  • events              │
              │  • complaints          │
              │  • notifications       │
              └────────────────────────┘
```

---

## Folder Structure Hierarchy

```
backend/
│
├── src/
│   │
│   ├── config/
│   │   └── database.js ......................... MongoDB Connection
│   │
│   ├── models/ (13 Database Schemas)
│   │   ├── User.js ........................... Authentication
│   │   ├── Student.js ........................ Student Records
│   │   ├── Employee.js ....................... Employee Data
│   │   ├── Attendance.js ..................... Attendance
│   │   ├── Fee.js ........................... Fees
│   │   ├── Payroll.js ........................ Payroll
│   │   ├── Inventory.js ...................... Inventory
│   │   ├── Asset.js .......................... Assets
│   │   ├── Grade.js .......................... Grades
│   │   ├── Library.js ........................ Library
│   │   ├── Event.js .......................... Events
│   │   ├── Complaint.js ...................... Complaints
│   │   └── Notification.js ................... Notifications
│   │
│   ├── controllers/ (13 Business Logic)
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── employeeController.js
│   │   ├── attendanceController.js
│   │   ├── feeController.js
│   │   ├── payrollController.js
│   │   ├── inventoryController.js
│   │   ├── assetController.js
│   │   ├── gradeController.js
│   │   ├── libraryController.js
│   │   ├── eventController.js
│   │   ├── complaintController.js
│   │   └── notificationController.js
│   │
│   ├── routes/ (13 API Endpoints)
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── feeRoutes.js
│   │   ├── payrollRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── assetRoutes.js
│   │   ├── gradeRoutes.js
│   │   ├── libraryRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── complaintRoutes.js
│   │   └── notificationRoutes.js
│   │
│   ├── middleware/
│   │   ├── auth.js ........................... JWT Authentication
│   │   └── errorHandler.js .................. Error Handling
│   │
│   ├── utils/
│   │   ├── tokenUtils.js ..................... JWT Functions
│   │   ├── authUtils.js ...................... Password Hashing
│   │   ├── ApiResponse.js .................... Response Format
│   │   ├── constants.js ...................... Constants
│   │   └── seedData.js ....................... Sample Data
│   │
│   └── server.js ............................ Main App Entry
│
├── package.json ............................ Dependencies
├── .env .................................... Configuration
├── .env.example ............................. Template
├── .gitignore ............................... Git Ignore
│
└── Documentation Files:
    ├── README.md ............................ Complete API Docs
    ├── SETUP.md ............................. Installation Guide
    ├── DEPLOYMENT.md ........................ Production Guide
    ├── API_EXAMPLES.md ...................... Usage Examples
    ├── INDEX.md ............................. Quick Reference
    └── COMPLETE.md .......................... Build Summary
```

---

## Data Flow Example: Creating a Student

```
1. Frontend (React)
   └── User fills form and clicks "Create Student"
   
2. Frontend sends HTTP POST request
   └── POST /api/students
       Headers: { Authorization: "Bearer token" }
       Body: { rollNumber, firstName, lastName, ... }

3. Backend Express Server receives request
   └── Route handler: POST /api/students

4. Middleware Priority:
   └── 1. CORS Check ✓
   └── 2. JSON Parser ✓
   └── 3. Auth Middleware (verifies JWT token) ✓
   └── 4. Error Catching Middleware ✓

5. Request reaches studentController.createStudent()
   └── Validates input data
   └── Checks for duplicate rollNumber

6. Controller calls Student.create() (Mongoose)
   └── Mongoose validates schema
   └── Hash passwords if needed
   └── Execute MongoDB insert

7. MongoDB Database
   └── Inserts document into "students" collection
   └── Returns created document with _id

8. Controller receives response
   └── Formats with ApiResponse wrapper
   └── Sets statusCode: 201

9. Express sends HTTP Response
   └── Status: 201 Created
   └── Body: { statusCode, data, message, success }

10. Frontend receives response
    └── Shows success notification
    └── Updates student list
```

---

This architecture provides:
✅ Scalability
✅ Maintainability  
✅ Security
✅ Performance
✅ Modularity
✅ Clear Separation of Concerns
