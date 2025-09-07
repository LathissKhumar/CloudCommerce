# Environment Configurations
environments/
├── .env.development     # Local development settings
├── .env.staging        # Staging environment settings  
├── .env.production     # Production environment settings
└── README.md           # This file

## Usage

### Local Development
```bash
cp environments/.env.development .env
```

### Staging Deployment
```bash
cp environments/.env.staging .env
# Update registry and secrets as needed
```

### Production Deployment
```bash
cp environments/.env.production .env
# IMPORTANT: Update all secrets and credentials
```

## Security Notes

1. **Never commit real secrets** to version control
2. **Update default passwords** before production deployment
3. **Use strong JWT secrets** (minimum 256-bit random string)
4. **Configure proper CORS origins** for each environment
5. **Review rate limiting** settings for production

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| NODE_ENV | Environment mode | Yes |
| PORT | Backend server port | Yes |
| MONGO_URI | MongoDB connection string | Yes |
| JWT_SECRET | JWT signing secret | Yes |
| CORS_ORIGIN | Allowed frontend origin | Yes |
| ADMIN_EMAIL | Default admin email | Yes |
| ADMIN_PASSWORD | Default admin password | Yes |
| DOCKER_REGISTRY | Docker registry URL | K8s only |
