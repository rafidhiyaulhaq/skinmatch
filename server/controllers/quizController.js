const QuizResult = require('../models/Quiz');
const Product = require('../models/Product');

exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.userId;

    let skinType = 'normal';
    if (answers.oiliness === 'very_oily') skinType = 'oily';
    else if (answers.dryness === 'very_dry') skinType = 'dry';
    else if (answers.combination === 'yes') skinType = 'combination';
    else if (answers.sensitivity === 'high') skinType = 'sensitive';

    const quizResult = new QuizResult({
      userId,
      skinType,
      answers
    });

    await quizResult.save();

    const recommendations = await Product.find({ skinType: skinType })
      .limit(3);

    res.json({
      skinType,
      recommendations
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};