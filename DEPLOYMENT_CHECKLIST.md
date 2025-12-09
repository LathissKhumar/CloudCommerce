# CloudCommerce Deployment Checklist

Quick checklist for deploying CloudCommerce with Vercel (Frontend) + Railway (Backend).

## ✅ Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] Create free M0 cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Create database user with password
- [ ] Add IP address 0.0.0.0/0 to Network Access
- [ ] Copy connection string with format:
  ```
  mongodb+srv://user:password@cluster.mongodb.net/cloudcommerce?retryWrites=true&w=majority
  ```

### 2. Railway Backend Deployment
- [ ] Sign up at [Railway](https://railway.app) with GitHub
- [ ] Create new project from GitHub repository
- [ ] Add environment variables:
  - [ ] `MONGO_URI` (from Step 1)
  - [ ] `JWT_SECRET` (generate with: `openssl rand -base64 32`)
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`
  - [ ] `CORS_ORIGIN=*` (temporary, will update after Vercel)
- [ ] Wait for deployment to complete
- [ ] Copy Railway URL (e.g., `https://cloudcommerce-production.up.railway.app`)
- [ ] Test health endpoint: `https://your-railway-url.up.railway.app/health`

### 3. Vercel Frontend Deployment
- [ ] Sign up at [Vercel](https://vercel.com) with GitHub
- [ ] Import GitHub repository
- [ ] Add environment variable:
  - [ ] `REACT_APP_API_URL` = Your Railway backend URL
- [ ] Deploy project
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Copy Vercel URL (e.g., `https://your-app.vercel.app`)

### 4. Update CORS Configuration
- [ ] Go back to Railway project
- [ ] Update `CORS_ORIGIN` environment variable with your Vercel URL
- [ ] Wait for automatic redeployment

### 5. Testing
- [ ] Visit your Vercel URL
- [ ] Test user registration
- [ ] Test user login
- [ ] View products list
- [ ] Test adding a product (if admin)
- [ ] Check browser console for errors

## 🔑 Environment Variables Reference

### Railway (Backend)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/cloudcommerce?retryWrites=true&w=majority
JWT_SECRET=<generate-random-32-char-string>
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-app.vercel.app
```

### Vercel (Frontend)
```env
REACT_APP_API_URL=https://your-app.up.railway.app
```

## 🔧 Troubleshooting

### Frontend can't connect to backend
- Check `REACT_APP_API_URL` in Vercel environment variables
- Verify Railway backend is running
- Check browser console for CORS errors

### CORS errors
- Ensure `CORS_ORIGIN` in Railway matches Vercel URL exactly
- Include `https://` protocol
- No trailing slash

### Database connection failed
- Verify MongoDB connection string is correct
- Check Network Access in MongoDB Atlas includes 0.0.0.0/0
- Ensure password doesn't contain special characters that need URL encoding

### Build failed
- Check Vercel deployment logs
- Ensure all dependencies are in package.json
- Verify `vercel.json` configuration is correct

## 📝 Post-Deployment Tasks

- [ ] Set up custom domain (optional)
- [ ] Configure error monitoring (e.g., Sentry)
- [ ] Set up analytics (e.g., Google Analytics)
- [ ] Plan for database backups
- [ ] Monitor usage on Railway and Vercel dashboards

## 🎉 Success!

Your CloudCommerce application is live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-app.up.railway.app`

**Total Monthly Cost**: $0.00 (Free tier)

---

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
