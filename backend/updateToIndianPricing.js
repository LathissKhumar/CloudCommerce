const mongoose = require('mongoose');
const Product = require('./models/Product');

// MongoDB Atlas connection string (replace with your connection string)
const MONGODB_URI = 'mongodb+srv://LathissKhumar:Mpkjmlkh@123@cluster0.m7yai8d.mongodb.net/cloudcommerce';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Updated Indian market products with rupee pricing
const indianProducts = [
  {
    name: "Premium Wireless Headphones",
    price: 12999,
    originalPrice: 16999,
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
    price: 79999,
    originalPrice: 89999,
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
    price: 8999,
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
    price: 6999,
    originalPrice: 8999,
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
    price: 19999,
    originalPrice: 24999,
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
    price: 2499,
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
    price: 4999,
    originalPrice: 6999,
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
    price: 24999,
    originalPrice: 29999,
    description: "Advanced smartwatch with health monitoring, GPS, and 2-day battery life.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.7,
    reviews: 892,
    inStock: true,
    stockCount: 20
  },
  {
    name: "Cotton Kurta Set",
    price: 1499,
    originalPrice: 1999,
    description: "Traditional cotton kurta set with comfortable fit. Perfect for festivals and casual wear.",
    image: "https://images.unsplash.com/photo-1583846999692-3d175ad0b68f?w=400&h=300&fit=crop",
    category: "Clothing",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    stockCount: 50
  },
  {
    name: "Basmati Rice 5kg",
    price: 699,
    description: "Premium long grain basmati rice, perfect for biryanis and pulavs.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    category: "Grocery",
    rating: 4.6,
    reviews: 890,
    inStock: true,
    stockCount: 200
  }
];

async function updateToIndianPricing() {
  try {
    console.log('🚀 Starting Indian pricing update...');
    
    // Clear existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`🗑️ Cleared ${deleteResult.deletedCount} existing products`);

    // Insert Indian market products
    const insertResult = await Product.insertMany(indianProducts);
    console.log(`✅ Added ${insertResult.length} products with Indian pricing!`);
    
    // Display added products with their Indian prices
    const products = await Product.find({});
    console.log(`\n📦 Total products in database: ${products.length}`);
    
    console.log('\n💰 Sample product pricing:');
    products.slice(0, 3).forEach(product => {
      console.log(`- ${product.name}: ₹${product.price}${product.originalPrice ? ` (was ₹${product.originalPrice})` : ''}`);
    });
    
    console.log('\n🎉 Database successfully updated with Indian rupee pricing!');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error updating to Indian pricing:', error);
    mongoose.disconnect();
  }
}

updateToIndianPricing();
