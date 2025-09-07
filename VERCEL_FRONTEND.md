# CloudCommerce Vercel Frontend Deployment

## Quick Frontend Deployment to Vercel

### Prerequisites:
- Vercel account (free)
- Vercel CLI installed

### Steps:

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy Frontend:**
```bash
cd frontend
vercel --prod
```

4. **Update API URLs:**
- Frontend will need to point to your local backend
- Or use ngrok to expose local backend publicly

### Environment Variables in Vercel:
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Pros:
- ✅ Free hosting for frontend
- ✅ Fast global CDN
- ✅ Automatic SSL
- ✅ Easy deployment

### Cons:
- ❌ Backend still needs separate hosting
- ❌ CORS configuration needed
- ❌ Two separate deployments to manage
