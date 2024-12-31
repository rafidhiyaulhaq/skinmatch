const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const seedProducts = require('./seed/products');

const app = express();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); 
const quizRoutes = require('./routes/quizRoutes');
const Product = require('./models/Product');

// CORS setup
app.use(cors({
  origin: ['https://skinmatch-five.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database and Seed
connectDB()
  .then(async () => {
    console.log('MongoDB Connected...');
    try {
      await seedProducts(Product);
    } catch (error) {
      console.error('Seeding error:', error);
    }
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to SkinMatch API',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: ['/api/auth/register', '/api/auth/login'],
      quiz: ['/api/quiz/submit', '/api/quiz/history'],
      products: ['/api/products/recommendations', '/api/products']
    }
  });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/products', productRoutes);

// Error handling untuk route yang tidak ditemukan
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Global error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('- /api/auth/register');
  console.log('- /api/auth/login');
  console.log('- /api/quiz/submit');
  console.log('- /api/quiz/history');
  console.log('- /api/products/recommendations');
  console.log('- /api/products');
});