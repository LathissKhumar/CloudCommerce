# CloudCommerce Frontend - Amazon-like E-commerce

A modern, responsive e-commerce frontend built with React, featuring an Amazon-inspired design and user experience.

## Features

### 🛍️ Core E-commerce Features
- **Product Catalog**: Browse products with filtering, sorting, and search
- **Product Details**: Detailed product pages with images, reviews, and specifications
- **Shopping Cart**: Add/remove items, update quantities, persistent cart storage
- **User Authentication**: Login, register, and profile management
- **Order Management**: View order history and track orders
- **Wishlist**: Save products for later purchase

### 🎨 Amazon-like Design
- **Navigation**: Multi-level navigation with search bar and category links
- **Homepage**: Hero carousel, featured products, and category sections
- **Product Grid**: Clean product cards with ratings, pricing, and quick actions
- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations

### 🔧 Technical Features
- **React Router**: Client-side routing for seamless navigation
- **Context API**: State management for cart and authentication
- **Local Storage**: Persistent cart and user preferences
- **Axios**: HTTP client for API communication
- **Modern CSS**: Custom styling with Amazon-inspired color scheme

## Pages

### Customer Pages
- **Home** (`/`) - Hero section, categories, featured products
- **Products** (`/products`) - Product listing with filters and search
- **Product Detail** (`/product/:id`) - Individual product page
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Order placement and payment
- **Search** (`/search`) - Search results page
- **Category** (`/category/:category`) - Category-specific products
- **Login/Register** (`/login`, `/register`) - User authentication
- **Profile** (`/profile`) - User account management
- **Orders** (`/orders`) - Order history
- **Wishlist** (`/wishlist`) - Saved products

### Admin Pages (Existing)
- **Admin Dashboard** (`/admin`) - Admin overview
- **Add Product** (`/admin/add-product`) - Product creation
- **Edit Product** (`/admin/edit-product/:id`) - Product editing
- **Order Management** (`/admin/orders`) - Order administration

## Components

### Layout Components
- **Navbar** - Amazon-style navigation with search and user menu
- **Footer** - Multi-column footer with links and company info

### Context Providers
- **AuthContext** - User authentication and profile management
- **CartContext** - Shopping cart state and operations

## Styling

The application uses a custom CSS design system inspired by Amazon's visual language:

### Color Palette
- **Primary**: `#131921` (Amazon Navy)
- **Secondary**: `#ff9900` (Amazon Orange)
- **Background**: `#eaeded` (Light Gray)
- **Text**: `#0f1111` (Near Black)
- **Links**: `#007185` (Amazon Blue)

### Typography
- **Font Family**: "Amazon Ember", Arial, sans-serif
- **Responsive**: Scales appropriately across devices

### Layout
- **Container**: Max-width 1500px with responsive padding
- **Grid System**: CSS Grid for product layouts
- **Flexbox**: For navigation and component alignment

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## API Integration

The frontend expects a REST API with the following endpoints:

- `GET /api/products` - Product listing with query parameters
- `GET /api/products/:id` - Individual product details
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/orders` - User orders
- `POST /api/orders` - Create new order

## Environment Setup

Add a proxy to your `package.json` for local development:

```json
{
  "proxy": "http://localhost:5000"
}
```

This assumes your backend API runs on port 5000.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy Loading**: Images load as needed
- **Local Storage**: Cart persistence across sessions
- **Responsive Images**: Optimized for different screen sizes
- **CSS Optimization**: Minimal, efficient styling

## Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG compliant color combinations

## Future Enhancements

- [ ] Product image zoom and gallery
- [ ] Advanced filtering (price range, ratings, etc.)
- [ ] Product recommendations
- [ ] Live chat support
- [ ] Progressive Web App (PWA) features
- [ ] Internationalization (i18n)
- [ ] Dark mode support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.