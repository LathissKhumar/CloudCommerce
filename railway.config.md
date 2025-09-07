# Railway Deployment Configuration
# Add this to package.json in backend folder

{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "seed:admin": "node seed-admin.js",
    "seed:products": "node seedProducts.js"
  },
  "engines": {
    "node": "18.x"
  }
}

# Railway will automatically detect and use the "start" script
