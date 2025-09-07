import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { cartItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
    navigate('/');
  };

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

  return (
    <header className="navbar">
      {/* Top Navigation */}
      <div className="navbar-top">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-text">CloudCommerce</span>
          </Link>

          {/* Delivery Location */}
          <div className="nav-location">
            <div className="location-icon">📍</div>
            <div className="location-text">
              <span className="deliver-to">Deliver to</span>
              <span className="location-name">Your Location</span>
            </div>
          </div>

          {/* Search Bar */}
          <form className="nav-search" onSubmit={handleSearch}>
            <select className="search-category">
              <option value="">All</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="text"
              className="search-input"
              placeholder="Search CloudCommerce"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>

          {/* Right Side Navigation */}
          <div className="nav-right">
            {/* Language Selector */}
            <div className="nav-item language-selector">
              <span className="flag">🇺🇸</span>
              <span>EN</span>
            </div>

            {/* Account Menu */}
            <div 
              className="nav-item account-menu"
              onMouseEnter={() => setShowAccountMenu(true)}
              onMouseLeave={() => setShowAccountMenu(false)}
            >
              <div className="account-trigger">
                <span className="greeting">
                  Hello, {isAuthenticated ? user?.name?.split(' ')[0] : 'Sign in'}
                </span>
                <span className="account-text">Account & Lists</span>
              </div>
              
              {showAccountMenu && (
                <div className="account-dropdown">
                  {!isAuthenticated ? (
                    <div className="dropdown-section">
                      <Link to="/login" className="sign-in-btn">Sign In</Link>
                      <p className="new-customer">
                        New customer? <Link to="/register">Start here.</Link>
                      </p>
                    </div>
                  ) : (
                    <div className="dropdown-section">
                      <Link to="/profile" className="dropdown-link">Your Account</Link>
                      <Link to="/orders" className="dropdown-link">Your Orders</Link>
                      <Link to="/wishlist" className="dropdown-link">Your Wish List</Link>
                      {user?.role === 'admin' && (
                        <Link to="/admin" className="dropdown-link">Admin Dashboard</Link>
                      )}
                      <button onClick={handleLogout} className="dropdown-link logout-btn">
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Orders */}
            <Link to="/orders" className="nav-item orders">
              <span className="returns-text">Returns</span>
              <span className="orders-text">& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="nav-item cart">
              <div className="cart-icon">
                🛒
                {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
              </div>
              <span className="cart-text">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Categories */}
      <div className="navbar-bottom">
        <div className="nav-container">
          <div className="nav-categories">
            <div className="all-menu">
              <span className="menu-icon">☰</span>
              <span>All</span>
            </div>
            {categories.slice(0, 6).map(category => (
              <Link 
                key={category} 
                to={`/category/${category.toLowerCase()}`} 
                className="category-link"
              >
                {category}
              </Link>
            ))}
            <Link to="/products" className="category-link">All Products</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
