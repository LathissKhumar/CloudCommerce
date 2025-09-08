import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 35 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-items-header">
              <span>Item</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <Link to={`/product/${item.id}`} className="item-image">
                    <img src={item.image || 'https://via.placeholder.com/100x100'} alt={item.name} />
                  </Link>
                  <div className="item-details">
                    <Link to={`/product/${item.id}`} className="item-name">
                      {item.name}
                    </Link>
                    <div className="item-features">
                      <span className="in-stock">In Stock</span>
                      <span className="eligible-shipping">Eligible for FREE Shipping</span>
                    </div>
                    <div className="item-actions">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                      >
                        Delete
                      </button>
                      <button className="save-later-btn">
                        Save for later
                      </button>
                      <button className="compare-btn">
                        Compare with similar items
                      </button>
                    </div>
                  </div>
                </div>

                <div className="item-price">
                  ₹{item.price.toFixed(2)}
                </div>

                <div className="item-quantity">
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <select
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="quantity-select"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="cart-subtotal">
              <span>Subtotal ({cartItems.length} items): </span>
              <strong>₹{subtotal.toFixed(2)}</strong>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <div className="summary-header">
                <h3>Order Summary</h3>
              </div>

              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping & handling:</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
              </div>

              <div className="summary-row">
                <span>Total before tax:</span>
                <span>₹{(subtotal + shipping).toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Estimated tax:</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <div className="summary-total">
                <span>Order total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} className="checkout-btn">
                Proceed to checkout
              </button>

              <div className="payment-methods">
                <p>We accept:</p>
                <div className="payment-icons">
                  <span>💳</span>
                  <span>🏦</span>
                  <span>📱</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="shipping-info-card">
              <h4>🚚 FREE Shipping</h4>
              <p>Your order qualifies for FREE Shipping. Choose this option at checkout.</p>
            </div>

            {/* Security Info */}
            <div className="security-info">
              <div className="security-item">
                <span className="icon">🔒</span>
                <span>Secure transaction</span>
              </div>
              <div className="security-item">
                <span className="icon">↩️</span>
                <span>Easy returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        <section className="recently-viewed">
          <h2>Your recently viewed items</h2>
          <div className="recently-viewed-items">
            <div className="viewed-item">
              <img src="https://via.placeholder.com/150x150" alt="Recently viewed" />
              <p>Sample Product</p>
              <span>₹2499</span>
            </div>
            {/* Add more recently viewed items */}
          </div>
        </section>

        {/* Recommended Products */}
        <section className="recommended-products">
          <h2>Customers who bought items in your cart also bought</h2>
          <div className="recommended-items">
            <div className="recommended-item">
              <img src="https://via.placeholder.com/150x150" alt="Recommended" />
              <p>Related Product</p>
              <span>₹1599</span>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
            {/* Add more recommended items */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Cart;