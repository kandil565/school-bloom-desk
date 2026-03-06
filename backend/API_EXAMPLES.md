/**
 * School Management System Backend API
 * Complete REST API for managing all school operations
 * 
 * Features:
 * - User Authentication (JWT)
 * - Student Management
 * - Employee/HR Management
 * - Attendance Tracking
 * - Fee Management
 * - Payroll System
 * - Inventory Management
 * - Asset Custody
 * - Complaint Management
 * - Notifications
 * 
 * API Base URL: http://localhost:5000/api
 * 
 * All endpoints (except /auth/login and /auth/register) require:
 * Authorization: Bearer <token>
 */

// Example: Login
// POST http://localhost:5000/api/auth/login
// {
//   "email": "admin@school.com",
//   "password": "password123"
// }

// Response:
// {
//   "statusCode": 200,
//   "data": {
//     "user": {
//       "_id": "...",
//       "name": "Admin",
//       "email": "admin@school.com",
//       "role": "admin"
//     },
//     "token": "eyJhbGc..."
//   },
//   "message": "Login successful",
//   "success": true
// }

// Example: Get All Students
// GET http://localhost:5000/api/students
// Headers: Authorization: Bearer <token>

// Example: Create Student
// POST http://localhost:5000/api/students
// Headers: Authorization: Bearer <token>
// {
//   "rollNumber": "STU001",
//   "firstName": "John",
//   "lastName": "Doe",
//   "dateOfBirth": "2010-01-15",
//   "gender": "Male",
//   "email": "john@example.com",
//   "grade": "10",
//   "section": "A"
// }
