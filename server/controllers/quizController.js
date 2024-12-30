const QuizResult = require('../models/Quiz');
const Product = require('../models/Product');

const determineSkinType = (answers) => {
  // Menganalisis jawaban untuk menentukan skin type
  const {oiliness, dryness, sensitivity, pores, acne} = answers;
  
  // Logic untuk menentukan skin type
  if (oiliness === 'very_oily' && pores === 'large_visible') {
    return 'oily';
  }
  if (dryness === 'very_dry' && sensitivity === 'very_sensitive') {
    return 'sensitive';
  }
  if (dryness === 'very_dry' || dryness === 'somewhat_dry') {
    return 'dry';
  }
  if (oiliness === 'oily_tzone' && dryness === 'somewhat_dry') {
    return 'combination';
  }
  
  return 'normal';
};

exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.userId;

    // Determine skin type based on answers
    const skinType = determineSkinType(answers);

    // Save quiz result
    const quizResult = new QuizResult({
      userId,
      skinType,
      answers
    });

    await quizResult.save();

    // Get product recommendations
    const recommendations = await Product.find({ skinType })
      .limit(3);

    res.json({
      skinType,
      recommendations,
      message: 'Quiz completed successfully'
    });

  } catch (err) {
    console.error('Quiz submission error:', err);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat memproses hasil quiz'
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(5);  // Batasi 5 hasil terakhir
    res.json(results);
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil riwayat' 
    });
  }
};