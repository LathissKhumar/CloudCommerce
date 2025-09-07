# CloudCommerce Frontend Setup

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm start
   ```

The application will start on `http://localhost:3000`

## If you encounter Material-UI errors:

The admin components use Material-UI. If you see import errors, install Material-UI:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

## Backend Connection

Make sure your backend is running on `http://localhost:5000` or update the proxy in `package.json`.

## Features Available

### Customer Features (Amazon-like)
- ✅ Home page with hero carousel and featured products
- ✅ Product listing with filters and search
- ✅ Product detail pages
- ✅ Shopping cart with persistence
- ✅ User authentication (login/register)
- ✅ User profile management
- ✅ Order history
- ✅ Wishlist functionality
- ✅ Checkout process

### Admin Features (Existing)
- ✅ Admin dashboard
- ✅ Product management
- ✅ Order management

## Troubleshooting

### Common Issues:

1. **Proxy Error (ECONNREFUSED)**
   - Make sure your backend server is running on port 5000
   - Or update the proxy in package.json to match your backend port

2. **Material-UI Import Errors**
   - Run: `npm install @mui/material @emotion/react @emotion/styled @mui/icons-material`

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Development vs Production

- **Development**: Uses proxy to backend on localhost:5000
- **Production**: Update API calls to use your production backend URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

Enjoy your new Amazon-like e-commerce frontend! 🛍️