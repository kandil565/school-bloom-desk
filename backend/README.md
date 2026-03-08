# School Management System - Backend

A comprehensive Node.js/Express backend for a School Internal Operations Management System (SIOMS).

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Student Management**: Complete student information and records management
- **Employee/HR Management**: Employee data, departments, and positions
- **Attendance Tracking**: Mark and manage attendance records
- **Fee Management**: Student fee tracking and payment status
- **Payroll System**: Employee salary and payroll management
- **Inventory Management**: Track school supplies and equipment
- **Asset Custody**: Manage school assets and their custodians
- **Complaint Management**: Handle student/parent complaints and suggestions
- **Notifications**: Real-time notification system

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── studentController.js
│   │   ├── employeeController.js
│   │   ├── attendanceController.js
│   │   ├── feeController.js
│   │   ├── payrollController.js
│   │   ├── inventoryController.js
│   │   ├── complaintController.js
│   │   └── notificationController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Employee.js
│   │   ├── Attendance.js
│   │   ├── Fee.js
│   │   ├── Payroll.js
│   │   ├── Inventory.js
│   │   ├── Asset.js
│   │   ├── Grade.js
│   │   ├── Library.js
│   │   ├── Event.js
│   │   ├── Complaint.js
│   │   └── Notification.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── feeRoutes.js
│   │   ├── payrollRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── complaintRoutes.js
│   │   └── notificationRoutes.js
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   └── errorHandler.js      # Error handling
│   ├── utils/
│   │   ├── tokenUtils.js        # JWT utilities
│   │   ├── authUtils.js         # Password hashing
│   │   └── ApiResponse.js       # Response formatting
│   └── server.js                # Express app setup
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your configuration:
   ```
   MONGODB_URI=mongodb://localhost:27017/school-management
   JWT_SECRET=your_jwt_secret_key_change_in_production
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - For Windows: `mongod`
   - For Linux/Mac: `mongod --dbpath /path/to/data`

5. **Run the server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

The server will be running at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance

### Fees
- `GET /api/fees` - Get all fees
- `GET /api/fees/:id` - Get fee by ID
- `POST /api/fees` - Create new fee
- `PUT /api/fees/:id` - Update fee

### Payroll
- `GET /api/payroll` - Get all payroll records
- `GET /api/payroll/:id` - Get payroll by ID
- `POST /api/payroll` - Create payroll
- `PUT /api/payroll/:id` - Update payroll

### Inventory
- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/:id` - Get item by ID
- `POST /api/inventory` - Create inventory item
- `PUT /api/inventory/:id` - Update inventory item
- `DELETE /api/inventory/:id` - Delete inventory item

### Complaints
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/:id` - Get complaint by ID
- `POST /api/complaints` - Create complaint
- `PUT /api/complaints/:id` - Update complaint

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Login to get a token:
   ```bash
   POST /api/auth/login
   {
     "email": "user@example.com",
     "password": "password"
   }
   ```

2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your_token>
   ```

## Request/Response Format

### Successful Response
```json
{
  "statusCode": 200,
  "data": { ... },
  "message": "Success",
  "success": true
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error message",
  "success": false
}
```

## Database Models

### User Model
- name, email, password, role, department, avatar, isActive, lastLogin

### Student Model
- rollNumber, firstName, lastName, dateOfBirth, gender, email, grade, section, parentDetails, address, admissionDate

### Employee Model
- employeeId, firstName, lastName, email, position, department, employmentType, dateOfJoining, salary, bankAccount, address

### Attendance Model
- employeeId, date, status, checkInTime, checkOutTime, remarks

### Fee Model
- studentId, academicYear, feeType, amount, dueDate, paidDate, status, paymentMethod, receiptNumber

### Payroll Model
- employeeId, month, baseSalary, allowances, deductions, netSalary, status, paymentDate

### Inventory Model
- itemCode, itemName, category, quantity, reorderLevel, unitPrice, supplier, location, status

### Complaint Model
- complaintId, complainantName, category, subject, description, priority, status, assignedTo, resolvedDate

## Development

### Running Tests
```bash
npm test
npm run test:watch
```

### Code Quality
```bash
npm run lint
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/school-management` |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |

## Security Best Practices

1. **Change JWT_SECRET** in production
2. Use environment variables for sensitive data
3. Implement rate limiting for API routes
4. Use HTTPS in production
5. Hash passwords with bcryptjs
6. Validate all user inputs
7. Implement CORS properly
8. Use MongoDB authentication

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity

### JWT Token Errors
- Token expired: User needs to login again
- Invalid token: Check token format in Authorization header
- Reset JWT_SECRET properly

### CORS Errors
- Ensure frontend URL is added to CORS whitelist
- Check credentials settings

## Future Enhancements

- [ ] Email notifications
- [ ] File upload for documents
- [ ] Advanced reporting and analytics
- [ ] SMS notifications
- [ ] Mobile app API
- [ ] WebSocket for real-time updates
- [ ] File attachment support
- [ ] Advanced search and filtering
- [ ] Pagination improvements
- [ ] Caching with Redis

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to the repository
5. Create a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue in the repository.
