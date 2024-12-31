const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const seedProducts = require('./seed/products');
const fetch = require('node-fetch');

const app = express();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); 
const quizRoutes = require('./routes/quizRoutes');
const Product = require('./models/Product');

// Middleware
app.use(cors({
  origin: ['https://skinmatch-five.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
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

// Documentation route
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'docs.html'));
});

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to SkinMatch API',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: [
        '/api/auth/register',
        '/api/auth/login',
        '/api/auth/profile', // GET method
        '/api/auth/profile'  // PUT method
      ],
      quiz: [
        '/api/quiz/submit',
        '/api/quiz/history'
      ],
      products: [
        '/api/products/recommendations',
        '/api/products'
      ]
    }
  });
});

// API Test Routes
app.post('/api-test/register', async (req, res) => {
  try {
    const response = await fetch(`${req.protocol}://${req.get('host')}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api-test/login', async (req, res) => {
  try {
    const response = await fetch(`${req.protocol}://${req.get('host')}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api-test/profile', async (req, res) => {
  try {
    const response = await fetch(`${req.protocol}://${req.get('host')}/api/auth/profile`, {
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api-test/quiz', async (req, res) => {
  try {
    const response = await fetch(`${req.protocol}://${req.get('host')}/api/quiz/submit`, {
      method: 'POST',
      headers: { 
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api-test/quiz/history', async (req, res) => {
  try {
    const response = await fetch(`${req.protocol}://${req.get('host')}/api/quiz/history`, {
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api-test/products/recommendations', async (req, res) => {
  try {
    const response = await fetch(`${req.protocol}://${req.get('host')}/api/products/recommendations${req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : ''}`, {
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api-test/products', async (req, res) => {
  try {
    let url = `${req.protocol}://${req.get('host')}/api/products`;
    if (Object.keys(req.query).length > 0) {
      url += '?' + new URLSearchParams(req.query).toString();
    }
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Main API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/products', productRoutes);

// Error Handling Routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

// Server Start
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