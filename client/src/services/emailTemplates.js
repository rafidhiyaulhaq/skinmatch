export const generateQuizResultEmail = (username, skinType, recommendations) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header { 
            background: #4F46E5; 
            color: white;
            padding: 20px;
            text-align: center;
          }
          .content { 
            padding: 20px;
            background: #ffffff;
          }
          .product { 
            margin: 20px 0; 
            padding: 15px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background: #f8fafc;
          }
          .tips { 
            background: #f1f5f9;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background: #4F46E5;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            color: #64748b;
            font-size: 0.875rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
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
                ${getTipsForSkinType(skinType).map(tip => `<li>${tip}</li>`).join('')}
              </ul>
            </div>
            
            <p>
              <a href="https://skinmatch-five.vercel.app" class="button">
                Kunjungi SkinMatch
              </a>
            </p>
          </div>
  
          <div class="footer">
            <p>Email ini dikirim oleh SkinMatch - Solusi Analisis Kulit Anda</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  const getTipsForSkinType = (skinType) => {
    const tips = {
      oily: [
        "Gunakan pembersih wajah berbasis water-based",
        "Pilih moisturizer yang oil-free",
        "Jangan skip moisturizer",
        "Gunakan sunscreen yang ringan"
      ],
      dry: [
        "Gunakan pembersih wajah yang lembut dan non-foaming",
        "Pakai moisturizer yang lebih kaya",
        "Hindari air panas saat mencuci muka",
        "Tambahkan serum hyaluronic acid"
      ],
      combination: [
        "Gunakan produk berbeda untuk area berbeda",
        "Pilih gel moisturizer ringan",
        "Fokus toner pada T-zone",
        "Seimbangkan penggunaan produk"
      ],
      sensitive: [
        "Pilih produk bebas parfum",
        "Lakukan patch test untuk produk baru",
        "Hindari bahan yang terlalu aktif",
        "Gunakan sunscreen mineral"
      ],
      normal: [
        "Jaga rutinitas skincare konsisten",
        "Gunakan sunscreen setiap hari",
        "Perhatikan perubahan kondisi kulit",
        "Pilih produk sesuai kebutuhan"
      ]
    };
    
    return tips[skinType] || [];
  };