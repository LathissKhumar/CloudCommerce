# CloudCommerce Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Local Development
```bash
# Windows PowerShell
.\deploy.ps1 local

# Linux/Mac
./deploy.sh local
```

### Option 2: Docker
```bash
# Windows PowerShell
.\deploy.ps1 docker

# Linux/Mac
./deploy.sh docker
```

### Option 3: Kubernetes
```bash
# Windows PowerShell
.\deploy.ps1 k8s

# Linux/Mac
./deploy.sh k8s
```

## 🔑 Default Admin Access
- **Email:** admin@cloudcommerce.local
- **Password:** admin123

## 📋 What's Included

### ✅ Core Features
- [x] User registration and authentication
- [x] Product management (CRUD)
- [x] Order management
- [x] Admin dashboard
- [x] JWT-based security
- [x] Role-based access control

### ✅ Production Ready
- [x] Docker containerization
- [x] Kubernetes manifests
- [x] Health checks and monitoring
- [x] Auto-scaling (HPA)
- [x] Network policies
- [x] Persistent storage
- [x] Automated backups
- [x] CI/CD pipeline

### ✅ Security
- [x] Helmet security headers
- [x] CORS configuration
- [x] Environment-based secrets
- [x] Network isolation
- [x] Input validation

## 🛠 Manual Commands

### Local Development
```bash
# Backend
cd backend
npm install
npm run seed:admin
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

### Docker
```bash
docker-compose up --build
```

### Kubernetes
```bash
# Update registry URLs in k8s/*.yaml files first
kubectl apply -f k8s/
```

## 🌐 Access Points

| Service | Local | Docker | Kubernetes |
|---------|-------|--------|------------|
| Frontend | http://localhost:3000 | http://localhost:3000 | http://your-cluster-ip |
| Backend | http://localhost:5000 | http://localhost:5000 | http://your-cluster-ip/api |
| Health | http://localhost:5000/health | http://localhost:5000/health | http://your-cluster-ip/api/health |

## 🔧 Configuration

### Environment Variables
```bash
# Backend
MONGO_URI=mongodb://localhost:27017/cloudcommerce
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development

# Admin User
ADMIN_EMAIL=admin@cloudcommerce.local
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Docker Registry
Update `REGISTRY` variable in deployment scripts:
```bash
# deploy.sh / deploy.ps1
REGISTRY="your-registry.com"
```

## 📊 Monitoring

### Health Checks
- Basic: `GET /healthz`
- Detailed: `GET /health` (includes database status)

### Kubernetes Monitoring
```bash
# Check pod status
kubectl get pods

# View logs
kubectl logs -f deployment/cloudcommerce-backend

# Monitor resources
kubectl top pods
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill processes on ports 3000/5000
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. **Docker build fails**
   ```bash
   # Clean Docker cache
   docker system prune -a
   ```

3. **Kubernetes pods not starting**
   ```bash
   # Check pod details
   kubectl describe pod <pod-name>
   kubectl logs <pod-name>
   ```

4. **Database connection issues**
   ```bash
   # Check MongoDB status
   kubectl exec -it deployment/cloudcommerce-mongo -- mongo
   ```

## 📚 Next Steps

1. **Customize branding** - Update colors/fonts in `frontend/src/index.css`
2. **Add features** - Extend models in `backend/models/`
3. **Deploy to cloud** - Follow `DEPLOYMENT.md` for AWS/GCP/Azure
4. **Set up monitoring** - Configure Prometheus/Grafana
5. **Add tests** - Implement unit/integration tests

## 🆘 Support

- Check `DEPLOYMENT.md` for detailed deployment instructions
- Review `README.md` for project overview
- Examine `k8s/` directory for Kubernetes configurations
- Look at `.github/workflows/ci.yml` for CI/CD setup

---

**Ready to deploy?** Run `.\deploy.ps1 help` (Windows) or `./deploy.sh help` (Linux/Mac) for all available commands!

