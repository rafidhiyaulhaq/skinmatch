const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const productRoutes = require('./routes/productRoutes');

// CORS setup
app.use(cors({
  origin: 'https://skinmatch-five.vercel.app',
  credentials: true
}));

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Welcome to SkinMatch API',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quiz', require('./routes/quizRoutes'));
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});