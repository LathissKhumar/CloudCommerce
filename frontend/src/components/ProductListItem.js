import React from 'react';
import { Link } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ProductListItem({ product }) {
  return (
    <>
      <Typography variant="h6">{product.name}</Typography>
      <Typography color="primary">${product.price}</Typography>
      {product.description && <Typography variant="body2" color="text.secondary">{product.description}</Typography>}
      <CardActions>
        <Button size="small" component={Link} to={`/edit-product/${product._id}`}>Edit</Button>
        <DeleteProduct productId={product._id} onDeleted={() => window.location.reload()} />
      </CardActions>
    </>
  );
}

export default ProductListItem;
