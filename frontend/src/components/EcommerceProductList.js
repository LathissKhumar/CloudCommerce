import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

function ProductCard({ product }) {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image || 'https://via.placeholder.com/300x200?text=Product+Image'}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" component="div" noWrap sx={{ mb: 1 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '40px', overflow: 'hidden' }}>
          {product.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={4.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            (142)
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" color="primary" fontWeight="bold">
            ${product.price}
          </Typography>
          <Chip 
            label="Free Delivery" 
            size="small" 
            color="success" 
            variant="outlined"
          />
        </Box>
      </CardContent>
      
      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Button 
          variant="contained" 
          color="warning" 
          fullWidth 
          sx={{ mr: 1, bgcolor: '#ff9800' }}
        >
          Add to Cart
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          component={Link} 
          to={`/product/${product._id}`}
        >
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
}

function EcommerceProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <Typography>Loading products...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Products for You
      </Typography>
      
      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <Grid container spacing={3}>
        {products.length === 0 ? (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No products found
              </Typography>
            </Box>
          </Grid>
        ) : (
          products.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default EcommerceProductList;
