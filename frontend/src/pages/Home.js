import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  const heroSlides = [
    {
      id: 1,
      title: "Summer Sale - Up to 70% Off",
      subtitle: "Shop the best deals on electronics, fashion, and more",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop",
      cta: "Shop Now",
      link: "/products"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Discover the latest products from top brands",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
      cta: "Explore",
      link: "/products"
    },
    {
      id: 3,
      title: "Free Shipping",
      subtitle: "On orders over ₹2500. Fast, reliable delivery",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop",
      cta: "Learn More",
      link: "/products"
    }
  ];

  const categories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
      link: "/category/electronics"
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
      link: "/category/clothing"
    },
    {
      name: "Home & Garden",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      link: "/category/home-garden"
    },
    {
      name: "Books",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      link: "/category/books"
    }
  ];

  useEffect(() => {
    fetchFeaturedProducts();
    
    // Auto-slide carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('/api/products?limit=8');
      // Ensure response.data is an array before setting state
      if (Array.isArray(response.data)) {
        setFeaturedProducts(response.data.slice(0, 8));
      } else {
        console.error('Expected array but got:', typeof response.data);
        setFeaturedProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="home">
      {/* Hero Carousel */}
      <section className="hero-carousel">
        <div className="carousel-container">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <Link to={slide.link} className="slide-cta">
                  {slide.cta}
                </Link>
              </div>
            </div>
          ))}
          
          <button className="carousel-btn prev" onClick={prevSlide}>
            ❮
          </button>
          <button className="carousel-btn next" onClick={nextSlide}>
            ❯
          </button>
          
          <div className="carousel-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link key={category.name} to={category.link} className="category-card">
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <h3 className="category-name">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="view-all">View All</Link>
          </div>
          
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <Link to={`/product/${product._id}`} className="product-link">
                    <div className="product-image">
                      <img 
                        src={product.image || 'https://via.placeholder.com/250x250'} 
                        alt={product.name}
                      />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-rating">
                        <div className="stars">
                          {'★'.repeat(4)}{'☆'.repeat(1)}
                        </div>
                        <span className="rating-count">(127)</span>
                      </div>
                      <div className="product-price">
                        <span className="current-price">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="original-price">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <div className="product-shipping">
                        FREE Shipping
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Deals Section */}
      <section className="deals-section">
        <div className="container">
          <div className="deals-banner">
            <div className="deals-content">
              <h2>Today's Deals</h2>
              <p>Save up to 50% on selected items</p>
              <Link to="/products" className="deals-cta">Shop Deals</Link>
            </div>
            <div className="deals-image">
              <img 
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop" 
                alt="Today's Deals"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free shipping on orders over ₹2500</p>
            </div>
            <div className="service-item">
              <div className="service-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="service-item">
              <div className="service-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Your payment information is safe</p>
            </div>
            <div className="service-item">
              <div className="service-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Customer support available anytime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;