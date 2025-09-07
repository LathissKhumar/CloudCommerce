const mongoose = require('mongoose');
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cloudcommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample products with proper e-commerce data
const sampleProducts = [
  {
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.5,
    reviews: 342,
    inStock: true,
    stockCount: 25
  },
  {
    name: "Smartphone Pro Max 256GB",
    price: 999.99,
    originalPrice: 1099.99,
    description: "Latest smartphone with advanced camera system, 256GB storage, and all-day battery life.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.8,
    reviews: 1205,
    inStock: true,
    stockCount: 15
  },
  {
    name: "Gaming Mechanical Keyboard",
    price: 129.99,
    description: "RGB backlit mechanical keyboard with cherry MX switches, perfect for gaming and typing.",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
    category: "Gaming",
    rating: 4.3,
    reviews: 89,
    inStock: true,
    stockCount: 40
  },
  {
    name: "4K Webcam for Streaming",
    price: 89.99,
    originalPrice: 119.99,
    description: "Professional 4K webcam with auto-focus and built-in microphone for streaming and video calls.",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.2,
    reviews: 156,
    inStock: true,
    stockCount: 30
  },
  {
    name: "Ergonomic Office Chair",
    price: 299.99,
    originalPrice: 399.99,
    description: "Premium ergonomic office chair with lumbar support and adjustable height. Perfect for long work sessions.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    category: "Furniture",
    rating: 4.6,
    reviews: 234,
    inStock: true,
    stockCount: 12
  },
  {
    name: "Wireless Charging Pad",
    price: 39.99,
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design fits any desk.",
    image: "https://images.unsplash.com/photo-1609592913837-d23c0c76e8a8?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.1,
    reviews: 78,
    inStock: true,
    stockCount: 55
  },
  {
    name: "Bluetooth Sports Earbuds",
    price: 79.99,
    originalPrice: 99.99,
    description: "Waterproof Bluetooth earbuds with secure fit and premium sound quality for workouts.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.4,
    reviews: 267,
    inStock: true,
    stockCount: 35
  },
  {
    name: "Smart Watch Series 5",
    price: 349.99,
    originalPrice: 399.99,
    description: "Advanced smartwatch with health monitoring, GPS, and 2-day battery life.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.7,
    reviews: 892,
    inStock: true,
    stockCount: 20
  }
];

async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully!');
    
    // Display added products
    const products = await Product.find({});
    console.log(`Total products: ${products.length}`);
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.disconnect();
  }
}

seedProducts();
