# CloudCommerce Deployment Guide

## Overview
CloudCommerce supports multiple deployment methods:
- **Local Development**: Direct npm/node execution
- **Docker Compose**: Containerized local deployment
- **Kubernetes**: Production-ready orchestrated deployment
- **Enhanced Scripts**: Automated deployment with rollback support

## Prerequisites

### All Deployments
- Node.js 18+ and npm
- Git

### Docker Deployments
- Docker Desktop
- Docker Compose

### Kubernetes Deployments
- kubectl configured for your cluster
- Docker registry access
- Kubernetes cluster (AWS EKS, GCP GKE, Azure AKS, or local)

## Quick Start

### 1. Local Development
```bash
# Clone and setup
git clone <repository-url>
cd CloudCommerce

# Copy environment config
cp environments/.env.development .env

# Backend setup
cd backend
npm install
npm run seed:admin  # Creates admin@cloudcommerce.local / admin123
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health: http://localhost:5000/api/health

### 2. Docker Deployment
```bash
# Simple deployment
docker-compose up --build -d

# With specific environment
docker-compose --env-file environments/.env.staging up --build -d
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

### 3. Basic Kubernetes Deployment
```bash
# Update registry in scripts
./deploy.ps1 k8s        # Windows
./deploy.sh k8s         # Linux/Mac
```

### 4. Enhanced Deployment (Recommended)
```bash
# Production deployment with health checks
./deploy-enhanced.ps1 k8s production

# Check status
./deploy-enhanced.ps1 status

# View logs
./deploy-enhanced.ps1 logs backend

# Rollback if needed
./deploy-enhanced.ps1 rollback
```
```

## Environment Configuration

### Development
- Local database
- Debug logging enabled
- Hot reloading
- Mock data seeding

### Staging
- Shared database
- Production-like environment
- Performance testing
- User acceptance testing

### Production
- High availability setup
- Auto-scaling enabled
- Monitoring and alerting
- Backup strategies

## Detailed Deployment Methods

### Method 1: Manual Local Setup

1. **Environment Setup:**
```bash
# Copy environment file
cp environments/.env.development .env

# Install dependencies
cd backend && npm install
cd ../frontend && npm install
```

2. **Database Setup:**
```bash
# Start MongoDB (if not using Docker)
mongod --dbpath ./data

# Seed initial data
cd backend
npm run seed:admin
npm run seed:products
```

3. **Start Services:**
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm start
```

### Method 2: Docker Compose

1. **Configuration:**
```bash
# Copy appropriate environment
cp environments/.env.production .env

# Update docker-compose.yml if needed
```

2. **Deployment:**
```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down -v
```

### Method 3: Kubernetes Production

1. **Registry Setup:**
```bash
# Login to your Docker registry
docker login your-registry.com

# Update environment config
cp environments/.env.production .env
# Edit DOCKER_REGISTRY variable
```

2. **Deploy with Enhanced Script:**
```bash
# Windows
.\deploy-enhanced.ps1 k8s production

# Linux/Mac
./deploy-enhanced.sh k8s production
```

3. **Verification:**
```bash
# Check deployment status
kubectl get deployments
kubectl get pods
kubectl get services

# Test application
kubectl port-forward service/cloudcommerce-frontend 3000:80
# Visit http://localhost:3000
```

## Security and Production Checklist

### Before Production Deployment:
- [ ] Change default admin password
- [ ] Generate secure JWT secret (256-bit minimum)
- [ ] Configure proper CORS origins
- [ ] Enable HTTPS/TLS
- [ ] Set up rate limiting
- [ ] Configure network policies
- [ ] Enable audit logging
- [ ] Set up monitoring and alerts
- [ ] Configure backup strategies
- [ ] Review resource limits

## Troubleshooting

### Common Issues:
1. **Database Connection**: Check MongoDB service status
2. **Image Pull Errors**: Verify registry access and image tags
3. **Frontend-Backend Connection**: Check service names and ports
4. **Health Check Failures**: Verify endpoints and network policies

### Support Commands:
```bash
# Enhanced deployment status
./deploy-enhanced.ps1 status

# View specific component logs
./deploy-enhanced.ps1 logs backend

# Emergency rollback
./deploy-enhanced.ps1 rollback
```

#### Backup:
```bash
# MongoDB backup
kubectl exec -it deployment/cloudcommerce-mongo -- mongodump --out /backup

# Persistent volume backup (if using)
kubectl create job backup-job --from=cronjob/backup-cronjob
```

## Troubleshooting

### Common Issues:

1. **Pods not starting:**
   ```bash
   kubectl describe pod <pod-name>
   kubectl logs <pod-name>
   ```

2. **Database connection issues:**
   ```bash
   kubectl exec -it deployment/cloudcommerce-mongo -- mongo
   ```

3. **Service not accessible:**
   ```bash
   kubectl get services
   kubectl port-forward service/cloudcommerce-frontend 3000:80
   ```

4. **Image pull errors:**
   ```bash
   kubectl describe pod <pod-name>
   # Check image name and registry access
   ```
