# School Management System Backend - Setup Guide

## Quick Start (5 minutes)

### Prerequisites
- Node.js v16+ 
- MongoDB 4.4+
- npm or yarn package manager

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file and update values:
```
MONGODB_URI=mongodb://localhost:27017/school-management
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

### Step 3: Start MongoDB
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 4: Seed Database (Optional)
To populate with sample data:
```bash
# Option A: From backend directory
npm run seed

# Option B: Using Node directly
node src/utils/seedData.js
```

### Step 5: Start Server
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

---

## Detailed Setup

### 1. Environment Setup

#### Windows
1. Download Node.js from nodejs.org
2. Download MongoDB Community from mongodb.com
3. Install both with default settings
4. Add MongoDB to PATH (usually done automatically)

#### macOS
```bash
# Install Node.js
brew install node

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### Linux (Ubuntu)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
```

### 2. Project Setup

```bash
# Navigate to backend directory
cd backend

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your editor

# Install dependencies
npm install
```

### 3. Database Setup

#### Connect to MongoDB Shell
```bash
# Using mongosh (latest)
mongosh

# Using mongo (older versions)
mongo
```

#### Create Database and User (Optional)
```mongodb
// Switch to admin database
use admin

// Create user (optional - for authentication)
db.createUser({
  user: "schooladmin",
  pwd: "securepassword123",
  roles: [{ role: "readWrite", db: "school-management" }]
})

// Verify user
db.getUsers()
```

### 4. Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Run specific controller/test
npm test
```

### 5. Seed Sample Data

The system comes with sample seed data generator:

```bash
# Run seed script
node src/utils/seedData.js
```

**Sample credentials to test login:**
- Email: `admin@school.com`
- Password: `admin123`

---

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin, teacher, staff, parent, student),
  department: String,
  phone: String,
  avatar: String (URL),
  isActive: Boolean,
  lastLogin: Date
}
```

### Student
```javascript
{
  rollNumber: String (unique),
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  email: String,
  grade: String,
  section: String,
  parentName: String,
  parentPhone: String,
  address: String
}
```

### Employee
```javascript
{
  employeeId: String (unique),
  firstName: String,
  lastName: String,
  email: String,
  position: String,
  department: String,
  dateOfJoining: Date,
  salary: Number,
  bankAccountNumber: String,
  address: String
}
```

[See README.md for complete model documentation]

---

## Testing APIs

### Using cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@school.com","password":"admin123"}'

# Get all students (requires token)
curl -X GET http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "rollNumber":"STU999",
    "firstName":"John",
    "lastName":"Doe",
    "dateOfBirth":"2010-01-15",
    "grade":"10",
    "section":"A"
  }'
```

### Using Postman

1. Download and install Postman
2. Create new request collection
3. Set up variable for base URL: `http://localhost:5000`
4. Set up variable for token from login response
5. Import API routes and test

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create requests following the API documentation
3. Test endpoints with proper authentication

---

## Common Issues & Solutions

### Issue: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running: `mongod` (Windows) or `brew services start mongodb-community` (Mac)
- Check MONGODB_URI in .env
- Verify MongoDB is installed correctly

### Issue: Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
- Change PORT in .env to different number (e.g., 5001)
- Or kill process using port 5000

### Issue: JWT Token Invalid
```
Error: Invalid or expired token
```
**Solution:**
- Login again to get new token
- Check JWT_SECRET in .env hasn't changed
- Token expires after JWT_EXPIRE time (default 7d)

### Issue: CORS Errors
**Solution:**
- Ensure frontend URL is correct in CORS configuration
- Check browser console for detailed error
- Verify Authorization header is properly formatted

### Issue: Email Already Exists
**Solution:**
- Use different email or delete existing user from database
- Reset database: `db.users.deleteMany({})`

---

## Production Deployment

[See DEPLOYMENT.md for complete production setup]

### Key Steps:
1. Update production environment variables
2. Use strong JWT_SECRET
3. Enable HTTPS
4. Set NODE_ENV=production
5. Configure database backups
6. Set up error monitoring
7. Implement rate limiting
8. Enable logging

---

## Development Tools

### Recommended VS Code Extensions
- Thunder Client (API testing)
- MongoDB for VS Code
- Prettier (code formatting)
- ESLint (code linting)

### Commands Reference

```bash
# Development
npm run dev              # Start with auto-reload
npm start              # Start production

# Testing
npm test              # Run tests

# Database
npm run seed          # Populate sample data

# Database Shell
mongosh              # Connect to MongoDB
```

### Important Files
- `src/server.js` - Main server entry point
- `src/config/database.js` - Database connection
- `.env` - Environment variables
- `package.json` - Project dependencies

---

## Next Steps

1. ✅ Backend server is running
2. ⏭️ Setup frontend application
3. ⏭️ Configure API base URL in frontend
4. ⏭️ Connect frontend to backend
5. ⏭️ Test complete flow

---

## Support & Troubleshooting

- Check MongoDB logs: `mongod` terminal window
- Check server logs: `npm run dev` terminal window
- Enable debug mode: Add `DEBUG=*` before npm command
- Check .env file exists and is properly configured

For more help, see:
- `README.md` - Full API documentation
- `API_EXAMPLES.md` - API usage examples
- `DEPLOYMENT.md` - Production setup guide
