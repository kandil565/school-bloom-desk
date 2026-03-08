# 🎓 School Management System

A comprehensive, full-stack school management solution built with modern technologies. Perfect for schools of all sizes.

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue)
![Backend](https://img.shields.io/badge/Backend-Express%20%2B%20Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-13AA52)
![Deployment](https://img.shields.io/badge/Deployed-Vercel-000)

---

## 🌟 Features

### 👥 Student Management
- Complete student records
- Enrollment tracking  
- Grade management
- Fee tracking
- Parent information

### 👨‍💼 HR & Staff Management
- Employee records
- Department management
- Attendance tracking
- Payroll processing
- Performance tracking

### 📊 Academic System
- Grade management
- Curriculum planning
- Assessment tracking
- Class schedules
- Report cards

### 💰 Financial System
- Fee management
- Payment tracking
- Payroll processing
- Invoice generation
- Financial reports

### 📚 Additional Features
- Library management
- Event management
- Complaint system
- Notifications
- Transportation tracking
- Inventory management
- Asset custody
- Workshop management

---

## 🚀 Live Demo

**Frontend:** https://school-bloom-desk-main.vercel.app

**Test Login:**
- Email: `admin@school.com`
- Password: `admin123`

---

## 📦 Quick Start

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/kandil565/school-bloom-desk.git
cd school-bloom-desk-main
```

2. **Install Dependencies**
```bash
npm install
cd backend && npm install
```

3. **Set Up Environment Variables**

Frontend (.env.local):
```env
VITE_API_URL=http://localhost:5000/api
```

Backend (.env):
```env
MONGODB_URI=mongodb://localhost:27017/school-management
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

4. **Run Development Servers**

Frontend:
```bash
npm run dev
```

Backend (in another terminal):
```bash
cd backend
npm run dev
```

---

## 🧪 Testing

### Run API Tests
```bash
npm run test:api
```

### Unit Tests
```bash
npm test
npm run test:watch
```

---

## 📚 Documentation

- [Setup Complete Guide](./SETUP_COMPLETE.md) - Full setup instructions
- [API Documentation](./API_DOCUMENTATION.md) - Complete API reference
- [Quick Setup](./QUICK_SETUP.md) - 5-minute quick start
- [Deployment Report](./DEPLOYMENT_REPORT.md) - Deployment details

---

## 🛠️ Technology Stack

### Frontend
- React 18 + TypeScript
- Vite (Fast build tool)
- Tailwind CSS
- ShadCN UI
- React Query + React Router

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (Password hashing)

### Deployment
- Vercel (Frontend & Backend)
- MongoDB Atlas (Database)
- GitHub (Version Control)

---

## 📊 System Overview

| Aspect | Details |
|--------|---------|
| Frontend Pages | 29 |
| UI Components | 35+ |
| API Endpoints | 60+ |
| Database Models | 13 |
| User Roles | 5 (Admin, Teacher, Staff, Parent, Student) |
| Languages | English & Arabic |
| Code Lines | 23,500+ |

---

## 🔐 Authentication & Roles

### JWT-Based Authentication
- Secure token generation
- 7-day expiration
- Automatic validation

### Role-Based Access Control
- **Admin** - Full system access
- **Teacher** - Student & grade management
- **Staff** - HR, payroll, operations
- **Parent** - Child's academic info
- **Student** - Personal academic info

---

## 📁 Project Structure

```
school-bloom-desk-main/
├── src/                         # Frontend code
│   ├── pages/                   # 29 pages
│   ├── components/              # UI components
│   ├── contexts/                # Language context
│   └── lib/                     # Utilities
├── backend/                     # Backend code
│   ├── src/
│   │   ├── models/              # Mongoose schemas
│   │   ├── controllers/         # Business logic
│   │   ├── routes/              # API routes
│   │   └── middleware/          # Auth & errors
│   └── package.json
├── api/                         # Vercel serverless
├── dist/                        # Production build
└── README.md
```

---

## 🔄 Key Endpoints

```
POST   /api/auth/login           - User login
GET    /api/students             - List students
POST   /api/students             - Create student
GET    /api/employees            - List employees
POST   /api/attendance           - Record attendance
GET    /api/fees                 - List fees
POST   /api/payroll              - Process payroll
GET    /api/health               - API health check
```

Full API documentation: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🌐 Links

| Resource | URL |
|----------|-----|
| Frontend | https://school-bloom-desk-main.vercel.app |
| GitHub | https://github.com/kandil565/school-bloom-desk |
| Vercel | https://vercel.com/kandil565s-projects |

---

## 📈 Features Deployed

✅ Role-based access control  
✅ Student management system  
✅ Staff & HR management  
✅ Attendance tracking  
✅ Grade management  
✅ Fee management  
✅ Payroll processing  
✅ Inventory management  
✅ Asset custody  
✅ Event management  
✅ Complaint system  
✅ Notifications  
✅ Library management  
✅ Transportation tracking  
✅ Bilingual (English/Arabic)  

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- ShadCN UI for component library
- Vercel for deployment
- MongoDB for database
- Open source community

---

## ✨ Recent Updates

✅ Removed all phone number fields  
✅ Added comprehensive role-based middleware  
✅ Complete API documentation  
✅ Production-ready deployment  
✅ Comprehensive testing suite  

---

**Status:** Production Ready ✅  
**Last Updated:** March 8, 2026  
**Version:** 1.0.0

