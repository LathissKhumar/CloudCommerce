import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/orders`)
      .then(res => {
        // Ensure response.data is an array before setting state
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          console.error('Expected array but got:', typeof res.data);
          setOrders([]);
          setError('Invalid response format');
        }
      })
      .catch(() => {
        setOrders([]);
        setError('Failed to load orders');
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" color="primary" gutterBottom>Orders</Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      <Grid container spacing={3}>
        {orders.length === 0 ? (
          <Grid item xs={12} align="center">
            <Typography>No orders found.</Typography>
          </Grid>
        ) : (
          orders.map(order => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Order #{order._id}</Typography>
                  <Typography color="text.secondary">Status: {order.status}</Typography>
                  <Typography color="text.secondary">Total: ${order.total}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/edit-order/${order._id}`}>Edit</Button>
                  <Button size="small" color="error" onClick={async () => {
                    await axios.delete(`${API_BASE_URL}/api/orders/${order._id}`);
                    setOrders(orders.filter(o => o._id !== order._id));
                  }}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}

export default OrderList;
