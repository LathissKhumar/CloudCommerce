import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function EditProduct({ productId }) {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        setName(res.data.name);
        setPrice(res.data.price);
        setDescription(res.data.description);
      })
      .catch(() => {
        setError('Failed to fetch product');
        setProduct(null);
      });
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${productId}`, { name, price, description });
      setSuccess('Product updated!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update product');
      setSuccess('');
    }
  };

  if (!product && !error) return <Loader />;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" color="primary">Edit Product</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label="Name" value={name} onChange={e => setName(e.target.value)} required fullWidth />
      <TextField label="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} required fullWidth />
      <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} multiline rows={3} fullWidth />
      <Button type="submit" variant="contained" color="primary">Update</Button>
      {success && <Typography color="success.main">{success}</Typography>}
    </Box>
  );
}

export default EditProduct;
