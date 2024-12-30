const QuizResult = require('../models/Quiz');
const Product = require('../models/Product');

const determineSkinType = (answers) => {
  const {oiliness, dryness, sensitivity, pores, acne} = answers;
  
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

    const skinType = determineSkinType(answers);
    console.log('Determined skin type:', skinType);

    const quizResult = new QuizResult({
      userId,
      skinType,
      answers
    });

    await quizResult.save();
    console.log('Quiz result saved');

    // Debug products
    const allProducts = await Product.find();
    console.log('All products:', allProducts.length);

    // Get recommendations with debugging
    const recommendations = await Product.find({
      skinType: skinType
    })
    .sort({ rating: -1 })
    .limit(3);

    console.log('Found recommendations:', recommendations);

    res.json({
      skinType,
      recommendations,
      message: 'Quiz completed successfully',
      tips: getTipsForSkinType(skinType)
    });

  } catch (err) {
    console.error('Quiz submission error:', err);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat memproses hasil quiz'
    });
  }
};

const getTipsForSkinType = (skinType) => {
  const tips = {
    oily: [
      "Gunakan pembersih wajah khusus kulit berminyak",
      "Pilih moisturizer berbasis gel",
      "Gunakan toner dengan kandungan BHA"
    ],
    dry: [
      "Gunakan pembersih wajah yang lembut",
      "Aplikasikan pelembap yang kaya",
      "Hindari produk dengan alkohol"
    ],
    combination: [
      "Gunakan produk berbeda untuk area berbeda",
      "Pilih pelembap ringan",
      "Fokus pembersihan pada T-zone"
    ],
    sensitive: [
      "Pilih produk hypoallergenic",
      "Hindari produk dengan pewangi",
      "Lakukan patch test"
    ],
    normal: [
      "Pertahankan rutinitas skincare",
      "Gunakan sunscreen setiap hari",
      "Pilih produk sesuai kebutuhan"
    ]
  };
  
  return tips[skinType] || [];
};

exports.getHistory = async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(results);
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil riwayat' 
    });
  }
};