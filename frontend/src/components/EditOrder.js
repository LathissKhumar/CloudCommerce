import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function EditOrder({ orderId }) {
  const [status, setStatus] = useState('pending');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/orders/${orderId}`)
      .then(res => {
        setStatus(res.data.status);
      })
      .catch(() => {
        setError('Failed to fetch order');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/orders/${orderId}`, { status });
      setSuccess('Order updated!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update order');
      setSuccess('');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading order...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="auth-form-container">
        <h1>Edit Order</h1>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="status">Order Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-input"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <button type="submit" className="auth-submit-btn">
            Update Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditOrder;
