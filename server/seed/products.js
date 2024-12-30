const products = [
    {
      name: "Gentle Foam Cleanser",
      brand: "SkinMatch",
      category: "cleanser",
      skinType: ["normal", "sensitive"],
      price: 150000,
      description: "Pembersih wajah lembut untuk kulit normal dan sensitif",
      ingredients: ["Glycerin", "Panthenol", "Centella Asiatica"],
      rating: 4.5
    },
    {
      name: "Oil Control Cleanser",
      brand: "SkinMatch",
      category: "cleanser",
      skinType: ["oily", "combination"],
      price: 180000,
      description: "Pembersih wajah khusus untuk kulit berminyak",
      ingredients: ["Salicylic Acid", "Tea Tree Oil", "Niacinamide"],
      rating: 4.3
    },
    {
      name: "Hydrating Moisturizer",
      brand: "SkinMatch",
      category: "moisturizer",
      skinType: ["dry", "normal"],
      price: 200000,
      description: "Pelembap intensif untuk kulit kering",
      ingredients: ["Hyaluronic Acid", "Ceramide", "Shea Butter"],
      rating: 4.7
    },
    {
      name: "Light Moisturizer",
      brand: "SkinMatch",
      category: "moisturizer",
      skinType: ["oily", "combination"],
      price: 190000,
      description: "Pelembap ringan untuk kulit berminyak",
      ingredients: ["Aloe Vera", "Niacinamide", "Green Tea"],
      rating: 4.4
    },
    {
      name: "Calming Toner",
      brand: "SkinMatch",
      category: "toner",
      skinType: ["sensitive", "normal"],
      price: 160000,
      description: "Toner menenangkan untuk kulit sensitif",
      ingredients: ["Centella Asiatica", "Panthenol", "Allantoin"],
      rating: 4.6
    }
  ];
  
  const seedProducts = async (Product) => {
    try {
      // Hapus semua produk yang ada
      await Product.deleteMany({});
      
      // Insert produk baru
      await Product.insertMany(products);
      
      console.log('Products seeded successfully');
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  };
  
  module.exports = { products, seedProducts };