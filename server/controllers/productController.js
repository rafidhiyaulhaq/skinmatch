const Product = require('../models/Product');

exports.getRecommendations = async (req, res) => {
  try {
    const { skinType } = req.query;
    const isPremium = req.user?.isPremium || false;

    let products = await Product.find({ skinType: skinType })
                               .sort({ rating: -1 });

    if (!isPremium) {
      products = products.slice(0, 3);
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice } = req.query;
    
    let query = {};
    
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};