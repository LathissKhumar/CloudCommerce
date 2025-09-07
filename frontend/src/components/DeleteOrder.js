import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function DeleteOrder({ orderId, onDeleted }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      if (onDeleted) onDeleted();
    } catch (err) {
      alert('Failed to delete order');
    }
  };

  return <Button size="small" color="error" onClick={handleDelete}>Delete</Button>;
}

export default DeleteOrder;
