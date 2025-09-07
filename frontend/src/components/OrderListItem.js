import React from 'react';
import { Link } from 'react-router-dom';
import DeleteOrder from './DeleteOrder';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function OrderListItem({ order }) {
  return (
    <>
      <Typography variant="h6">Order #{order._id}</Typography>
      <Typography color="primary">Status: {order.status}</Typography>
      <Typography color="text.secondary">Total: ${order.total}</Typography>
      <CardActions>
        <Button size="small" component={Link} to={`/edit-order/${order._id}`}>Edit</Button>
        <DeleteOrder orderId={order._id} onDeleted={() => window.location.reload()} />
      </CardActions>
    </>
  );
}

export default OrderListItem;
