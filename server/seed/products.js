const products = [
    // Untuk Kulit Berminyak (Oily)
    {
      name: "Effaclar Medicated Gel Cleanser",
      brand: "La Roche-Posay",
      category: "cleanser",
      skinType: ["oily"],
      price: 250000,
      description: "Pembersih wajah dengan Salicylic Acid untuk kulit berminyak",
      imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw1480dc13/img/883140040231/883140040231_Effaclar-medicated-cleanser_1500x1500.jpg?sw=930&sh=930&sm=cut&sfrm=jpg&q=70",
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
      imageUrl: "https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dw8b57fa2b/Images/products/The%20Ordinary/ord-glyc-acid-7pct-100ml-Aug-UPC.png?sw=1200&sh=1200&sm=fit",
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
      imageUrl: "https://www.cerave.co.id/-/media/project/loreal/brand-sites/cerave/americas/id/scx/product/pdp/packshots/hydrating-cleanser/hydrating-cleanser-473ml-lg.jpg?rev=-1?w=500&hash=F8EFBEFBD21ECBAFBB90DD491B16B130",
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
      imageUrl: "https://www.cetaphil.co.id/dw/image/v2/BGGN_PRD/on/demandware.static/-/Sites-galderma-id-m-catalog/default/dw2b8c22aa/Gentle_Skin_Cleanser/Cetaphil_GSC_500mL%20Desktop.png?sw=900&sh=900&sm=fit&q=85",
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
      imageUrl: "https://www.paulaschoice.com/dw/image/v2/BBNX_PRD/on/demandware.static/-/Sites-pc-catalog/default/dwb26e4255/images/products/skin-balancing-pore-reducing-toner-1350-L_new.png?sw=360&sfrm=png",
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
      imageUrl: "https://s3.ap-southeast-1.amazonaws.com/assets.femaledaily.com/remastering-data/production/product/product-1712587810320-simple-refreshing-facial-wash-gel",
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
      imageUrl: "https://www.cetaphil.co.id/dw/image/v2/BGGN_PRD/on/demandware.static/-/Sites-galderma-id-m-catalog/default/dw05921f4e/Cetaphil_Daily_Facial_Moisturizer_SPF15/PA/Cetaphil%20Daily%20Facial%20Moisturizer%20SPF%2015_PA%20++.png?sw=900&sh=900&sm=fit&q=85",
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
      imageUrl: "https://www.aveneusa.com/media/catalog/product/t/o/tolerance_extremely_gentle_cleanser_200ml_011_clipped.png?quality=100&fit=bounds&height=1000&width=1000&canvas=1000:1000&dpr=2%202x",
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
      imageUrl: "https://www.firstaidbeauty.com/cdn/shop/files/UltraRepairFaceMoisturizer.jpg?v=1717168349&width=1426",
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
      imageUrl: "https://image.femaledaily.com/dyn/210/images/prod-pics/product_1579170847_Klairs_Sup_800x800.jpg",
      ingredients: ["Centella Asiatica", "Panthenol"],
      rating: 4.5
    }
  ];