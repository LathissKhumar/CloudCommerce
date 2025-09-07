const mongoose = require('mongoose');
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cloudcommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample products with proper e-commerce data across all categories
const sampleProducts = [
  // Electronics
  {
    name: "Premium Wireless Headphones",
    price: 16999,
    originalPrice: 20999,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.5,
    reviewCount: 342,
    inStock: true,
    stock: 25
  },
  {
    name: "Smartphone Pro Max 256GB",
    price: 84999,
    originalPrice: 94999,
    description: "Latest smartphone with advanced camera system, 256GB storage, and all-day battery life.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.8,
    reviewCount: 1205,
    inStock: true,
    stock: 15
  },
  {
    name: "Gaming Mechanical Keyboard",
    price: 8999,
    description: "RGB backlit mechanical keyboard with cherry MX switches, perfect for gaming and typing.",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    stock: 40
  },

  // Clothing
  {
    name: "Classic Denim Jacket",
    price: 3999,
    originalPrice: 4999,
    description: "Timeless denim jacket made from premium cotton. Perfect for casual outings and layering.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
    category: "Clothing",
    rating: 4.4,
    reviewCount: 156,
    inStock: true,
    stock: 30
  },
  {
    name: "Comfortable Running Shoes",
    price: 7999,
    originalPrice: 9999,
    description: "Lightweight running shoes with advanced cushioning and breathable mesh upper.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    category: "Clothing",
    rating: 4.6,
    reviewCount: 245,
    inStock: true,
    stock: 45
  },
  {
    name: "Wool Blend Sweater",
    price: 3999,
    description: "Cozy wool blend sweater perfect for cold weather. Available in multiple colors.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
    category: "Clothing",
    rating: 4.2,
    reviewCount: 78,
    inStock: true,
    stock: 25
  },

  // Books
  {
    name: "The Art of Programming",
    price: 1999,
    originalPrice: 2499,
    description: "Comprehensive guide to modern programming techniques and best practices. Essential for developers.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
    category: "Books",
    rating: 4.7,
    reviewCount: 234,
    inStock: true,
    stock: 50
  },
  {
    name: "Mindfulness and Meditation",
    price: 1299,
    description: "A practical guide to mindfulness and meditation for daily stress relief and mental clarity.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    category: "Books",
    rating: 4.5,
    reviewCount: 189,
    inStock: true,
    stock: 35
  },
  {
    name: "Modern Cooking Techniques",
    price: 1899,
    originalPrice: 2299,
    description: "Master modern cooking with this comprehensive cookbook featuring 200+ recipes and techniques.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    category: "Books",
    rating: 4.3,
    reviewCount: 167,
    inStock: true,
    stock: 20
  },

  // Home & Garden
  {
    name: "Indoor Plant Collection (3 Plants)",
    price: 0,
    originalPrice: 95.00,
    description: "Beautiful collection of low-maintenance indoor plants perfect for home decoration and air purification.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    category: "Home & Garden",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stock: 15
  },
  {
    name: "Ergonomic Office Chair",
    price: 0,
    originalprice: 0,
    description: "Premium ergonomic office chair with lumbar support and adjustable height. Perfect for long work sessions.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    category: "Home & Garden",
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    stock: 12
  },
  {
    name: "LED Table Lamp",
    price: 0,
    description: "Modern LED table lamp with adjustable brightness and USB charging port.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
    category: "Home & Garden",
    rating: 4.4,
    reviewCount: 123,
    inStock: true,
    stock: 28
  },

  // Sports
  {
    name: "Professional Yoga Mat",
    price: 0,
    originalPrice: 65.00,
    description: "High-quality non-slip yoga mat with excellent cushioning. Perfect for yoga, pilates, and fitness.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    category: "Sports",
    rating: 4.5,
    reviewCount: 178,
    inStock: true,
    stock: 40
  },
  {
    name: "Resistance Band Set",
    price: 0,
    description: "Complete resistance band set with 5 different resistance levels and door anchor.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    category: "Sports",
    rating: 4.3,
    reviewCount: 145,
    inStock: true,
    stock: 55
  },
  {
    name: "Basketball Official Size",
    price: 0,
    originalprice: 0,
    description: "Official size basketball with superior grip and durability for indoor and outdoor play.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    category: "Sports",
    rating: 4.2,
    reviewCount: 92,
    inStock: true,
    stock: 22
  },

  // Beauty
  {
    name: "Organic Face Serum",
    price: 0,
    originalPrice: 110.00,
    description: "Premium organic face serum with vitamin C and hyaluronic acid for radiant, youthful skin.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    category: "Beauty",
    rating: 4.7,
    reviewCount: 267,
    inStock: true,
    stock: 18
  },
  {
    name: "Professional Makeup Brush Set",
    price: 0,
    description: "Complete 15-piece makeup brush set with synthetic bristles and elegant rose gold handles.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
    category: "Beauty",
    rating: 4.4,
    reviewCount: 189,
    inStock: true,
    stock: 25
  },
  {
    name: "Natural Hair Care Set",
    price: 0,
    originalPrice: 75.00,
    description: "Complete natural hair care set with shampoo, conditioner, and hair mask for all hair types.",
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=300&fit=crop",
    category: "Beauty",
    rating: 4.3,
    reviewCount: 134,
    inStock: true,
    stock: 30
  },

  // Automotive
  {
    name: "Car Phone Mount",
    price: 0,
    originalPrice: 35.00,
    description: "Universal car phone mount with 360-degree rotation and strong magnetic grip.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
    category: "Automotive",
    rating: 4.1,
    reviewCount: 89,
    inStock: true,
    stock: 60
  },
  {
    name: "Premium Car Wax",
    price: 0,
    description: "Professional-grade car wax for long-lasting shine and protection against elements.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
    category: "Automotive",
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    stock: 35
  },
  {
    name: "Tire Pressure Gauge",
    price: 0,
    description: "Digital tire pressure gauge with backlit display and automatic shut-off feature.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
    category: "Automotive",
    rating: 4.2,
    reviewCount: 67,
    inStock: true,
    stock: 45
  },

  // Toys
  {
    name: "Educational STEM Robot Kit",
    price: 0,
    originalprice: 0,
    description: "Build and program your own robot with this educational STEM kit. Perfect for kids 8-16 years old.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    category: "Toys",
    rating: 4.6,
    reviewCount: 145,
    inStock: true,
    stock: 20
  },
  {
    name: "Art & Craft Supplies Set",
    price: 0,
    description: "Complete art and craft supplies set with crayons, markers, colored pencils, and paper.",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    category: "Toys",
    rating: 4.3,
    reviewCount: 98,
    inStock: true,
    stock: 35
  },
  {
    name: "Wooden Puzzle Game",
    price: 0,
    originalprice: 0,
    description: "Challenging wooden puzzle game that promotes problem-solving and fine motor skills.",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    category: "Toys",
    rating: 4.4,
    reviewCount: 76,
    inStock: true,
    stock: 25
  }
];

async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products one by one to ensure SKU generation
    for (let i = 0; i < sampleProducts.length; i++) {
      const productData = {
        ...sampleProducts[i],
        sku: 'SKU-' + Date.now() + '-' + i + '-' + Math.random().toString(36).substr(2, 5).toUpperCase()
      };
      
      const product = new Product(productData);
      await product.save();
      console.log(`Added product: ${product.name}`);
    }
    
    // Display added products
    const products = await Product.find({});
    console.log(`\nTotal products added: ${products.length}`);
    console.log('Categories:');
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
      const count = products.filter(p => p.category === cat).length;
      console.log(`  ${cat}: ${count} products`);
    });
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.disconnect();
  }
}

seedProducts();
