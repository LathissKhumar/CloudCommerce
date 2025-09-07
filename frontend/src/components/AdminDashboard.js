import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Divider
} from '@mui/material';
import {
  Inventory as ProductsIcon,
  Add as AddIcon,
  ShoppingBag as OrdersIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingIcon,
  People as PeopleIcon
} from '@mui/icons-material';

function AdminDashboard() {
  const menuItems = [
    {
      title: 'View Products',
      description: 'Manage your product inventory',
      icon: <ProductsIcon sx={{ fontSize: 40 }} />,
      link: '/products',
      color: '#2196F3',
      bgColor: 'rgba(33, 150, 243, 0.1)'
    },
    {
      title: 'Add Product',
      description: 'Add new products to your store',
      icon: <AddIcon sx={{ fontSize: 40 }} />,
      link: '/add-product',
      color: '#4CAF50',
      bgColor: 'rgba(76, 175, 80, 0.1)'
    },
    {
      title: 'View Orders',
      description: 'Track and manage customer orders',
      icon: <OrdersIcon sx={{ fontSize: 40 }} />,
      link: '/orders',
      color: '#FF9800',
      bgColor: 'rgba(255, 152, 0, 0.1)'
    }
  ];

  const stats = [
    { label: 'Total Products', value: '24', icon: <ProductsIcon />, color: '#2196F3' },
    { label: 'Total Orders', value: '156', icon: <OrdersIcon />, color: '#FF9800' },
    { label: 'Monthly Revenue', value: '$12,450', icon: <TrendingIcon />, color: '#4CAF50' },
    { label: 'Active Users', value: '89', icon: <PeopleIcon />, color: '#9C27B0' }
  ];

  return (
    <Box sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Avatar sx={{ 
          width: 80, 
          height: 80, 
          bgcolor: 'primary.main', 
          mx: 'auto', 
          mb: 2,
          fontSize: '2rem'
        }}>
          <DashboardIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your CloudCommerce store
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 2
              }}>
                <Avatar sx={{ 
                  bgcolor: `${stat.color}20`, 
                  color: stat.color,
                  width: 48,
                  height: 48
                }}>
                  {stat.icon}
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Quick Actions */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
        Quick Actions
      </Typography>
      
      <Grid container spacing={3}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              component={Link}
              to={item.link}
              sx={{ 
                height: '100%',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Box sx={{ 
                  width: 80,
                  height: 80,
                  bgcolor: item.bgColor,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  color: item.color
                }}>
                  {item.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: item.color,
                    '&:hover': {
                      bgcolor: item.color,
                      filter: 'brightness(0.9)'
                    },
                    px: 4,
                    py: 1
                  }}
                >
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
