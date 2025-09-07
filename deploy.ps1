# CloudCommerce Deployment Script for Windows PowerShell
# Usage: .\deploy.ps1 [local|docker|k8s|clean]

param(
    [Parameter(Position=0)]
    [ValidateSet("local", "docker", "k8s", "clean", "help")]
    [string]$Command = "help"
)

$PROJECT_NAME = "cloudcommerce"
$REGISTRY = "local"  # Using local images for Docker Desktop Kubernetes
$NAMESPACE = "default"

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
    exit 1
}

function Test-Prerequisites {
    Write-Log "Checking prerequisites..."
    
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Error "Docker is not installed"
    }
    
    if (-not (Get-Command kubectl -ErrorAction SilentlyContinue)) {
        Write-Error "kubectl is not installed"
    }
    
    Write-Log "Prerequisites check passed"
}

function Build-Images {
    Write-Log "Building Docker images..."
    
    if ($REGISTRY -eq "local") {
        # Build images for local Kubernetes
        docker build -t "${PROJECT_NAME}-backend:latest" ./backend
        docker build -t "${PROJECT_NAME}-frontend:latest" ./frontend
        Write-Log "Local images built for Docker Desktop Kubernetes"
    } else {
        # Build images for external registry
        docker build -t "${REGISTRY}/${PROJECT_NAME}-backend:latest" ./backend
        docker build -t "${REGISTRY}/${PROJECT_NAME}-frontend:latest" ./frontend
        Write-Log "Images built for external registry"
    }
}

function Push-Images {
    if ($REGISTRY -eq "local") {
        Write-Log "Skipping image push for local deployment"
        return
    }
    
    Write-Log "Pushing images to registry..."
    docker push "${REGISTRY}/${PROJECT_NAME}-backend:latest"
    docker push "${REGISTRY}/${PROJECT_NAME}-frontend:latest"
    Write-Log "Images pushed successfully"
}

function Update-K8sManifests {
    Write-Log "Updating Kubernetes manifests with registry URLs..."
    
    # Update image references in K8s manifests
    Get-ChildItem -Path "k8s" -Filter "*.yaml" | ForEach-Object {
        (Get-Content $_.FullName) -replace "your-dockerhub-user/cloudcommerce-backend:latest", "${REGISTRY}/${PROJECT_NAME}-backend:latest" | Set-Content $_.FullName
        (Get-Content $_.FullName) -replace "your-dockerhub-user/cloudcommerce-frontend:latest", "${REGISTRY}/${PROJECT_NAME}-frontend:latest" | Set-Content $_.FullName
    }
    
    Write-Log "K8s manifests updated"
}

function Deploy-K8s {
    Write-Log "Deploying to Kubernetes..."
    
    # Create namespace if it doesn't exist
    kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -
    
    # Apply all manifests
    kubectl apply -f k8s/configmap.yaml
    kubectl apply -f k8s/persistent-volume.yaml
    kubectl apply -f k8s/backup-pvc.yaml
    kubectl apply -f k8s/mongo-deployment.yaml
    kubectl apply -f k8s/backend-deployment.yaml
    kubectl apply -f k8s/frontend-deployment.yaml
    kubectl apply -f k8s/ingress.yaml
    kubectl apply -f k8s/hpa.yaml
    kubectl apply -f k8s/network-policy.yaml
    kubectl apply -f k8s/monitoring.yaml
    
    Write-Log "Kubernetes deployment completed"
}

function Test-Deployment {
    Write-Log "Verifying deployment..."
    
    # Wait for pods to be ready
    kubectl wait --for=condition=ready pod -l app="${PROJECT_NAME}-backend" --timeout=300s
    kubectl wait --for=condition=ready pod -l app="${PROJECT_NAME}-frontend" --timeout=300s
    kubectl wait --for=condition=ready pod -l app="${PROJECT_NAME}-mongo" --timeout=300s
    
    # Check pod status
    kubectl get pods -l app="${PROJECT_NAME}-backend"
    kubectl get pods -l app="${PROJECT_NAME}-frontend"
    kubectl get pods -l app="${PROJECT_NAME}-mongo"
    
    # Check services
    kubectl get services
    
    Write-Log "Deployment verification completed"
}

function Deploy-Local {
    Write-Log "Starting local development..."
    
    # Backend
    Set-Location backend
    npm install
    npm run seed:admin
    Start-Process powershell -ArgumentList "-Command", "npm run dev" -WindowStyle Hidden
    Set-Location ..
    
    # Frontend
    Set-Location frontend
    npm install
    Start-Process powershell -ArgumentList "-Command", "npm start" -WindowStyle Hidden
    Set-Location ..
    
    Write-Log "Local development started"
    Write-Log "Backend: http://localhost:5000"
    Write-Log "Frontend: http://localhost:3000"
    Write-Log "Press Ctrl+C to stop"
    
    # Keep script running
    Read-Host "Press Enter to stop"
}

function Deploy-Docker {
    Write-Log "Deploying with Docker Compose..."
    
    # Check if docker compose (new syntax) or docker-compose (legacy) is available
    try {
        docker compose version *>$null
        $composeCmd = "docker compose"
        Write-Log "Using Docker Compose plugin (docker compose)"
    } catch {
        try {
            docker-compose version *>$null
            $composeCmd = "docker-compose"
            Write-Log "Using Docker Compose standalone (docker-compose)"
        } catch {
            Write-Error "Docker Compose is not installed or available"
        }
    }
    
    # Stop any existing containers
    try {
        if ($composeCmd -eq "docker compose") {
            docker compose down -v
        } else {
            docker-compose down -v
        }
    } catch {
        Write-Warn "No existing containers to stop"
    }
    
    # Build and start containers
    if ($composeCmd -eq "docker compose") {
        docker compose up --build -d
    } else {
        docker-compose up --build -d
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Log "Docker deployment completed successfully"
        Write-Log "Frontend: http://localhost:3000"
        Write-Log "Backend: http://localhost:5000"
        Write-Log "MongoDB: localhost:27017"
        
        # Wait a moment for containers to start
        Start-Sleep -Seconds 5
        
        # Check container status
        Write-Log "Container status:"
        if ($composeCmd -eq "docker compose") {
            docker compose ps
        } else {
            docker-compose ps
        }
    } else {
        Write-Error "Docker deployment failed"
    }
}

function Remove-Resources {
    Write-Log "Cleaning up resources..."
    
    # Stop Docker Compose (try both syntaxes)
    try {
        docker compose down -v 2>$null
    } catch {
        try {
            docker-compose down -v 2>$null
        } catch {
            Write-Warn "Could not stop Docker Compose containers"
        }
    }
    
    # Delete Kubernetes resources
    kubectl delete -f k8s/ --ignore-not-found=true
    
    # Remove Docker images
    docker rmi "${REGISTRY}/${PROJECT_NAME}-backend:latest" 2>$null
    docker rmi "${REGISTRY}/${PROJECT_NAME}-frontend:latest" 2>$null
    
    Write-Log "Cleanup completed"
}

function Show-Help {
    Write-Host "CloudCommerce Deployment Script for Windows" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\deploy.ps1 [COMMAND]" -ForegroundColor White
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Yellow
    Write-Host "  local     Start local development environment"
    Write-Host "  docker    Deploy using Docker Compose"
    Write-Host "  k8s       Deploy to Kubernetes"
    Write-Host "  clean     Clean up all resources"
    Write-Host "  help      Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\deploy.ps1 local"
    Write-Host "  .\deploy.ps1 docker"
    Write-Host "  .\deploy.ps1 k8s"
    Write-Host "  .\deploy.ps1 clean"
}

# Main execution
switch ($Command) {
    "local" {
        Deploy-Local
    }
    "docker" {
        Deploy-Docker
    }
    "k8s" {
        Test-Prerequisites
        Build-Images
        Push-Images
        Update-K8sManifests
        Deploy-K8s
        Test-Deployment
    }
    "clean" {
        Remove-Resources
    }
    default {
        Show-Help
    }
}

