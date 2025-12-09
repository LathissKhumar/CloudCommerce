import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
  Grid,
  Card,
  CardMedia,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
  Image as ImageIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('4');
  const [stockCount, setStockCount] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Books',
    'Sports & Outdoors',
    'Beauty & Personal Care',
    'Toys & Games',
    'Automotive'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const productData = {
      name,
      price: parseFloat(price),
      description,
      image,
      category,
      rating: parseFloat(rating),
      stockCount: parseInt(stockCount) || 0,
      inStock: parseInt(stockCount) > 0
    };

    if (originalPrice && parseFloat(originalPrice) > parseFloat(price)) {
      productData.originalPrice = parseFloat(originalPrice);
    }

    try {
      await axios.post(`${API_BASE_URL}/api/products`, productData);
      setSuccess('Product added successfully! Redirecting...');
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <AddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Add New Product
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Fill in the details to add a new product to your store
          </Typography>
        </Box>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Product Image Preview */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: 280 }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={image || 'https://via.placeholder.com/300x240/f0f0f0/666666?text=Product+Image'}
                  alt="Product Preview"
                  sx={{ objectFit: 'cover' }}
                />
                <Box sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Preview
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CategoryIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Price"
                    type="number"
                    inputProps={{ min: 0, step: 0.01 }}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MoneyIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Original Price (Optional)"
                    type="number"
                    inputProps={{ min: 0, step: 0.01 }}
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    helperText="For showing discounts"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stock Count"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={stockCount}
                    onChange={(e) => setStockCount(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Image URL */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/product-image.jpg"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ImageIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                helperText="Enter a valid image URL for the product"
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignItems: 'flex-start', pt: 1 }}>
                      <DescriptionIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter detailed product description..."
              />
            </Grid>

            {/* Rating */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1">Initial Rating:</Typography>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Chip
                    key={star}
                    label={`${star} ${star === 1 ? 'Star' : 'Stars'}`}
                    clickable
                    variant={rating === star.toString() ? 'filled' : 'outlined'}
                    color={rating === star.toString() ? 'primary' : 'default'}
                    onClick={() => setRating(star.toString())}
                    sx={{ minWidth: 80 }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading || !name || !price}
                  startIcon={<SaveIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #45a049 30%, #3d8b40 90%)',
                    }
                  }}
                >
                  {loading ? 'Adding Product...' : 'Add Product'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/products')}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddProduct;
