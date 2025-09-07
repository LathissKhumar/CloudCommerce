import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name'
  });
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Beauty',
    'Automotive',
    'Toys'
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: '-name', label: 'Name Z-A' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: '-createdAt', label: 'Newest First' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      // Add filters to params
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sortBy) params.append('sort', filters.sortBy);
      
      // Add search query if present
      const searchQuery = searchParams.get('q');
      if (searchQuery) params.append('search', searchQuery);

      const response = await axios.get(`/api/products?${params.toString()}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
    };

    fetchProducts();
  }, [filters, searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name'
    });
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  const searchQuery = searchParams.get('q');

  return (
    <div className="products-page">
      <div className="container">
        {searchQuery && (
          <div className="search-results-header">
            <h1>Search results for "{searchQuery}"</h1>
            <p>{products.length} results found</p>
          </div>
        )}

        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>Filters</h3>
              <button onClick={clearFilters} className="clear-filters">
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <h4>Category</h4>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="price-input"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="price-input"
                />
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="filter-group">
              <h4>Customer Reviews</h4>
              <div className="rating-filters">
                <label className="rating-filter">
                  <input type="checkbox" />
                  <span className="stars">★★★★★</span> & Up
                </label>
                <label className="rating-filter">
                  <input type="checkbox" />
                  <span className="stars">★★★★☆</span> & Up
                </label>
                <label className="rating-filter">
                  <input type="checkbox" />
                  <span className="stars">★★★☆☆</span> & Up
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="products-main">
            {/* Sort and Results Info */}
            <div className="products-header">
              <div className="results-info">
                <span>{products.length} results</span>
              </div>
              <div className="sort-controls">
                <label>Sort by:</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="sort-select"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product._id} className="product-card">
                    <Link to={`/product/${product._id}`} className="product-link">
                      <div className="product-image">
                        <img 
                          src={product.image || 'https://via.placeholder.com/250x250'} 
                          alt={product.name}
                        />
                        {product.discount && (
                          <div className="discount-badge">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className="product-info">
                      <Link to={`/product/${product._id}`}>
                        <h3 className="product-name">{product.name}</h3>
                      </Link>
                      
                      <div className="product-rating">
                        <div className="stars">
                          {'★'.repeat(4)}{'☆'.repeat(1)}
                        </div>
                        <span className="rating-count">(127)</span>
                      </div>
                      
                      <div className="product-price">
                        <span className="current-price">${product.price}</span>
                        {product.originalPrice && (
                          <span className="original-price">${product.originalPrice}</span>
                        )}
                      </div>
                      
                      <div className="product-shipping">
                        <span className="shipping-text">FREE Shipping</span>
                      </div>
                      
                      <div className="product-actions">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="add-to-cart-btn"
                        >
                          Add to Cart
                        </button>
                        <button className="wishlist-btn">
                          ♡
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Products;