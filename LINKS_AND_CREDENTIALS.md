# 🔗 LINKS & CREDENTIALS - الروابط والبيانات

## 🌍 Final Live URLs (بعد النشر)

```
🎨 Frontend Website:
   https://school-management-system.vercel.app

⚙️  Backend API Server:
   https://school-management-backend.railway.app/api

🏥 Health Check:
   https://school-management-backend.railway.app/api/health

📊 Swagger Docs (Optional):
   https://school-management-backend.railway.app/api-docs
```

---

## 🔐 Login Credentials

```
Default Admin User:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: admin@school.com
Password: admin123
Role: Admin
Department: Admin

Other Sample Users (after seed):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Teacher:
  Email: teacher1@school.com
  Password: teacher123

Staff:
  Email: staff@school.com
  Password: staff123
```

---

## 📋 Required Services & Accounts

### 1. GitHub
```
Purpose: Code Repository
Cost: Free
Link: https://github.com/signup
```

### 2. Vercel (Frontend Hosting)
```
Purpose: Deploy React App
Cost: Free (with hobby plan)
Link: https://vercel.com/signup
```

### 3. Railway (Backend Hosting)
```
Purpose: Deploy Node.js Backend
Cost: $5/month (or free tier with limits)
Link: https://railway.app
```

### 4. MongoDB Atlas (Database)
```
Purpose: Cloud Database
Cost: Free (512MB storage)
Link: https://www.mongodb.com/cloud/atlas
```

---

## 🚀 Quick Start Links

| Task | Link | Time |
|------|------|------|
| Read Quick Deploy | [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) | 5 min read |
| Detailed Guide | [LIVE_DEPLOYMENT.md](./LIVE_DEPLOYMENT.md) | 20 min read |
| Arabic Guide | [DEPLOYMENT_GUIDE_AR.md](./DEPLOYMENT_GUIDE_AR.md) | 15 min read |
| Checklist | [DEPLOYMENT_CHECKLIST.js](./DEPLOYMENT_CHECKLIST.js) | Run: `node DEPLOYMENT_CHECKLIST.js` |
| Architecture | [ARCHITECTURE.md](./ARCHITECTURE.md) | 10 min read |
| API Reference | [backend/README.md](./backend/README.md) | Reference |

---

## 🛠️ Installation Commands

### Frontend
```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Preview production build
npm preview
```

### Backend
```bash
# Install dependencies
cd backend
npm install

# Development
npm run dev

# Production
npm start

# Seed sample data
npm run seed
```

---

## 🌦️ Environment Variables

### Frontend
Create `.env.production`:
```
VITE_API_URL=https://school-management-backend.railway.app/api
VITE_APP_NAME=School Management System
VITE_APP_VERSION=1.0.0
```

### Backend
Create `backend/.env`:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/school
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production
```

---

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/login          - Login user
POST   /api/auth/register       - Register new user
GET    /api/auth/me             - Get current user
PUT    /api/auth/profile        - Update profile
```

### Students
```
GET    /api/students            - List all students
GET    /api/students/:id        - Get single student
POST   /api/students            - Create new student
PUT    /api/students/:id        - Update student
DELETE /api/students/:id        - Delete student
```

### Employees
```
GET    /api/employees           - List all employees
GET    /api/employees/:id       - Get single employee
POST   /api/employees           - Create new employee
PUT    /api/employees/:id       - Update employee
DELETE /api/employees/:id       - Delete employee
```

### Full API Docs
See [backend/README.md](./backend/README.md) for complete 60+ endpoints

---

## 📂 Project Structure

```
school-bloom-system/
├── src/                          # Frontend (React/TypeScript)
│   ├── pages/                    # Page components
│   ├── components/               # Reusable components
│   ├── contexts/                 # React contexts
│   ├── hooks/                    # Custom hooks
│   ├── lib/                      # Utilities
│   └── App.tsx                   # Main app
├── backend/                      # Backend (Node.js/Express)
│   ├── src/
│   │   ├── models/               # Database schemas
│   │   ├── controllers/          # Business logic
│   │   ├── routes/               # API routes
│   │   ├── middleware/           # Auth & error handling
│   │   ├── utils/                # Utilities
│   │   ├── config/               # Configuration
│   │   └── server.js             # Main server
│   └── package.json
├── package.json                  # Frontend dependencies
├── vite.config.ts                # Vite configuration
└── vercel.json                   # Vercel deployment config
```

---

## 🧪 Testing

### Frontend Testing
```bash
# Unit tests
npm run test

# Integration tests
npm run test:watch
```

### API Testing
```bash
# Use Postman/Thunder Client
# Import collection from: docs/postman-collection.json

# Or use curl
curl -X GET http://localhost:5000/api/health
```

---

## 🔄 Deployment Process

### Step 1: GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/school-management-system.git
git push -u origin main
```

### Step 2: Vercel (Frontend)
1. Go to https://vercel.com/import
2. Select your GitHub repo
3. Configure build settings
4. Deploy!

### Step 3: Railway (Backend)
```bash
npm install -g @railway/cli
railway login
cd backend
railway init
railway up
```

### Step 4: MongoDB (Database)
1. Create cluster on https://cloud.mongodb.com
2. Get connection string
3. Add to Railway environment variables

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to API"
**Solution:**
```bash
# Check backend URL in frontend env
# Verify backend is running
curl https://backend-url/api/health
```

### Issue: "Database connection failed"
**Solution:**
```bash
# Check MONGODB_URI is correct
# Verify IP whitelist in MongoDB Atlas
# Check database user credentials
```

### Issue: "Login fails"
**Solution:**
```bash
# Seed sample data
cd backend && npm run seed
# Verify JWT_SECRET is set
# Check browser console for errors (F12)
```

---

## 📊 Monitoring & Logs

### Vercel Logs
```
Dashboard → Projects → school-management-system → Deployments
```

### Railway Logs
```bash
railway logs  # In backend directory
# Or: Dashboard → Projects → school-management-backend → Logs
```

### MongoDB Logs
```
MongoDB Atlas Dashboard → Databases → Activity
```

---

## 🔐 Security Notes

⚠️ **Before Production:**
- [ ] Change JWT_SECRET to strong random key
- [ ] Enable HTTPS (automatic on Vercel/Railway)
- [ ] Configure CORS properly
- [ ] Enable database authentication
- [ ] Set up rate limiting
- [ ] Enable request validation
- [ ] Use environment variables for secrets

---

## 💾 Backup & Recovery

### Database Backup
```bash
# Backup
mongodump --uri "mongodb+srv://..." --out backup/

# Restore
mongorestore --uri "mongodb+srv://..." backup/
```

### Code Backup
```bash
# GitHub is your backup
# Always push to main
git push origin main
```

---

## 📈 Performance Optimization

### Frontend
```bash
# Build analysis
npm run build -- --stats

# Optimize bundle
# Remove unused imports
# Use code splitting
```

### Backend
```bash
# Enable caching
# Add database indexes
# Use pagination
# Implement rate limiting
```

---

## 📞 Support & Resources

| Resource | Link |
|----------|------|
| React Docs | https://react.dev |
| Express Docs | https://expressjs.com |
| MongoDB Docs | https://docs.mongodb.com |
| Vite Docs | https://vitejs.dev |
| Tailwind Docs | https://tailwindcss.com |

---

## ✅ Final Checklist

Before going live, ensure:
- [ ] All env variables are set
- [ ] Database is seeded with initial data
- [ ] Frontend builds without errors
- [ ] Backend runs without errors
- [ ] Login works correctly
- [ ] All API endpoints respond
- [ ] No console errors (F12)
- [ ] Mobile responsive
- [ ] 404 page works
- [ ] Error handling works

---

## 🎯 Next Steps

1. **Read QUICK_DEPLOY.md** - 5 simple steps
2. **Follow LIVE_DEPLOYMENT.md** - Detailed guide
3. **Use DEPLOYMENT_CHECKLIST.js** - Track progress
4. **Deploy to Vercel & Railway** - Go live!
5. **Share your live URL** - Tell the world!

---

## 🎉 You're All Set!

All the code, documentation, and configuration is ready.

**Next:** Open `QUICK_DEPLOY.md` and follow the 5 steps!

**Result:** Your site will be live on the internet!

---

**Good luck! 🚀**
