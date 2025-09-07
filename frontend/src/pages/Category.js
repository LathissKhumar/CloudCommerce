import React from 'react';
import Products from './Products';

function Category() {
  // This component can reuse the Products component with category filtering
  // The Products component will handle category filtering based on URL params
  
  return <Products />;
}

export default Category;