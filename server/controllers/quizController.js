const QuizResult = require('../models/Quiz');
const Product = require('../models/Product');
const User = require('../models/User');
const axios = require('axios');

const FINTRACKIT_API = 'https://api.fintrackit.my.id/v1';
const API_KEY = process.env.VITE_FINTRACKIT_API_KEY;

let accessToken = null;
let tokenExpiry = null;

const getAccessToken = async () => {
  if (accessToken && tokenExpiry && tokenExpiry > Date.now() + 300000) {
    return accessToken;
  }

  try {
    const response = await axios.post(`${FINTRACKIT_API}/auth/token`, null, {
      headers: {
        'X-API-Key': API_KEY
      }
    });

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 300000;
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

const sendEmail = async (recipientEmail, subject, body) => {
  try {
    const token = await getAccessToken();
    const response = await axios.post(
      `${FINTRACKIT_API}/secure/send-email`,
      {
        recipient_email: recipientEmail,
        subject,
        body
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      accessToken = null;
      tokenExpiry = null;
      try {
        const token = await getAccessToken();
        const response = await axios.post(
          `${FINTRACKIT_API}/secure/send-email`,
          {
            recipient_email: recipientEmail,
            subject,
            body
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data;
      } catch (retryError) {
        throw retryError;
      }
    }
    throw error;
  }
};

const generateEmailTemplate = (username, skinType, recommendations) => {
  const tips = getTipsForSkinType(skinType);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .product { margin: 20px 0; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; }
        .tips { background: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Hasil Analisis SkinMatch</h1>
      </div>
      
      <div class="content">
        <p>Halo ${username}!</p>
        
        <h2>Analisis Tipe Kulit Anda</h2>
        <p>Berdasarkan jawaban quiz Anda, tipe kulit Anda adalah: <strong>${skinType}</strong></p>
        
        <h2>Produk yang Direkomendasikan</h2>
        ${recommendations.map(product => `
          <div class="product">
            <h3>${product.name}</h3>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p>${product.description}</p>
            <p><strong>Kandungan Utama:</strong> ${product.ingredients.join(', ')}</p>
            <p><strong>Harga:</strong> Rp ${product.price.toLocaleString()}</p>
          </div>
        `).join('')}
        
        <div class="tips">
          <h2>Tips Perawatan untuk Tipe Kulit Anda</h2>
          <ul>
            ${tips.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        </div>
      </div>
    </body>
    </html>
  `;
};

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

const getTipsForSkinType = (skinType) => {
  const tips = {
    oily: [
      "Gunakan pembersih wajah khusus kulit berminyak",
      "Pilih moisturizer berbasis gel",
      "Gunakan toner dengan kandungan BHA",
      "Gunakan sunscreen yang oil-free"
    ],
    dry: [
      "Gunakan pembersih wajah yang lembut",
      "Aplikasikan pelembap yang kaya",
      "Hindari produk dengan alkohol",
      "Tambahkan serum hyaluronic acid"
    ],
    combination: [
      "Gunakan produk berbeda untuk area berbeda",
      "Pilih pelembap ringan",
      "Fokus pembersihan pada T-zone",
      "Seimbangkan penggunaan produk"
    ],
    sensitive: [
      "Pilih produk hypoallergenic",
      "Hindari produk dengan pewangi",
      "Lakukan patch test",
      "Gunakan sunscreen mineral"
    ],
    normal: [
      "Pertahankan rutinitas skincare",
      "Gunakan sunscreen setiap hari",
      "Pilih produk sesuai kebutuhan",
      "Jaga konsistensi perawatan"
    ]
  };
  
  return tips[skinType] || [];
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

    const user = await User.findById(userId);
    console.log('Found user:', user.email);

    const recommendations = await Product.find({
      skinType: skinType
    })
    .sort({ rating: -1 })
    .limit(3);

    console.log('Found recommendations:', recommendations.length);

    try {
      const emailHtml = generateEmailTemplate(user.username, skinType, recommendations);
      await sendEmail(
        user.email,
        'Hasil Analisis Kulit SkinMatch Anda',
        emailHtml
      );
      console.log('Email sent successfully to:', user.email);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }

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