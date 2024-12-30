const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['cleanser', 'toner', 'moisturizer', 'sunscreen', 'serum']
  },
  skinType: [{
    type: String,
    enum: ['oily', 'dry', 'combination', 'normal', 'sensitive']
  }],
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  ingredients: [String],
  rating: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Product', productSchema);