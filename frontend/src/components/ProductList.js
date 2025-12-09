import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Typography, 
  Button, 
  Rating,
  Box,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useCart } from '../contexts/CartContext';
import API_BASE_URL from '../config';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(() => {
        setProducts([]);
        setError('Failed to load products');
      });
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Our Products
      </Typography>
      {error && <Typography color="error" align="center" sx={{ mb: 3 }}>{error}</Typography>}
      <Grid container spacing={3}>
        {products.length === 0 ? (
          <Grid item xs={12} align="center">
            <Typography variant="h6" color="text.secondary">No products found.</Typography>
          </Grid>
        ) : (
          products.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image || `https://via.placeholder.com/300x200/f0f0f0/666666?text=${encodeURIComponent(product.name)}`}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Typography variant="h6" component="h3" noWrap sx={{ mb: 1, fontWeight: 600 }}>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating || 4} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews || Math.floor(Math.random() * 500) + 10})
                    </Typography>
                  </Box>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                    ${product.price}
                  </Typography>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ textDecoration: 'line-through', mr: 1 }}>
                        ${product.originalPrice}
                      </Typography>
                      <Chip 
                        label={`${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF`}
                        size="small" 
                        color="error"
                      />
                    </Box>
                  )}
                  {product.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {product.description}
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    size="small" 
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    component={Link} 
                    to={`/edit-product/${product._id}`}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button 
                    size="small" 
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    color="secondary"
                    onClick={() => {
                      addToCart(product);
                      console.log('Added to cart:', product.name);
                    }}
                    sx={{ flexGrow: 1 }}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    size="small" 
                    color="error" 
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this product?')) {
                        try {
                          await axios.delete(`${API_BASE_URL}/api/products/${product._id}`);
                          setProducts(products.filter(p => p._id !== product._id));
                        } catch (error) {
                          console.error('Error deleting product:', error);
                        }
                      }
                    }}
                    sx={{ minWidth: 'auto', px: 1 }}
                  >
                    ×
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default ProductList;
