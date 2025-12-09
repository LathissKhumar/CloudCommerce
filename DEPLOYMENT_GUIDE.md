# CloudCommerce Deployment Guide

## Frontend (Vercel) + Backend (Railway) Deployment

This guide will help you deploy the CloudCommerce application with:
- **Frontend**: Deployed to Vercel (Free tier)
- **Backend**: Deployed to Railway (Free tier)
- **Database**: MongoDB Atlas (Free tier)

---

## Prerequisites

1. GitHub account with this repository
2. [Vercel account](https://vercel.com) (free)
3. [Railway account](https://railway.app) (free)
4. [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) (free)

---

## Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create a Free MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project: "CloudCommerce"
4. Click "Build a Database"
5. Choose **M0 FREE** tier
6. Select your preferred cloud provider and region
7. Name your cluster: `cloudcommerce`
8. Click "Create"

### 1.2 Configure Database Access

1. Go to **Database Access** (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `cloudcommerce_user`
5. Click "Autogenerate Secure Password" and **SAVE THIS PASSWORD**
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.3 Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.4 Get Connection String

1. Go to **Database** → Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: Node.js, Version: 4.1 or later
4. Copy the connection string, it looks like:
   ```
   mongodb+srv://cloudcommerce_user:<password>@cloudcommerce.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you saved earlier
6. Add database name at the end: `cloudcommerce`
   ```
   mongodb+srv://cloudcommerce_user:YOUR_PASSWORD@cloudcommerce.xxxxx.mongodb.net/cloudcommerce?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy Backend to Railway

### 2.1 Create Railway Project

1. Go to [Railway](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose this repository: `CloudCommerce`
6. Railway will automatically detect the Node.js backend

### 2.2 Configure Environment Variables

1. In your Railway project, click on the service
2. Go to the **Variables** tab
3. Add the following environment variables:

```env
MONGO_URI=mongodb+srv://cloudcommerce_user:YOUR_PASSWORD@cloudcommerce.xxxxx.mongodb.net/cloudcommerce?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-app-name.vercel.app
```

**Important Notes:**
- Replace `MONGO_URI` with your actual MongoDB connection string from Step 1.4
- Replace `JWT_SECRET` with a secure random string (e.g., generate with: `openssl rand -base64 32`)
- For `CORS_ORIGIN`, you'll update this after deploying to Vercel (Step 3)

### 2.3 Get Railway Backend URL

1. After deployment completes, Railway will provide a public URL
2. Click "Settings" → scroll to "Domains"
3. Click "Generate Domain" if not already generated
4. Copy the URL (e.g., `https://cloudcommerce-production.up.railway.app`)
5. **SAVE THIS URL** - you'll need it for Vercel

### 2.4 Verify Backend Deployment

Visit your Railway URL in a browser:
- `https://your-app.up.railway.app/health` should return: `{"status":"healthy","database":"connected"}`

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Project

1. Go to [Vercel](https://vercel.com)
2. Sign up/login with GitHub
3. Click "Add New..." → "Project"
4. Import your GitHub repository: `CloudCommerce`
5. Vercel will auto-detect the configuration

### 3.2 Configure Project Settings

In the project configuration:

1. **Framework Preset**: Other
2. **Root Directory**: Leave empty (configured in vercel.json)
3. **Build Command**: Leave as configured (uses vercel.json)
4. **Output Directory**: Leave as configured (uses vercel.json)

### 3.3 Add Environment Variables

Before deploying, add this environment variable:

**Name**: `REACT_APP_API_URL`  
**Value**: Your Railway backend URL from Step 2.3 (e.g., `https://cloudcommerce-production.up.railway.app`)

### 3.4 Deploy

1. Click "Deploy"
2. Wait for the build to complete (2-3 minutes)
3. Once deployed, Vercel will provide your frontend URL (e.g., `https://your-app.vercel.app`)

---

## Step 4: Update CORS Configuration

### 4.1 Update Railway Environment Variable

1. Go back to your Railway project
2. Navigate to **Variables** tab
3. Update the `CORS_ORIGIN` variable with your Vercel URL:
   ```
   CORS_ORIGIN=https://your-app.vercel.app
   ```
4. Railway will automatically redeploy with the new settings

---

## Step 5: Test Your Deployment

### 5.1 Access Your Application

Visit your Vercel URL: `https://your-app.vercel.app`

### 5.2 Test Key Features

1. **Registration**: Try creating a new user account
2. **Login**: Sign in with your credentials
3. **Products**: View the products list
4. **Admin Functions**: Add, edit, or delete products (if admin)

### 5.3 Troubleshooting

If you encounter issues:

1. **CORS Errors**: 
   - Verify `CORS_ORIGIN` in Railway matches your Vercel URL exactly
   - Check browser console for exact error message

2. **Database Connection Failed**:
   - Verify MongoDB Atlas connection string is correct
   - Check that IP address 0.0.0.0/0 is allowed in Network Access

3. **API Not Responding**:
   - Visit `https://your-railway-url.up.railway.app/health`
   - Check Railway logs for error messages

4. **Frontend Build Failed**:
   - Check Vercel deployment logs
   - Verify `REACT_APP_API_URL` is set correctly

---

## Environment Variables Summary

### Railway Backend Variables

```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/cloudcommerce?retryWrites=true&w=majority
JWT_SECRET=your-secure-random-secret-key
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-app.vercel.app
```

### Vercel Frontend Variables

```env
REACT_APP_API_URL=https://your-app.up.railway.app
```

---

## Automatic Deployments

Both platforms support automatic deployments:

- **Railway**: Automatically deploys when you push to the `main` branch
- **Vercel**: Automatically deploys when you push to the `main` branch

To deploy updates:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

---

## Cost Breakdown (Free Tier)

### MongoDB Atlas (M0)
- ✅ 512MB Storage
- ✅ Unlimited reads/writes within fair use
- ✅ No credit card required
- ✅ No expiration

### Railway (Free Plan)
- ✅ $5 free credit per month
- ✅ 500 execution hours/month
- ✅ 512MB RAM
- ✅ Community support

### Vercel (Hobby Plan)
- ✅ Unlimited websites
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ No credit card required

**Total Monthly Cost: $0.00**

---

## Support & Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)

---

## Security Notes

1. **Never commit secrets to Git**: Use environment variables for all sensitive data
2. **Use strong JWT secrets**: Generate with `openssl rand -base64 32`
3. **Restrict CORS origins**: Only allow your Vercel domain in production
4. **Keep dependencies updated**: Regularly run `npm audit` and update packages
5. **Monitor API usage**: Watch Railway and MongoDB Atlas dashboards for unusual activity

---

## Next Steps

After successful deployment:

1. **Custom Domain**: Add a custom domain in Vercel settings (optional)
2. **Monitoring**: Set up error tracking (e.g., Sentry)
3. **Analytics**: Add Google Analytics or similar
4. **Email Service**: Configure email for user notifications
5. **Backup Strategy**: Set up regular MongoDB backups

---

**Congratulations! Your CloudCommerce application is now live! 🎉**
