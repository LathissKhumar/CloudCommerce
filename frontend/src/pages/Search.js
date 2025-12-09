import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

function Search() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'relevance'
  });
  const { addToCart } = useCart();

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

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
    { value: 'relevance', label: 'Featured' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: '-createdAt', label: 'Newest Arrivals' },
    { value: 'name', label: 'Name: A to Z' }
  ];

  useEffect(() => {
    const searchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (query) params.append('search', query);
      if (category) params.append('category', category);
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sortBy && filters.sortBy !== 'relevance') {
        params.append('sort', filters.sortBy);
      }

      const response = await axios.get(`/api/products?${params.toString()}`);
      // Ensure response.data is an array before setting state
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('Expected array but got:', typeof response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
    };

    if (query || category) {
      searchProducts();
    }
  }, [query, category, filters]);

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
      sortBy: 'relevance'
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

  return (
    <div className="search-page">
      <div className="container">
        {/* Search Header */}
        <div className="search-header">
          {query && (
            <h1>Search results for "{query}"</h1>
          )}
          {category && (
            <h1>Products in {category}</h1>
          )}
          <p className="results-count">
            {loading ? 'Searching...' : `${products.length} results`}
          </p>
        </div>

        <div className="search-layout">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>Refine by</h3>
              <button onClick={clearFilters} className="clear-filters">
                Clear
              </button>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <h4>Department</h4>
              <div className="filter-options">
                {categories.map(cat => (
                  <label key={cat} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={filters.category === cat}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <h4>Price</h4>
              <div className="price-ranges">
                <label className="filter-option">
                  <input type="radio" name="priceRange" />
                  <span>Under ₹2000</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="priceRange" />
                  <span>₹2000 to ₹5000</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="priceRange" />
                  <span>₹5000 to ₹10000</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="priceRange" />
                  <span>₹10000 to ₹20000</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="priceRange" />
                  <span>₹20000 & Above</span>
                </label>
              </div>
              
              <div className="custom-price-range">
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
                <button className="apply-price-btn">Go</button>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="filter-group">
              <h4>Customer Reviews</h4>
              <div className="rating-filters">
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="stars">★★★★★</span>
                  <span>& Up</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="stars">★★★★☆</span>
                  <span>& Up</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="stars">★★★☆☆</span>
                  <span>& Up</span>
                </label>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="filter-group">
              <h4>Brand</h4>
              <div className="brand-search">
                <input type="text" placeholder="Search brands" className="brand-search-input" />
              </div>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Apple</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Samsung</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Nike</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Search Results */}
          <main className="search-results">
            {/* Sort Options */}
            <div className="sort-bar">
              <div className="sort-info">
                <span>Sort by:</span>
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

            {/* Results */}
            {loading ? (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Searching products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="no-results">
                <h3>No results found</h3>
                <p>Try different keywords or remove search filters</p>
                <div className="search-suggestions">
                  <h4>Search suggestions:</h4>
                  <ul>
                    <li>Check your spelling</li>
                    <li>Try more general keywords</li>
                    <li>Try different keywords</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="results-grid">
                {products.map((product) => (
                  <div key={product._id} className="search-result-item">
                    <Link to={`/product/${product._id}`} className="product-image">
                      <img 
                        src={product.image || 'https://via.placeholder.com/200x200'} 
                        alt={product.name}
                      />
                    </Link>
                    
                    <div className="product-details">
                      <Link to={`/product/${product._id}`} className="product-title">
                        {product.name}
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
                        <span className="prime-badge">Prime</span>
                        <span>FREE Shipping</span>
                      </div>
                      
                      <div className="product-description">
                        {product.description && product.description.substring(0, 100)}...
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="add-to-cart-btn"
                      >
                        Add to Cart
                      </button>
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

export default Search;