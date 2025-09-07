# CloudCommerce Free Deployment Script
# Usage: .\deploy-free.ps1

param(
    [Parameter(Position=0)]
    [ValidateSet("setup", "frontend", "backend", "all", "help")]
    [string]$Command = "help"
)

function Write-Log {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Warn {
    param([string]$Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Show-Setup {
    Write-Host "🆓 CloudCommerce Free Deployment Setup" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. 📊 MongoDB Atlas (Database):" -ForegroundColor Yellow
    Write-Host "   - Go to: https://www.mongodb.com/cloud/atlas"
    Write-Host "   - Create free M0 cluster"
    Write-Host "   - Create database user and get connection string"
    Write-Host ""
    Write-Host "2. 🚂 Railway (Backend):" -ForegroundColor Yellow
    Write-Host "   - Go to: https://railway.app"
    Write-Host "   - Connect GitHub account"
    Write-Host "   - Deploy from this repository"
    Write-Host "   - Add environment variables"
    Write-Host ""
    Write-Host "3. ⚡ Vercel (Frontend):" -ForegroundColor Yellow
    Write-Host "   - Go to: https://vercel.com"
    Write-Host "   - Connect GitHub account"
    Write-Host "   - Deploy frontend folder"
    Write-Host ""
    Write-Host "4. 🔧 Environment Variables:" -ForegroundColor Yellow
    Write-Host "   Railway Backend:"
    Write-Host "   - MONGO_URI=mongodb+srv://..."
    Write-Host "   - JWT_SECRET=your-secret-key"
    Write-Host "   - NODE_ENV=production"
    Write-Host "   - CORS_ORIGIN=https://your-app.vercel.app"
    Write-Host ""
    Write-Host "   Vercel Frontend:"
    Write-Host "   - REACT_APP_API_URL=https://your-app.up.railway.app"
    Write-Host ""
}

function Deploy-Frontend {
    Write-Log "Deploying frontend to Vercel..."
    
    # Check if Vercel CLI is installed
    if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
        Write-Log "Installing Vercel CLI..."
        npm install -g vercel
    }
    
    # Navigate to frontend directory
    Set-Location frontend
    
    # Deploy to Vercel
    Write-Log "Starting Vercel deployment..."
    vercel --prod
    
    Set-Location ..
    Write-Log "Frontend deployment completed!"
}

function Deploy-Backend {
    Write-Log "Backend deployment instructions:"
    Write-Host ""
    Write-Host "🚂 Railway Deployment Steps:" -ForegroundColor Yellow
    Write-Host "1. Go to https://railway.app"
    Write-Host "2. Login with GitHub"
    Write-Host "3. Click 'New Project' → 'Deploy from GitHub repo'"
    Write-Host "4. Select your CloudCommerce repository"
    Write-Host "5. Railway will auto-detect Node.js and deploy"
    Write-Host "6. Add environment variables in Railway dashboard"
    Write-Host ""
    Write-Host "📊 Required Environment Variables:" -ForegroundColor Cyan
    Write-Host "MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cloudcommerce"
    Write-Host "JWT_SECRET=your-super-secret-jwt-key"
    Write-Host "NODE_ENV=production"
    Write-Host "CORS_ORIGIN=https://your-frontend.vercel.app"
    Write-Host ""
}

function Deploy-All {
    Write-Log "Starting complete deployment process..."
    
    Write-Host ""
    Write-Host "🔄 Deployment Order:" -ForegroundColor Cyan
    Write-Host "1. Setup MongoDB Atlas (manual)"
    Write-Host "2. Deploy Backend to Railway (manual)"
    Write-Host "3. Deploy Frontend to Vercel (automated)"
    Write-Host ""
    
    # Show setup instructions first
    Show-Setup
    
    Write-Host ""
    $continue = Read-Host "Have you completed MongoDB Atlas and Railway setup? (y/n)"
    
    if ($continue -eq "y" -or $continue -eq "Y") {
        Deploy-Frontend
        
        Write-Host ""
        Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
        Write-Host "Your app should be live at:" -ForegroundColor Cyan
        Write-Host "- Frontend: https://your-app.vercel.app"
        Write-Host "- Backend: https://your-app.up.railway.app"
        Write-Host ""
        Write-Host "💡 Next steps:" -ForegroundColor Yellow
        Write-Host "1. Update REACT_APP_API_URL in Vercel environment variables"
        Write-Host "2. Update CORS_ORIGIN in Railway environment variables"
        Write-Host "3. Test your application"
    } else {
        Write-Warn "Please complete the setup steps first, then run: .\deploy-free.ps1 frontend"
    }
}

function Show-Help {
    Write-Host "CloudCommerce Free Deployment Script" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\deploy-free.ps1 [COMMAND]" -ForegroundColor White
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Yellow
    Write-Host "  setup      Show setup instructions for all services"
    Write-Host "  frontend   Deploy frontend to Vercel"
    Write-Host "  backend    Show backend deployment instructions"
    Write-Host "  all        Complete deployment process"
    Write-Host "  help       Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\deploy-free.ps1 setup"
    Write-Host "  .\deploy-free.ps1 all"
    Write-Host "  .\deploy-free.ps1 frontend"
}

# Main execution
switch ($Command) {
    "setup" {
        Show-Setup
    }
    "frontend" {
        Deploy-Frontend
    }
    "backend" {
        Deploy-Backend
    }
    "all" {
        Deploy-All
    }
    default {
        Show-Help
    }
}
