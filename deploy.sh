#!/bin/bash
# Deployment script for School Management System

echo "🚀 Starting deployment process..."

# Frontend Build
echo "📦 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Frontend build failed"
  exit 1
fi

# Backend Check
echo "✅ Checking backend..."
cd backend
if [ ! -f "package.json" ]; then
  echo "❌ Backend package.json not found"
  exit 1
fi

echo "✅ All checks passed!"
echo "🎉 Ready for deployment"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Deploy Frontend: Go to https://vercel.com/import and select your repo"
echo "3. Deploy Backend: Go to https://railway.app, run 'railway up'"
echo "4. Add environment variables in hosting platforms"
echo ""
echo "Final URLs will be provided after deployment"
