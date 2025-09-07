import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      
      // Fetch related products
      if (response.data.category) {
        const relatedResponse = await axios.get(`/api/products?category=${response.data.category}&limit=4`);
        setRelatedProducts(relatedResponse.data.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      // Mock reviews for now
      setReviews([
        {
          id: 1,
          user: 'John D.',
          rating: 5,
          title: 'Excellent product!',
          comment: 'Great quality and fast shipping. Highly recommended!',
          date: '2024-01-15',
          verified: true
        },
        {
          id: 2,
          user: 'Sarah M.',
          rating: 4,
          title: 'Good value for money',
          comment: 'Works as expected. Good build quality.',
          date: '2024-01-10',
          verified: true
        }
      ]);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  const productImages = product.images || [product.image || 'https://via.placeholder.com/500x500'];
  const averageRating = 4.2; // Mock rating
  const totalReviews = 127; // Mock review count

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="image-thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
            <div className="main-image">
              <img src={productImages[selectedImage]} alt={product.name} />
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(averageRating) ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-text">{averageRating} out of 5</span>
              <Link to="#reviews" className="review-count">
                {totalReviews} customer reviews
              </Link>
            </div>

            <div className="product-price">
              <span className="current-price">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount">
                    Save ₹{(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Key Features:</h3>
              <ul>
                <li>High quality materials</li>
                <li>Durable construction</li>
                <li>Easy to use</li>
                <li>Great value for money</li>
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(-1)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
              </div>

              <div className="action-buttons">
                <button onClick={handleAddToCart} className="add-to-cart-btn">
                  Add to Cart
                </button>
                <button className="buy-now-btn">
                  Buy Now
                </button>
                <button className="wishlist-btn">
                  Add to Wish List
                </button>
              </div>
            </div>

            <div className="shipping-info">
              <div className="shipping-item">
                <span className="icon">🚚</span>
                <div>
                  <strong>FREE Shipping</strong>
                  <p>Get it by tomorrow if you order within 12 hrs</p>
                </div>
              </div>
              <div className="shipping-item">
                <span className="icon">↩️</span>
                <div>
                  <strong>FREE Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Options */}
          <div className="purchase-options">
            <div className="option-card">
              <h3>Buy new:</h3>
              <div className="price">₹{product.price}</div>
              <div className="shipping">FREE Shipping</div>
              <div className="stock">In Stock</div>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button className="tab-header active">Description</button>
            <button className="tab-header">Specifications</button>
            <button className="tab-header">Reviews</button>
          </div>
          
          <div className="tab-content">
            <div className="tab-panel active">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <section id="reviews" className="reviews-section">
          <h2>Customer Reviews</h2>
          <div className="reviews-summary">
            <div className="rating-breakdown">
              <div className="overall-rating">
                <span className="rating-number">{averageRating}</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(averageRating) ? 'star filled' : 'star'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="total-reviews">{totalReviews} reviews</span>
              </div>
            </div>
          </div>

          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <span className="reviewer-name">{review.user}</span>
                    {review.verified && <span className="verified-badge">Verified Purchase</span>}
                  </div>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <h4 className="review-title">{review.title}</h4>
                <p className="review-comment">{review.comment}</p>
                <div className="review-date">{review.date}</div>
              </div>
            ))}
          </div>

          {isAuthenticated && (
            <div className="write-review">
              <h3>Write a Review</h3>
              <button className="write-review-btn">Write a Customer Review</button>
            </div>
          )}
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>Related Products</h2>
            <div className="products-grid">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct._id} className="product-card">
                  <Link to={`/product/${relatedProduct._id}`}>
                    <div className="product-image">
                      <img 
                        src={relatedProduct.image || 'https://via.placeholder.com/250x250'} 
                        alt={relatedProduct.name}
                      />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{relatedProduct.name}</h3>
                      <div className="product-price">
                        <span className="current-price">₹{relatedProduct.price}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;