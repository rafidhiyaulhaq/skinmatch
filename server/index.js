const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const seedProducts = require('./seed/products');

const app = express();
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/Product');

// CORS setup
app.use(cors({
  origin: ['https://skinmatch-five.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: true
}));

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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Routes dengan error handling
app.use('/api/auth', (req, res, next) => {
  console.log(`Auth Request: ${req.method} ${req.path}`);
  next();
}, require('./routes/authRoutes'));

app.use('/api/quiz', (req, res, next) => {
  console.log(`Quiz Request: ${req.method} ${req.path}`);
  next();
}, require('./routes/quizRoutes'));

app.use('/api/products', (req, res, next) => {
  console.log(`Products Request: ${req.method} ${req.path}`);
  next();
}, productRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
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