# CloudCommerce

Production-ready e-commerce scaffold with Node/Express/Mongo backend and React frontend. Includes Docker, Kubernetes manifests, and CI.

## Local Development

Backend
- Env (Windows): `setx MONGO_URI mongodb://localhost:27017/cloudcommerce` and `setx JWT_SECRET your_secret`
- Run: `cd backend && npm install && npm run dev`

Frontend
- Run: `cd frontend && npm install && npm start`

## Docker

- `docker-compose up --build`
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Kubernetes

- Update images in `k8s/*.yaml`
- Secret: `kubectl create secret generic cloudcommerce-secrets --from-literal=jwtSecret=your_secret`
- Apply: `kubectl apply -f k8s/`

## CI

- GitHub Actions workflow at `.github/workflows/ci.yml`

## Health

- `GET /healthz`

