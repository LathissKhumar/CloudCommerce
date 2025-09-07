import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import EcommerceProductList from './EcommerceProductList';

// Hero Section Component
function HeroSection() {
  return (
    <Box sx={{ 
      bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      py: 8,
      textAlign: 'center'
    }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to CloudCommerce
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
          Discover millions of products at unbeatable prices
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/products"
            sx={{ bgcolor: '#ff9800', '&:hover': { bgcolor: '#e68900' } }}
          >
            Shop Now
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            sx={{ color: 'white', borderColor: 'white' }}
          >
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// Category Cards Component
function CategorySection() {
  const categories = [
    { name: 'Electronics', image: 'https://via.placeholder.com/300x200?text=Electronics', link: '/electronics' },
    { name: 'Fashion', image: 'https://via.placeholder.com/300x200?text=Fashion', link: '/fashion' },
    { name: 'Home & Kitchen', image: 'https://via.placeholder.com/300x200?text=Home', link: '/home' },
    { name: 'Books', image: 'https://via.placeholder.com/300x200?text=Books', link: '/books' },
  ];

  return (
    <Box sx={{ py: 6, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                component={Link}
                to={category.link}
                sx={{ 
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Box 
                    component="img"
                    src={category.image}
                    alt={category.name}
                    sx={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: 1, mb: 2 }}
                  />
                  <Typography variant="h6" component="h3">
                    {category.name}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Main Home Component
function EcommerceHome() {
  return (
    <Box>
      <HeroSection />
      <CategorySection />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <EcommerceProductList />
      </Container>
    </Box>
  );
}

export default EcommerceHome;
