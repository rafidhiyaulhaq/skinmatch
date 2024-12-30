import { useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const { skinType, recommendations } = location.state || {};

  // Deskripsi untuk setiap tipe kulit
  const skinTypeDescriptions = {
    oily: "Kulit berminyak ditandai dengan produksi sebum berlebih. Perlu perawatan yang mengontrol minyak tanpa membuat kulit kering.",
    dry: "Kulit kering membutuhkan lebih banyak kelembaban. Fokus pada produk yang menghidrasi dan melindungi barrier kulit.",
    combination: "Kulit kombinasi memiliki area yang berminyak (T-zone) dan area yang kering. Butuh perawatan yang seimbang.",
    sensitive: "Kulit sensitif mudah bereaksi. Gunakan produk lembut dan hindari bahan yang terlalu keras.",
    normal: "Kulit normal cenderung seimbang. Fokus pada menjaga kesehatan kulit dan pencegahan masalah kulit.",
  };

  const tips = {
    oily: [
      "Gunakan cleanser berbasis water-based",
      "Pilih moisturizer yang oil-free",
      "Jangan skip moisturizer",
      "Gunakan sunscreen yang ringan"
    ],
    dry: [
      "Gunakan cleanser yang lembut dan non-foaming",
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Hasil Analisis Kulit Anda</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            Tipe Kulit: {skinType?.charAt(0).toUpperCase() + skinType?.slice(1)}
          </h2>
          <p className="text-gray-600 mb-4">{skinTypeDescriptions[skinType]}</p>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Tips Perawatan:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {tips[skinType]?.map((tip, index) => (
                <li key={index} className="text-gray-700">{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Rekomendasi Produk</h2>
          {recommendations?.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((product) => (
                <div key={product._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-all">
                  {product.imageUrl && (
                    <div className="relative w-full pt-[100%]">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                    <p className="text-sm text-gray-700 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-blue-600 font-semibold">
                        Rp {product.price?.toLocaleString()}
                      </p>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    {product.ingredients && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Key Ingredients:</span>{' '}
                          {product.ingredients.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              Belum ada rekomendasi produk untuk tipe kulit Anda.
            </p>
          )}
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => window.print()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cetak Hasil
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;