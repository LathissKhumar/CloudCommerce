import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Search from './pages/Search';
import Category from './pages/Category';
import Wishlist from './pages/Wishlist';

// Admin Components (keeping existing admin functionality)
import AdminDashboard from './components/AdminDashboard';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import EditOrder from './components/EditOrder';
import OrderList from './components/OrderList';
import NotFound from './components/NotFound';

import './index.css';

function EditProductWrapper() {
  const { id } = useParams();
  return <EditProduct productId={id} />;
}

function EditOrderWrapper() {
  const { id } = useParams();
  return <EditOrder orderId={id} />;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/category/:category" element={<Category />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/add-product" element={<AddProduct />} />
                <Route path="/admin/orders" element={<OrderList />} />
                <Route path="/admin/edit-product/:id" element={<EditProductWrapper />} />
                <Route path="/admin/edit-order/:id" element={<EditOrderWrapper />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
