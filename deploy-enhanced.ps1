# CloudCommerce Enhanced Deployment Script with Rollback
# Usage: .\deploy-enhanced.ps1 [local|docker|k8s|rollback|status|logs] [environment]

param(
    [Parameter(Position=0)]
    [ValidateSet("local", "docker", "k8s", "rollback", "status", "logs", "clean", "help")]
    [string]$Command = "help",
    
    [Parameter(Position=1)]
    [ValidateSet("development", "staging", "production")]
    [string]$Environment = "development"
)

$PROJECT_NAME = "cloudcommerce"
$NAMESPACE = "default"
$DEPLOYMENT_DATE = Get-Date -Format "yyyyMMdd-HHmmss"

# Load environment configuration
function Load-Environment {
    param([string]$Env)
    
    $envFile = "environments\.env.$Env"
    if (Test-Path $envFile) {
        Write-Log "Loading environment: $Env"
        Get-Content $envFile | Where-Object { $_ -match "^[^#]" } | ForEach-Object {
            $key, $value = $_ -split '=', 2
            if ($key -and $value) {
                [Environment]::SetEnvironmentVariable($key, $value, "Process")
            }
        }
    }
}

function Write-Log {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] [INFO] $Message" -ForegroundColor Green
}

function Write-Warn {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] [WARN] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] [ERROR] $Message" -ForegroundColor Red
}

function Test-HealthEndpoint {
    param([string]$Url, [int]$MaxRetries = 10)
    
    Write-Log "Testing health endpoint: $Url"
    
    for ($i = 1; $i -le $MaxRetries; $i++) {
        try {
            $response = Invoke-RestMethod -Uri $Url -TimeoutSec 5
            if ($response.status -eq "healthy" -or $response.status -eq "ok") {
                Write-Log "Health check passed on attempt $i"
                return $true
            }
        }
        catch {
            Write-Warn "Health check attempt $i failed: $($_.Exception.Message)"
        }
        
        if ($i -lt $MaxRetries) {
            Start-Sleep -Seconds 5
        }
    }
    
    Write-Error "Health check failed after $MaxRetries attempts"
    return $false
}

function Deploy-K8s-Enhanced {
    Load-Environment $Environment
    
    $REGISTRY = $env:DOCKER_REGISTRY
    if (-not $REGISTRY) {
        $REGISTRY = "your-registry.com"
        Write-Warn "DOCKER_REGISTRY not set, using default: $REGISTRY"
    }
    
    Write-Log "Starting Kubernetes deployment for $Environment environment"
    
    # Create deployment backup
    Write-Log "Creating deployment backup..."
    kubectl get deployment cloudcommerce-backend -o yaml > "backups\backend-deployment-$DEPLOYMENT_DATE.yaml" 2>$null
    kubectl get deployment cloudcommerce-frontend -o yaml > "backups\frontend-deployment-$DEPLOYMENT_DATE.yaml" 2>$null
    
    # Build and push images with versioned tags
    $imageTag = "$DEPLOYMENT_DATE"
    Write-Log "Building images with tag: $imageTag"
    
    docker build -t "${REGISTRY}/${PROJECT_NAME}-backend:$imageTag" ./backend
    docker build -t "${REGISTRY}/${PROJECT_NAME}-frontend:$imageTag" ./frontend
    
    # Tag as latest
    docker tag "${REGISTRY}/${PROJECT_NAME}-backend:$imageTag" "${REGISTRY}/${PROJECT_NAME}-backend:latest"
    docker tag "${REGISTRY}/${PROJECT_NAME}-frontend:$imageTag" "${REGISTRY}/${PROJECT_NAME}-frontend:latest"
    
    # Push images
    Write-Log "Pushing images to registry..."
    docker push "${REGISTRY}/${PROJECT_NAME}-backend:$imageTag"
    docker push "${REGISTRY}/${PROJECT_NAME}-backend:latest"
    docker push "${REGISTRY}/${PROJECT_NAME}-frontend:$imageTag"
    docker push "${REGISTRY}/${PROJECT_NAME}-frontend:latest"
    
    # Update manifests with new image tags
    Write-Log "Updating Kubernetes manifests..."
    $backendManifest = Get-Content "k8s\backend-deployment.yaml"
    $frontendManifest = Get-Content "k8s\frontend-deployment.yaml"
    
    $backendManifest = $backendManifest -replace "your-dockerhub-user/cloudcommerce-backend:latest", "${REGISTRY}/${PROJECT_NAME}-backend:$imageTag"
    $frontendManifest = $frontendManifest -replace "your-dockerhub-user/cloudcommerce-frontend:latest", "${REGISTRY}/${PROJECT_NAME}-frontend:$imageTag"
    
    $backendManifest | Set-Content "k8s\backend-deployment-temp.yaml"
    $frontendManifest | Set-Content "k8s\frontend-deployment-temp.yaml"
    
    # Apply configurations
    Write-Log "Applying Kubernetes configurations..."
    kubectl apply -f k8s\secrets.yaml
    kubectl apply -f k8s\configmap.yaml
    kubectl apply -f k8s\persistent-volume.yaml
    kubectl apply -f k8s\mongo-deployment.yaml
    
    # Deploy backend with rolling update
    Write-Log "Deploying backend..."
    kubectl apply -f k8s\backend-deployment-temp.yaml
    kubectl rollout status deployment/cloudcommerce-backend --timeout=300s
    
    # Test backend health before proceeding
    $backendUrl = "http://$(kubectl get service cloudcommerce-backend -o jsonpath='{.spec.clusterIP}'):5000/api/health"
    if (-not (Test-HealthEndpoint $backendUrl)) {
        Write-Error "Backend health check failed, rolling back..."
        kubectl rollout undo deployment/cloudcommerce-backend
        return $false
    }
    
    # Deploy frontend
    Write-Log "Deploying frontend..."
    kubectl apply -f k8s\frontend-deployment-temp.yaml
    kubectl rollout status deployment/cloudcommerce-frontend --timeout=300s
    
    # Apply remaining resources
    kubectl apply -f k8s\ingress.yaml
    kubectl apply -f k8s\hpa.yaml
    kubectl apply -f k8s\monitoring.yaml
    
    # Cleanup temp files
    Remove-Item "k8s\backend-deployment-temp.yaml" -Force
    Remove-Item "k8s\frontend-deployment-temp.yaml" -Force
    
    Write-Log "Kubernetes deployment completed successfully"
    return $true
}

function Rollback-Deployment {
    Write-Log "Rolling back deployment..."
    
    # Rollback backend
    kubectl rollout undo deployment/cloudcommerce-backend
    kubectl rollout status deployment/cloudcommerce-backend --timeout=180s
    
    # Rollback frontend
    kubectl rollout undo deployment/cloudcommerce-frontend
    kubectl rollout status deployment/cloudcommerce-frontend --timeout=180s
    
    Write-Log "Rollback completed"
}

function Show-Status {
    Write-Host "=== CloudCommerce Deployment Status ===" -ForegroundColor Cyan
    Write-Host ""
    
    # Kubernetes status
    Write-Host "Kubernetes Deployments:" -ForegroundColor Yellow
    kubectl get deployments -l app.kubernetes.io/name=cloudcommerce 2>$null
    
    Write-Host "`nPods:" -ForegroundColor Yellow
    kubectl get pods -l app.kubernetes.io/name=cloudcommerce 2>$null
    
    Write-Host "`nServices:" -ForegroundColor Yellow
    kubectl get services -l app.kubernetes.io/name=cloudcommerce 2>$null
    
    # Docker status
    Write-Host "`nDocker Containers:" -ForegroundColor Yellow
    docker ps --filter "name=cloudcommerce" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>$null
}

function Show-Logs {
    param([string]$Component = "all")
    
    switch ($Component) {
        "backend" {
            Write-Log "Showing backend logs..."
            kubectl logs -l app=cloudcommerce-backend --tail=50
        }
        "frontend" {
            Write-Log "Showing frontend logs..."
            kubectl logs -l app=cloudcommerce-frontend --tail=50
        }
        "mongo" {
            Write-Log "Showing MongoDB logs..."
            kubectl logs -l app=cloudcommerce-mongo --tail=50
        }
        default {
            Write-Log "Showing all logs..."
            kubectl logs -l app.kubernetes.io/name=cloudcommerce --tail=20
        }
    }
}

function Show-Help {
    Write-Host "CloudCommerce Enhanced Deployment Script" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\deploy-enhanced.ps1 [COMMAND] [ENVIRONMENT]" -ForegroundColor White
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Yellow
    Write-Host "  local       Start local development environment"
    Write-Host "  docker      Deploy using Docker Compose"
    Write-Host "  k8s         Deploy to Kubernetes"
    Write-Host "  rollback    Rollback last deployment"
    Write-Host "  status      Show deployment status"
    Write-Host "  logs        Show application logs"
    Write-Host "  clean       Clean up all resources"
    Write-Host "  help        Show this help message"
    Write-Host ""
    Write-Host "Environments:" -ForegroundColor Yellow
    Write-Host "  development (default)"
    Write-Host "  staging"
    Write-Host "  production"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\deploy-enhanced.ps1 k8s production"
    Write-Host "  .\deploy-enhanced.ps1 rollback"
    Write-Host "  .\deploy-enhanced.ps1 status"
    Write-Host "  .\deploy-enhanced.ps1 logs backend"
}

# Create backup directory
if (-not (Test-Path "backups")) {
    New-Item -ItemType Directory -Path "backups" | Out-Null
}

# Main execution
switch ($Command) {
    "local" {
        Load-Environment $Environment
        # Implement local deployment...
        Write-Log "Local deployment not implemented in this enhanced version"
    }
    "docker" {
        Load-Environment $Environment
        docker-compose --env-file "environments\.env.$Environment" up --build -d
        Write-Log "Docker deployment completed"
    }
    "k8s" {
        Deploy-K8s-Enhanced
    }
    "rollback" {
        Rollback-Deployment
    }
    "status" {
        Show-Status
    }
    "logs" {
        Show-Logs
    }
    "clean" {
        docker-compose down -v
        kubectl delete -f k8s/ --ignore-not-found=true
        Write-Log "Cleanup completed"
    }
    default {
        Show-Help
    }
}
