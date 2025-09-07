import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      // Mock wishlist data for demonstration
      setWishlistItems([
        {
          id: '1',
          name: 'Wireless Bluetooth Headphones',
          price: 79.99,
          originalPrice: 99.99,
          image: 'https://via.placeholder.com/200x200',
          inStock: true,
          rating: 4.5,
          reviews: 234
        },
        {
          id: '2',
          name: 'Smart Fitness Watch',
          price: 199.99,
          image: 'https://via.placeholder.com/200x200',
          inStock: false,
          rating: 4.2,
          reviews: 156
        }
      ]);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="auth-required">
            <h2>Sign in to view your wish list</h2>
            <p>Save items you're interested in to your wish list so you can easily find them later.</p>
            <Link to="/login" className="sign-in-btn">Sign In</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>Your Wish List</h1>
          <p>{wishlistItems.length} items</p>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading your wish list...</p>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-icon">💝</div>
            <h2>Your wish list is empty</h2>
            <p>Save items you're interested in to your wish list so you can easily find them later.</p>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="wishlist-content">
            <div className="wishlist-actions">
              <button className="share-list-btn">Share list</button>
              <button className="manage-list-btn">Manage list</button>
            </div>

            <div className="wishlist-grid">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                    title="Remove from wish list"
                  >
                    ✕
                  </button>

                  <Link to={`/product/${item.id}`} className="item-image">
                    <img src={item.image} alt={item.name} />
                  </Link>

                  <div className="item-info">
                    <Link to={`/product/${item.id}`} className="item-name">
                      {item.name}
                    </Link>

                    <div className="item-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(item.rating) ? 'star filled' : 'star'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="rating-count">({item.reviews})</span>
                    </div>

                    <div className="item-price">
                      <span className="current-price">${item.price}</span>
                      {item.originalPrice && (
                        <span className="original-price">${item.originalPrice}</span>
                      )}
                    </div>

                    <div className="item-availability">
                      {item.inStock ? (
                        <span className="in-stock">In Stock</span>
                      ) : (
                        <span className="out-of-stock">Currently unavailable</span>
                      )}
                    </div>

                    <div className="item-actions">
                      {item.inStock ? (
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="add-to-cart-btn"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <button className="notify-btn">
                          Email me when available
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Items */}
            <section className="recommended-section">
              <h2>Inspired by your wish list</h2>
              <div className="recommended-grid">
                <div className="recommended-item">
                  <img src="https://via.placeholder.com/150x150" alt="Recommended" />
                  <h3>Related Product</h3>
                  <div className="price">$49.99</div>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
                {/* Add more recommended items */}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;