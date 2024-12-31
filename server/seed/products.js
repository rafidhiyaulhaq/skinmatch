const products = [
    // Untuk Kulit Berminyak (Oily)
    {
      name: "Effaclar Medicated Gel Cleanser",
      brand: "La Roche-Posay",
      category: "cleanser",
      skinType: ["oily"],
      price: 250000,
      description: "Pembersih wajah dengan Salicylic Acid untuk kulit berminyak",
      imageUrl: "https://m.media-amazon.com/images/I/31blEnDdwIL._SY445_SX342_QL70_FMwebp_.jpg",
      ingredients: ["Salicylic Acid", "Zinc", "Glycerin"],
      rating: 4.3
    },
    {
      name: "Oil-Free Moisturizer",
      brand: "Neutrogena",
      category: "moisturizer",
      skinType: ["oily"],
      price: 150000,
      description: "Pelembap ringan bebas minyak untuk kulit berminyak",
      imageUrl: "https://image.femaledaily.com/dyn/210/images/prod-pics/1477923260_lg.jpg",
      ingredients: ["Glycerin", "Aloe Vera"],
      rating: 4.4
    },
    {
      name: "Oil Control Toner",
      brand: "The Ordinary",
      category: "toner",
      skinType: ["oily"],
      price: 180000,
      description: "Toner dengan Niacinamide untuk mengontrol minyak",
      imageUrl: "https://id.ozcosmetics.com/prodimgs/202208/278438.jpg",
      ingredients: ["Niacinamide", "Zinc PCA"],
      rating: 4.5
    },
  
    // Untuk Kulit Kering (Dry)
    {
      name: "Hydrating Cleanser",
      brand: "CeraVe",
      category: "cleanser",
      skinType: ["dry"],
      price: 200000,
      description: "Pembersih wajah lembut dengan ceramide",
      imageUrl: "https://static.beautytocare.com/cdn-cgi/image/f=auto/media/catalog/product/c/e/cerave-hydrating-cleanser-normal-to-dry-skin-236ml_1.jpg",
      ingredients: ["Ceramides", "Hyaluronic Acid"],
      rating: 4.6
    },
    {
      name: "Rich Moisturizing Cream",
      brand: "La Roche-Posay",
      category: "moisturizer",
      skinType: ["dry"],
      price: 280000,
      description: "Krim pelembap kaya untuk kulit kering",
      imageUrl: "https://id.ozcosmetics.com/prodimgs/202106/192844.jpg",
      ingredients: ["Shea Butter", "Glycerin"],
      rating: 4.7
    },
    {
      name: "Hydrating Toner",
      brand: "Laneige",
      category: "toner",
      skinType: ["dry"],
      price: 250000,
      description: "Toner melembapkan untuk kulit kering",
      imageUrl: "https://www.laneige.com/id/id/product/__icsFiles/afieldfile/2024/06/12/20230530_HK_Water_Bank_Blue_Hyaluronic_Essence_Toner_for_Dry_skin_thumbnail_01.png",
      ingredients: ["Hyaluronic Acid", "Beta-Glucan"],
      rating: 4.5
    },
  
    // Untuk Kulit Kombinasi (Combination)
    {
      name: "Gentle Foaming Cleanser",
      brand: "Cetaphil",
      category: "cleanser",
      skinType: ["combination"],
      price: 180000,
      description: "Pembersih wajah seimbang untuk kulit kombinasi",
      imageUrl: "https://images-cdn.ubuy.co.id/6640d1b2d14b8e6e486d70c1-cetaphil-gentle-foaming-cleanser-face.jpg",
      ingredients: ["Glycerin", "Panthenol"],
      rating: 4.4
    },
    {
      name: "Balancing Moisturizer",
      brand: "Clinique",
      category: "moisturizer",
      skinType: ["combination"],
      price: 350000,
      description: "Pelembap menyeimbangkan untuk kulit kombinasi",
      imageUrl: "https://image-optimizer-id.production.sephora-asia.net/images/product_images/closeup_1000x1000_11__fb82f6a7e72c3059b8b2397533b3bbb25f59914a_1664951873.png",
      ingredients: ["Hyaluronic Acid", "Aloe Vera"],
      rating: 4.5
    },
    {
      name: "Balancing Toner",
      brand: "Paula's Choice",
      category: "toner",
      skinType: ["combination"],
      price: 280000,
      description: "Toner menyeimbangkan untuk kulit kombinasi",
      imageUrl: "https://m.media-amazon.com/images/I/81uabH+wkpL._AC_UF1000,1000_QL80_.jpg",
      ingredients: ["Niacinamide", "Green Tea"],
      rating: 4.6
    },
  
    // Untuk Kulit Normal
    {
      name: "Gentle Cleanser",
      brand: "Simple",
      category: "cleanser",
      skinType: ["normal"],
      price: 120000,
      description: "Pembersih wajah lembut untuk kulit normal",
      imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/51lV2Pem64L._AC_UL210_SR210,210_.jpg",
      ingredients: ["Chamomile", "Vitamin B5"],
      rating: 4.3
    },
    {
      name: "Daily Moisturizer",
      brand: "Cetaphil",
      category: "moisturizer",
      skinType: ["normal"],
      price: 200000,
      description: "Pelembap sehari-hari untuk kulit normal",
      imageUrl: "https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/Cetaphil_Daily_Facial_Moisturizer_SPF15_PA%2B%2B_118ml_%281%29.png",
      ingredients: ["Glycerin", "Vitamin E"],
      rating: 4.4
    },
    {
      name: "Hydrating Toner",
      brand: "Hada Labo",
      category: "toner",
      skinType: ["normal"],
      price: 150000,
      description: "Toner ringan untuk kulit normal",
      imageUrl: "https://rohto.co.id/assets/uploads/product/20201110150118.png",
      ingredients: ["Hyaluronic Acid", "Glycerin"],
      rating: 4.5
    },
  
    // Untuk Kulit Sensitif
    {
      name: "Ultra Gentle Cleanser",
      brand: "Avene",
      category: "cleanser",
      skinType: ["sensitive"],
      price: 220000,
      description: "Pembersih wajah sangat lembut untuk kulit sensitif",
      imageUrl: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/39b09da0-fed1-4eb5-80fa-c03b0cddad88.__CR0,0,800,600_PT0_SX800_V1___.png",
      ingredients: ["Thermal Spring Water", "Glycerin"],
      rating: 4.6
    },
    {
      name: "Ultra Repair Face Moisturizer",
      brand: "First Aid Beauty",
      category: "moisturizer",
      skinType: ["sensitive"],
      price: 300000,
      description: "Pelembap menenangkan untuk kulit sensitif",
      imageUrl: "https://m.media-amazon.com/images/I/61BSynl2O2L.jpg",
      ingredients: ["Colloidal Oatmeal", "Allantoin"],
      rating: 4.7
    },
    {
      name: "Calming Toner",
      brand: "Klairs",
      category: "toner",
      skinType: ["sensitive"],
      price: 200000,
      description: "Toner menenangkan untuk kulit sensitif",
      imageUrl: "https://m.media-amazon.com/images/I/61K2fOs4y-S._AC_UF1000,1000_QL80_.jpg",
      ingredients: ["Centella Asiatica", "Panthenol"],
      rating: 4.5
    }
  ];



async function seedProducts(Product) {
  try {
    // Hapus data lama
    await Product.deleteMany({});
    
    // Insert data baru
    await Product.insertMany(products);
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

module.exports = seedProducts;