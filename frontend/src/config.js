// API Configuration
// This file centralizes the API URL configuration for the frontend
// In production, set REACT_APP_API_URL environment variable in Vercel

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default API_BASE_URL;
