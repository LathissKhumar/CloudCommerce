import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Back to Top */}
      <div className="footer-top">
        <button onClick={scrollToTop} className="back-to-top">
          Back to top
        </button>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Get to Know Us</h3>
            <ul className="footer-links">
              <li><Link to="/about">About CloudCommerce</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press Releases</Link></li>
              <li><Link to="/investor">Investor Relations</Link></li>
              <li><Link to="/blog">CloudCommerce Science</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Make Money with Us</h3>
            <ul className="footer-links">
              <li><Link to="/sell">Sell products on CloudCommerce</Link></li>
              <li><Link to="/business">Sell on CloudCommerce Business</Link></li>
              <li><Link to="/apps">Sell apps on CloudCommerce</Link></li>
              <li><Link to="/affiliate">Become an Affiliate</Link></li>
              <li><Link to="/advertise">Advertise Your Products</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>CloudCommerce Payment Products</h3>
            <ul className="footer-links">
              <li><Link to="/business-card">CloudCommerce Business Card</Link></li>
              <li><Link to="/shop-points">Shop with Points</Link></li>
              <li><Link to="/reload">Reload Your Balance</Link></li>
              <li><Link to="/currency-converter">Currency Converter</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Let Us Help You</h3>
            <ul className="footer-links">
              <li><Link to="/account">Your Account</Link></li>
              <li><Link to="/orders">Your Orders</Link></li>
              <li><Link to="/shipping">Shipping Rates & Policies</Link></li>
              <li><Link to="/returns">Returns & Replacements</Link></li>
              <li><Link to="/content">Manage Your Content and Devices</Link></li>
              <li><Link to="/help">CloudCommerce Assistant</Link></li>
              <li><Link to="/help">Help</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-logo">CloudCommerce</div>
          <div className="footer-copyright">
            © 1996-2024, CloudCommerce.com, Inc. or its affiliates
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
