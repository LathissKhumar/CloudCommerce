import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Mock data for demonstration
      setOrders([
        {
          _id: '1',
          orderNumber: 'CC-2024-001',
          date: '2024-01-15',
          status: 'delivered',
          total: 6999,
          items: [
            {
              name: 'Wireless Headphones',
              price: 6999,
              quantity: 1,
              image: 'https://via.placeholder.com/100x100'
            }
          ]
        },
        {
          _id: '2',
          orderNumber: 'CC-2024-002',
          date: '2024-01-20',
          status: 'shipped',
          total: 24999,
          items: [
            {
              name: 'Smart Watch',
              price: 24999,
              quantity: 1,
              image: 'https://via.placeholder.com/100x100'
            }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'shipped': return 'blue';
      case 'processing': return 'orange';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  if (!isAuthenticated) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="auth-required">
            <h2>Sign in to view your orders</h2>
            <Link to="/login" className="sign-in-btn">Sign In</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <h1>Your Orders</h1>
          <div className="order-filters">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All Orders
            </button>
            <button 
              className={filter === 'processing' ? 'active' : ''}
              onClick={() => setFilter('processing')}
            >
              Processing
            </button>
            <button 
              className={filter === 'shipped' ? 'active' : ''}
              onClick={() => setFilter('shipped')}
            >
              Shipped
            </button>
            <button 
              className={filter === 'delivered' ? 'active' : ''}
              onClick={() => setFilter('delivered')}
            >
              Delivered
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading your orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="no-orders">
            <h3>No orders found</h3>
            <p>You haven't placed any orders yet.</p>
            <Link to="/products" className="shop-now-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.orderNumber}</h3>
                    <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="order-status">
                    <span 
                      className={`status-badge ${getStatusColor(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="order-total">
                    <strong>₹{order.total.toFixed(2)}</strong>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>₹{item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-actions">
                  <button className="track-order-btn">Track Package</button>
                  <button className="view-details-btn">View Order Details</button>
                  {order.status === 'delivered' && (
                    <button className="buy-again-btn">Buy it again</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;