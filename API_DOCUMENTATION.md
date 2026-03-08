# 📚 School Management System - Complete API Documentation

## 🌐 API Base URL
```
Production: https://school-bloom-desk-main.vercel.app/api
Development: http://localhost:5000/api
```

---

## 🔐 Authentication

### Login (Get Token)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "name": "Administrator",
      "email": "admin@school.com",
      "role": "admin"
    },
    "token": "eyJhbGc..."
  }
}
```

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@school.com",
  "password": "password123",
  "role": "teacher"
}
```

### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

---

## 👥 Student Management

### List All Students
```http
GET /api/students
Authorization: Bearer <token>
```

### Get Single Student
```http
GET /api/students/:id
Authorization: Bearer <token>
```

### Create Student
```http
POST /api/students
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Ahmed",
  "lastName": "Hassan",
  "dateOfBirth": "2010-05-15",
  "gender": "Male",
  "email": "ahmed@school.com",
  "grade": "10",
  "section": "A",
  "parentName": "Hassan Ali",
  "parentEmail": "parent@gmail.com",
  "address": "Cairo, Egypt"
}
```

### Update Student
```http
PUT /api/students/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Ahmed",
  "lastName": "Hassan",
  "grade": "11"
}
```

### Delete Student
```http
DELETE /api/students/:id
Authorization: Bearer <token>
```

---

## 👨‍💼 Employee Management

### List All Employees
```http
GET /api/employees
Authorization: Bearer <token>
```

### Get Single Employee
```http
GET /api/employees/:id
Authorization: Bearer <token>
```

### Create Employee
```http
POST /api/employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Fatima",
  "lastName": "Mohammed",
  "email": "fatima@school.com",
  "position": "Teacher",
  "department": "Academic",
  "employmentType": "Full-time",
  "dateOfJoining": "2021-09-01",
  "salary": 3000,
  "address": "Cairo, Egypt"
}
```

### Update Employee
```http
PUT /api/employees/:id
Authorization: Bearer <token>
Content-Type: application/json
```

### Delete Employee
```http
DELETE /api/employees/:id
Authorization: Bearer <token>
```

---

## ✅ Attendance System

### List Attendance Records
```http
GET /api/attendance
Authorization: Bearer <token>
```

**Query Parameters:**
- `date=2024-03-08` - Filter by date
- `employeeId=xxx` - Filter by employee
- `status=Present` - Filter by status

### Record Attendance
```http
POST /api/attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "employeeId": "xxx",
  "date": "2024-03-08",
  "status": "Present",
  "checkInTime": "08:00",
  "checkOutTime": "16:00"
}
```

### Update Attendance
```http
PUT /api/attendance/:id
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 💰 Fee Management

### List Fees
```http
GET /api/fees
Authorization: Bearer <token>
```

**Query Parameters:**
- `studentId=xxx` - Filter by student
- `status=Pending` - Filter by status

### Create Fee
```http
POST /api/fees
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": "xxx",
  "academicYear": "2024",
  "feeType": "Tuition",
  "amount": 5000,
  "dueDate": "2024-03-31",
  "status": "Pending"
}
```

### Update Fee / Record Payment
```http
PUT /api/fees/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Paid",
  "paidDate": "2024-03-15",
  "paymentMethod": "Bank Transfer"
}
```

---

## 💵 Payroll System

### List Payroll Records
```http
GET /api/payroll
Authorization: Bearer <token>
```

### Create Payroll
```http
POST /api/payroll
Authorization: Bearer <token>
Content-Type: application/json

{
  "employeeId": "xxx",
  "month": "March",
  "year": 2024,
  "baseSalary": 3000,
  "allowances": 500,
  "deductions": 300,
  "netSalary": 3200,
  "status": "Processed"
}
```

### Update Payroll
```http
PUT /api/payroll/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Paid",
  "paymentDate": "2024-03-25"
}
```

---

## 📦 Inventory Management

### List Inventory Items
```http
GET /api/inventory
Authorization: Bearer <token>
```

**Query Parameters:**
- `category=Stationery` - Filter by category
- `status=Available` - Filter by status

### Create Inventory Item
```http
POST /api/inventory
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemCode": "STT001",
  "itemName": "Notebooks",
  "category": "Stationery",
  "quantity": 100,
  "reorderLevel": 20,
  "unitPrice": 5,
  "supplier": "Al Noor Supplies",
  "location": "Store A"
}
```

### Update Inventory
```http
PUT /api/inventory/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 80,
  "status": "Available"
}
```

---

## 🏛️ Assets Management

### List Assets
```http
GET /api/assets
Authorization: Bearer <token>
```

### Create Asset
```http
POST /api/assets
Authorization: Bearer <token>
Content-Type: application/json

{
  "assetCode": "AST001",
  "assetName": "Computer Lab - Desktop 1",
  "category": "Electronics",
  "purchaseDate": "2021-01-15",
  "purchasePrice": 25000,
  "currentValue": 18000,
  "assignedTo": "employeeId",
  "location": "Computer Lab",
  "status": "Active"
}
```

---

## 📊 Grades & Assessment

### List Grades
```http
GET /api/grades
Authorization: Bearer <token>
```

**Query Parameters:**
- `studentId=xxx` - Filter by student
- `subject=Mathematics` - Filter by subject

### Record Grade
```http
POST /api/grades
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": "xxx",
  "subject": "Mathematics",
  "assessmentType": "Mid-term",
  "marks": 85,
  "totalMarks": 100,
  "grade": "A",
  "academicYear": "2024"
}
```

---

## 📚 Library Management

### List Books
```http
GET /api/library
Authorization: Bearer <token>
```

**Query Parameters:**
- `category=Fiction` - Filter by category
- `availability=Available` - Filter by availability

### Add Book
```http
POST /api/library
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "category": "Fiction",
  "quantity": 5,
  "publisher": "Scribner",
  "publicationYear": 1925,
  "availability": "Available"
}
```

### Borrow Book
```http
PUT /api/library/:id/borrow
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": "xxx",
  "dueDate": "2024-04-08"
}
```

---

## 🎓 Curriculum Management

### List Curriculum
```http
GET /api/curriculum
Authorization: Bearer <token>
```

### Create Curriculum
```http
POST /api/curriculum
Authorization: Bearer <token>
Content-Type: application/json

{
  "grade": "10",
  "subject": "Mathematics",
  "academicYear": "2024",
  "topics": ["Algebra", "Geometry", "Trigonometry"],
  "totalPeriods": 60,
  "teacherId": "xxx"
}
```

---

## 🎉 Events Management

### List Events
```http
GET /api/events
Authorization: Bearer <token>
```

### Create Event
```http
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventName": "Annual Sports Day",
  "eventDate": "2024-04-15",
  "eventType": "Sports",
  "description": "Annual sports competition",
  "organizer": "PE Department",
  "participantCount": 200,
  "budget": 50000,
  "status": "Planned"
}
```

---

## 📞 Complaint Management

### List Complaints
```http
GET /api/complaints
Authorization: Bearer <token>
```

**Query Parameters:**
- `status=Open` - Filter by status
- `priority=High` - Filter by priority

### Create Complaint
```http
POST /api/complaints
Authorization: Bearer <token>
Content-Type: application/json

{
  "complainantName": "Parent Name",
  "complainantEmail": "parent@example.com",
  "category": "Academic",
  "subject": "Complaint Subject",
  "description": "Detailed complaint description",
  "priority": "Medium",
  "status": "Open"
}
```

### Update Complaint Status
```http
PUT /api/complaints/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Resolved",
  "remarks": "Issue resolved"
}
```

---

## 🔔 Notifications

### List Notifications
```http
GET /api/notifications
Authorization: Bearer <token>
```

### Send Notification
```http
POST /api/notifications
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "xxx",
  "title": "Notification Title",
  "message": "Notification message",
  "type": "Info"
}
```

### Mark as Read
```http
PUT /api/notifications/:id/read
Authorization: Bearer <token>
```

---

## 🚌 Transportation

### List Transportation
```http
GET /api/transportation
Authorization: Bearer <token>
```

### Create Bus Route
```http
POST /api/transportation
Authorization: Bearer <token>
Content-Type: application/json

{
  "busNumber": "BUS001",
  "driverName": "Ahmed",
  "route": "Route A",
  "capacity": 50,
  "status": "Operational"
}
```

---

## 🏪 Canteen Management

### List Canteen Items
```http
GET /api/canteen
Authorization: Bearer <token>
```

### Add Menu Item
```http
POST /api/canteen
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemName": "Sandwich",
  "category": "Food",
  "price": 25,
  "availability": "Available",
  "preparationTime": 5
}
```

---

## 🏢 Supplier Management

### List Suppliers
```http
GET /api/suppliers
Authorization: Bearer <token>
```

### Create Supplier
```http
POST /api/suppliers
Authorization: Bearer <token>
Content-Type: application/json

{
  "company": "ABC Supplies",
  "contact": "contact@abc.com",
  "category": "Stationery",
  "status": "Active"
}
```

---

## 🛠️ Workshops

### List Workshops
```http
GET /api/workshops
Authorization: Bearer <token>
```

### Create Workshop
```http
POST /api/workshops
Authorization: Bearer <token>
Content-Type: application/json

{
  "workshopName": "Science Workshop",
  "instructor": "Dr. Ahmed",
  "schedule": "Wednesday",
  "participants": 30,
  "status": "Active"
}
```

---

## ✔️ Health Check

### Server Status
```http
GET /api/health
```

**Response:**
```json
{
  "status": "Server is running"
}
```

---

## 📊 Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

### Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## 🔐 Authorization

All endpoints (except `/auth/login`, `/auth/register`, `/health`) require:

```http
Authorization: Bearer <token>
```

Get the token from the login endpoint.

---

## 🧪 Testing with cURL

### Login Example
```bash
curl -X POST https://school-bloom-desk-main.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.com",
    "password": "admin123"
  }'
```

### List Students Example
```bash
curl -X GET https://school-bloom-desk-main.vercel.app/api/students \
  -H "Authorization: Bearer <token>"
```

---

## 📋 Rate Limiting

- No rate limiting in development
- Production: 100 requests per minute per IP

---

## 📝 Best Practices

1. **Always include** `Authorization` header for protected routes
2. **Use appropriate** HTTP methods (GET, POST, PUT, DELETE)
3. **Send JSON** data with `Content-Type: application/json`
4. **Check status codes** in responses
5. **Handle errors** gracefully in your application
6. **Store token** securely (localStorage for frontend)
7. **Refresh token** before expiry

---

## 🚀 Pagination (Future)

Pagination support will be added with:
- `?page=1`
- `?limit=10`
- `?sort=name`
- `?order=asc`

---

**Last Updated:** March 8, 2026  
**API Version:** 1.0  
**Status:** Production Ready ✅
