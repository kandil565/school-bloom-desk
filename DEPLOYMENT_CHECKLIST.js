#!/usr/bin/env node

/**
 * 🚀 SCHOOL MANAGEMENT SYSTEM - DEPLOYMENT CHECKLIST
 * 
 * This checklist ensures all steps are completed before going live
 */

const checklist = {
  "PREPARATION": [
    {
      task: "Install Git",
      url: "https://git-scm.com/download/win",
      status: "pending"
    },
    {
      task: "Create GitHub Account",
      url: "https://github.com/signup",
      status: "pending"
    },
    {
      task: "Create Vercel Account",
      url: "https://vercel.com/signup",
      status: "pending"
    },
    {
      task: "Create Railway Account",
      url: "https://railway.app",
      status: "pending"
    },
    {
      task: "Create MongoDB Atlas Account",
      url: "https://www.mongodb.com/cloud/atlas",
      status: "pending"
    }
  ],

  "GITHUB_SETUP": [
    {
      task: "Initialize Git in project directory",
      command: "git init",
      status: "pending"
    },
    {
      task: "Configure Git user",
      command: "git config user.name && git config user.email",
      status: "pending"
    },
    {
      task: "Add all files to Git",
      command: "git add .",
      status: "pending"
    },
    {
      task: "Create initial commit",
      command: "git commit -m 'Initial commit'",
      status: "pending"
    },
    {
      task: "Create GitHub Repository",
      url: "https://github.com/new",
      status: "pending"
    },
    {
      task: "Push to GitHub",
      command: "git push -u origin main",
      status: "pending"
    }
  ],

  "FRONTEND_DEPLOYMENT": [
    {
      task: "Build frontend",
      command: "npm run build",
      status: "pending"
    },
    {
      task: "Import project in Vercel",
      url: "https://vercel.com/import",
      status: "pending"
    },
    {
      task: "Configure Vercel settings",
      details: "Framework: Vite, Build: npm run build, Output: dist",
      status: "pending"
    },
    {
      task: "Deploy on Vercel",
      details: "Click Deploy button and wait 2-3 minutes",
      status: "pending"
    },
    {
      task: "Get Frontend URL",
      details: "Will be provided by Vercel",
      status: "pending"
    }
  ],

  "BACKEND_DEPLOYMENT": [
    {
      task: "Install Railway CLI",
      command: "npm install -g @railway/cli",
      status: "pending"
    },
    {
      task: "Login to Railway",
      command: "railway login",
      status: "pending"
    },
    {
      task: "Navigate to backend directory",
      command: "cd backend",
      status: "pending"
    },
    {
      task: "Initialize Railway project",
      command: "railway init",
      status: "pending"
    },
    {
      task: "Deploy backend",
      command: "railway up",
      status: "pending"
    },
    {
      task: "Get Backend URL",
      details: "Will be provided by Railway",
      status: "pending"
    }
  ],

  "DATABASE_SETUP": [
    {
      task: "Create MongoDB Atlas Account",
      url: "https://www.mongodb.com/cloud/atlas",
      status: "pending"
    },
    {
      task: "Create MongoDB Cluster",
      details: "Choose Shared (Free) tier",
      status: "pending"
    },
    {
      task: "Create Database User",
      details: "Remember username and password",
      status: "pending"
    },
    {
      task: "Add IP to Whitelist",
      details: "Add Railway IP or 0.0.0.0 for development",
      status: "pending"
    },
    {
      task: "Get Connection String",
      details: "Format: mongodb+srv://user:pass@cluster.mongodb.net/dbname",
      status: "pending"
    },
    {
      task: "Add to Railway Variables",
      command: "MONGODB_URI=<your-mongodb-uri>",
      status: "pending"
    }
  ],

  "ENVIRONMENT_VARIABLES": [
    {
      task: "Set JWT_SECRET in Railway",
      command: "JWT_SECRET=<generate-strong-secret>",
      status: "pending"
    },
    {
      task: "Set NODE_ENV in Railway",
      command: "NODE_ENV=production",
      status: "pending"
    },
    {
      task: "Set PORT in Railway",
      command: "PORT=5000",
      status: "pending"
    },
    {
      task: "Create .env.production in frontend",
      details: "VITE_API_URL=<railway-backend-url>/api",
      status: "pending"
    }
  ],

  "TESTING": [
    {
      task: "Open frontend URL",
      details: "https://school-management-system.vercel.app",
      status: "pending"
    },
    {
      task: "Test login",
      credentials: "admin@school.com / admin123",
      status: "pending"
    },
    {
      task: "Test student list",
      details: "Navigate to Students and verify data loads",
      status: "pending"
    },
    {
      task: "Test employee list",
      details: "Navigate to HR and verify data loads",
      status: "pending"
    },
    {
      task: "Test API connectivity",
      url: "<backend-url>/api/health",
      status: "pending"
    },
    {
      task: "Test database connection",
      details: "Check if data loads correctly",
      status: "pending"
    }
  ],

  "FINAL_STEPS": [
    {
      task: "Enable auto-deployment in Vercel",
      details: "Settings → Git → Enable automatic deployments",
      status: "pending"
    },
    {
      task: "Set up MongoDB backups",
      details: "MongoDB Atlas provides automatic backups",
      status: "pending"
    },
    {
      task: "Document final URLs and credentials",
      details: "Save in secure location",
      status: "pending"
    },
    {
      task: "Share live URLs with team",
      details: "Frontend and Backend URLs",
      status: "pending"
    }
  ]
};

// Print formatted checklist
console.log("\n");
console.log("╔═══════════════════════════════════════════════════════════════╗");
console.log("║     🚀 SCHOOL MANAGEMENT SYSTEM - DEPLOYMENT CHECKLIST 🚀    ║");
console.log("╚═══════════════════════════════════════════════════════════════╝");
console.log("\n");

Object.keys(checklist).forEach((section, index) => {
  console.log(`\n${'═'.repeat(67)}`);
  console.log(`📋 SECTION ${index + 1}: ${section}`);
  console.log(`${'═'.repeat(67)}\n`);

  checklist[section].forEach((item, itemIndex) => {
    const checkbox = "☐";
    console.log(`${checkbox} ${itemIndex + 1}. ${item.task}`);
    
    if (item.url) {
      console.log(`   🔗 ${item.url}`);
    }
    if (item.command) {
      console.log(`   ⌨️  ${item.command}`);
    }
    if (item.details) {
      console.log(`   ℹ️  ${item.details}`);
    }
    if (item.credentials) {
      console.log(`   🔐 ${item.credentials}`);
    }
    console.log("");
  });
});

console.log("\n");
console.log("╔═══════════════════════════════════════════════════════════════╗");
console.log("║              🎉 FINAL LIVE URLS (After Deployment) 🎉         ║");
console.log("╚═══════════════════════════════════════════════════════════════╝");
console.log(`
📱 FRONTEND:
   https://school-management-system.vercel.app

⚙️  BACKEND API:
   https://school-management-backend.railway.app/api

💾 DATABASE:
   MongoDB Atlas (Cloud Database)

🔐 LOGIN CREDENTIALS:
   Email: admin@school.com
   Password: admin123
`);

console.log("╔═══════════════════════════════════════════════════════════════╗");
console.log("║                   ✨ IMPORTANT LINKS ✨                        ║");
console.log("╚═══════════════════════════════════════════════════════════════╝");
console.log(`
📚 DOCUMENTATION:
   • QUICK_DEPLOY.md - 5 step quick guide
   • LIVE_DEPLOYMENT.md - Detailed step-by-step guide
   • DEPLOYMENT_GUIDE_AR.md - Arabic guide
   • ARCHITECTURE.md - System architecture
   • README.md - API documentation

🔗 SERVICES:
   • GitHub: https://github.com
   • Vercel: https://vercel.com
   • Railway: https://railway.app
   • MongoDB Atlas: https://cloud.mongodb.com

💡 USEFUL COMMANDS:
   npm run dev          - Start local development
   npm run build        - Build for production
   npm run seed         - Seed sample data
   railway logs         - View backend logs
`);

console.log("\n");
console.log("✅ Go through each section and mark items as complete!");
console.log("✅ When all items are checked, your site will be LIVE!");
console.log("\n");
