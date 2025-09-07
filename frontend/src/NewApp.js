import EditProduct from './components/EditProduct';
import EditOrder from './components/EditOrder';
import AdminDashboard from './components/AdminDashboard';
import OrderList from './components/OrderList';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import React from 'react';
import EcommerceNavbar from './components/EcommerceNavbar';
import EcommerceHome from './components/EcommerceHome';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create Amazon-like theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#131921',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Amazon Ember", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
});

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <EcommerceNavbar />
        <Routes>
          <Route path="/" element={<EcommerceHome />} />
          <Route path="/products" element={<Container maxWidth="lg" sx={{ py: 3 }}><ProductList /></Container>} />
          <Route path="/add-product" element={<Container maxWidth="sm" sx={{ py: 3 }}><AddProduct /></Container>} />
          <Route path="/orders" element={<Container maxWidth="lg" sx={{ py: 3 }}><OrderList /></Container>} />
          <Route path="/admin" element={<Container maxWidth="md" sx={{ py: 3 }}><AdminDashboard /></Container>} />
          <Route path="/edit-product/:id" element={<Container maxWidth="sm" sx={{ py: 3 }}><EditProductWrapper /></Container>} />
          <Route path="/edit-order/:id" element={<Container maxWidth="sm" sx={{ py: 3 }}><EditOrderWrapper /></Container>} />
          <Route path="/login" element={<Container maxWidth="sm" sx={{ py: 3 }}><Login /></Container>} />
          <Route path="/register" element={<Container maxWidth="sm" sx={{ py: 3 }}><Register /></Container>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
