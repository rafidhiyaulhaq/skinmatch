const express = require('express');
const router = express.Router();
const { 
  getRecommendations, 
  getProducts 
} = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/recommendations', auth, getRecommendations);
router.get('/', getProducts);

module.exports = router;