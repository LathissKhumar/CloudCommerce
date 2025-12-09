# CloudCommerce

Production-ready e-commerce scaffold with Node/Express/Mongo backend and React frontend. Supports multiple deployment options including Vercel (frontend) + Railway (backend).

## 🚀 Quick Deployment

**Recommended: Vercel (Frontend) + Railway (Backend)**

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete step-by-step instructions to deploy:
- Frontend to Vercel (free)
- Backend to Railway (free)
- Database on MongoDB Atlas (free)

**Total cost: $0/month** ✅

## 📁 Project Structure

```
CloudCommerce/
├── frontend/          # React frontend (Deploy to Vercel)
│   ├── src/
│   │   ├── components/
│   │   ├── config.js  # API configuration
│   │   └── ...
│   ├── package.json
│   └── vercel.json    # Vercel config
├── backend/           # Node.js/Express backend (Deploy to Railway)
│   ├── routes/
│   ├── models/
│   ├── index.js
│   └── package.json
├── vercel.json        # Root Vercel configuration
├── railway.json       # Railway configuration
├── railway.toml       # Railway TOML configuration
└── DEPLOYMENT_GUIDE.md # Complete deployment guide
```

## 💻 Local Development

### Prerequisites
- Node.js 18.x
- MongoDB running locally or connection string

### Backend
```bash
cd backend
npm install

# Set environment variables
export MONGO_URI=mongodb://localhost:27017/cloudcommerce
export JWT_SECRET=your_secret_key
export CORS_ORIGIN=http://localhost:3000

npm run dev
```

### Frontend
```bash
cd frontend
npm install

# The frontend will use http://localhost:5000 by default for API calls
npm start
```

Access the application:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- Health check: `http://localhost:5000/health`

## 🐳 Docker

```bash
docker-compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## ☸️ Kubernetes

```bash
# Update images in k8s/*.yaml
kubectl create secret generic cloudcommerce-secrets --from-literal=jwtSecret=your_secret
kubectl apply -f k8s/
```

## 🔄 CI/CD

- GitHub Actions workflow at `.github/workflows/ci.yml`
- Automatic deployments on push to `main` branch (when configured with Vercel/Railway)

## 📚 Additional Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [FREE_DEPLOYMENT_GUIDE.md](./FREE_DEPLOYMENT_GUIDE.md) - Free tier deployment options
- [VERCEL_FRONTEND.md](./VERCEL_FRONTEND.md) - Vercel-specific frontend deployment

## 🔧 Environment Variables

### Backend (Railway)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/cloudcommerce
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-app.vercel.app
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://your-backend.up.railway.app
```

## 🏥 Health Checks

- Backend: `GET /health` - Returns database connection status
- Backend: `GET /healthz` - Simple health check

## 📄 License

MIT

