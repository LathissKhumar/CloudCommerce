import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useCart } from '../contexts/CartContext';

function EcommerceNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartItemsCount } = useCart();

  return (
    <AppBar position="static" sx={{ bgcolor: '#131921' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h5" component={Link} to="/" sx={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          minWidth: '150px'
        }}>
          CloudCommerce
        </Typography>
        
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            flexGrow: 1, 
            maxWidth: '500px',
            bgcolor: 'white',
            borderRadius: '4px'
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button color="inherit" component={Link} to="/login" startIcon={<PersonIcon />}>
            Sign In
          </Button>
          
          <Button color="inherit" component={Link} to="/cart">
            <Badge badgeContent={getCartItemsCount()} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Box>
      </Toolbar>
      
      {/* Secondary Navigation */}
      <Box sx={{ bgcolor: '#232F3E', px: 2, py: 1 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/products" size="small">
            All Products
          </Button>
          <Button color="inherit" component={Link} to="/electronics" size="small">
            Electronics
          </Button>
          <Button color="inherit" component={Link} to="/fashion" size="small">
            Fashion
          </Button>
          <Button color="inherit" component={Link} to="/books" size="small">
            Books
          </Button>
          <Button color="inherit" component={Link} to="/admin" size="small">
            Admin Panel
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
}

export default EcommerceNavbar;
