const products = [
    // Untuk Kulit Berminyak (Oily)
    {
      name: "Effaclar Medicated Gel Cleanser",
      brand: "La Roche-Posay",
      category: "cleanser",
      skinType: ["oily"],
      price: 250000,
      description: "Pembersih wajah dengan Salicylic Acid untuk kulit berminyak",
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
      ingredients: ["Thermal Spring Water", "Glycerin"],
      rating: 4.6
    },
    {
      name: "Calm Moisturizer",
      brand: "First Aid Beauty",
      category: "moisturizer",
      skinType: ["sensitive"],
      price: 300000,
      description: "Pelembap menenangkan untuk kulit sensitif",
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
      ingredients: ["Centella Asiatica", "Panthenol"],
      rating: 4.5
    }
  ];