@echo off
REM Deployment script for Windows

echo 🚀 Starting deployment process...

REM Frontend Build
echo 📦 Building frontend...
call npm run build

if errorlevel 1 (
  echo ❌ Frontend build failed
  exit /b 1
)

REM Backend Check
echo ✅ Checking backend...
cd backend
if not exist "package.json" (
  echo ❌ Backend package.json not found
  exit /b 1
)

cd ..

echo ✅ All checks passed!
echo 🎉 Ready for deployment
echo.
echo Next steps:
echo 1. Push to GitHub: git push origin main
echo 2. Deploy Frontend: Go to https://vercel.com/import
echo 3. Deploy Backend: Go to https://railway.app
echo 4. Add environment variables
echo.
echo Final URLs will be provided after deployment
pause
