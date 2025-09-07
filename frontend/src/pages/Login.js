import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      const redirectTo = searchParams.get('redirect') || '/';
      navigate(redirectTo);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              CloudCommerce
            </Link>
          </div>

          <div className="auth-form-container">
            <h1>Sign In</h1>
            
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email or mobile phone number</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="auth-submit-btn"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="form-footer">
                <p className="terms-text">
                  By continuing, you agree to CloudCommerce's{' '}
                  <Link to="/terms">Conditions of Use</Link> and{' '}
                  <Link to="/privacy">Privacy Notice</Link>.
                </p>
              </div>
            </form>

            <div className="auth-divider">
              <span>New to CloudCommerce?</span>
            </div>

            <Link to="/register" className="create-account-btn">
              Create your CloudCommerce account
            </Link>
          </div>

          <div className="auth-help">
            <div className="help-links">
              <Link to="/forgot-password">Forgot your password?</Link>
              <Link to="/help">Need help?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;