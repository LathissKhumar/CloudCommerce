#!/bin/bash

# CloudCommerce Deployment Script
# Usage: ./deploy.sh [local|docker|k8s|clean]

set -e

PROJECT_NAME="cloudcommerce"
REGISTRY="your-registry.com"  # Change this to your Docker registry
NAMESPACE="default"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

check_prerequisites() {
    log "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
    fi
    
    if ! command -v kubectl &> /dev/null; then
        error "kubectl is not installed"
    fi
    
    log "Prerequisites check passed"
}

build_images() {
    log "Building Docker images..."
    
    # Build backend
    docker build -t ${REGISTRY}/${PROJECT_NAME}-backend:latest ./backend
    log "Backend image built"
    
    # Build frontend
    docker build -t ${REGISTRY}/${PROJECT_NAME}-frontend:latest ./frontend
    log "Frontend image built"
}

push_images() {
    log "Pushing images to registry..."
    
    docker push ${REGISTRY}/${PROJECT_NAME}-backend:latest
    docker push ${REGISTRY}/${PROJECT_NAME}-frontend:latest
    
    log "Images pushed successfully"
}

update_k8s_manifests() {
    log "Updating Kubernetes manifests with registry URLs..."
    
    # Update image references in K8s manifests
    find k8s/ -name "*.yaml" -exec sed -i "s|your-dockerhub-user/cloudcommerce-backend:latest|${REGISTRY}/${PROJECT_NAME}-backend:latest|g" {} \;
    find k8s/ -name "*.yaml" -exec sed -i "s|your-dockerhub-user/cloudcommerce-frontend:latest|${REGISTRY}/${PROJECT_NAME}-frontend:latest|g" {} \;
    
    log "K8s manifests updated"
}

deploy_k8s() {
    log "Deploying to Kubernetes..."
    
    # Create namespace if it doesn't exist
    kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
    
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
    
    log "Kubernetes deployment completed"
}

verify_deployment() {
    log "Verifying deployment..."
    
    # Wait for pods to be ready
    kubectl wait --for=condition=ready pod -l app=${PROJECT_NAME}-backend --timeout=300s
    kubectl wait --for=condition=ready pod -l app=${PROJECT_NAME}-frontend --timeout=300s
    kubectl wait --for=condition=ready pod -l app=${PROJECT_NAME}-mongo --timeout=300s
    
    # Check pod status
    kubectl get pods -l app=${PROJECT_NAME}-backend
    kubectl get pods -l app=${PROJECT_NAME}-frontend
    kubectl get pods -l app=${PROJECT_NAME}-mongo
    
    # Check services
    kubectl get services
    
    log "Deployment verification completed"
}

deploy_local() {
    log "Starting local development..."
    
    # Backend
    cd backend
    npm install
    npm run seed:admin
    npm run dev &
    BACKEND_PID=$!
    cd ..
    
    # Frontend
    cd frontend
    npm install
    npm start &
    FRONTEND_PID=$!
    cd ..
    
    log "Local development started"
    log "Backend: http://localhost:5000"
    log "Frontend: http://localhost:3000"
    log "Press Ctrl+C to stop"
    
    # Wait for interrupt
    trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
    wait
}

deploy_docker() {
    log "Deploying with Docker Compose..."
    
    # Check if docker compose (new syntax) or docker-compose (legacy) is available
    if command -v docker &> /dev/null && docker compose version &> /dev/null; then
        COMPOSE_CMD="docker compose"
        log "Using Docker Compose plugin (docker compose)"
    elif command -v docker-compose &> /dev/null; then
        COMPOSE_CMD="docker-compose"
        log "Using Docker Compose standalone (docker-compose)"
    else
        error "Docker Compose is not installed or available"
    fi
    
    # Stop any existing containers
    $COMPOSE_CMD down -v 2>/dev/null || warn "No existing containers to stop"
    
    # Build and start containers
    $COMPOSE_CMD up --build -d
    
    if [ $? -eq 0 ]; then
        log "Docker deployment completed successfully"
        log "Frontend: http://localhost:3000"
        log "Backend: http://localhost:5000"
        log "MongoDB: localhost:27017"
        
        # Wait a moment for containers to start
        sleep 5
        
        # Check container status
        log "Container status:"
        $COMPOSE_CMD ps
    else
        error "Docker deployment failed"
    fi
}

cleanup() {
    log "Cleaning up resources..."
    
    # Stop Docker Compose (try both syntaxes)
    if command -v docker &> /dev/null && docker compose version &> /dev/null; then
        docker compose down -v 2>/dev/null || true
    elif command -v docker-compose &> /dev/null; then
        docker-compose down -v 2>/dev/null || true
    fi
    
    # Delete Kubernetes resources
    kubectl delete -f k8s/ --ignore-not-found=true
    
    # Remove Docker images
    docker rmi ${REGISTRY}/${PROJECT_NAME}-backend:latest 2>/dev/null || true
    docker rmi ${REGISTRY}/${PROJECT_NAME}-frontend:latest 2>/dev/null || true
    
    log "Cleanup completed"
}

show_help() {
    echo "CloudCommerce Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  local     Start local development environment"
    echo "  docker    Deploy using Docker Compose"
    echo "  k8s       Deploy to Kubernetes"
    echo "  clean     Clean up all resources"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 local"
    echo "  $0 docker"
    echo "  $0 k8s"
    echo "  $0 clean"
}

main() {
    case "${1:-help}" in
        "local")
            deploy_local
            ;;
        "docker")
            deploy_docker
            ;;
        "k8s")
            check_prerequisites
            build_images
            push_images
            update_k8s_manifests
            deploy_k8s
            verify_deployment
            ;;
        "clean")
            cleanup
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

main "$@"

