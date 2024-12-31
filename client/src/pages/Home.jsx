import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Temukan Perawatan Kulit yang Tepat untuk Anda
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Analisis tipe kulit Anda dan dapatkan rekomendasi produk yang sesuai dengan kebutuhan Anda
            </p>
            <Link
              to="/quiz"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Mulai Quiz
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-2xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">Quiz Sederhana</h3>
            <p className="text-gray-600">
              Jawab beberapa pertanyaan singkat tentang kondisi kulit Anda
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-2xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Analisis Akurat</h3>
            <p className="text-gray-600">
              Dapatkan analisis tipe kulit yang akurat berdasarkan jawaban Anda
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-2xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-2">Rekomendasi Personal</h3>
            <p className="text-gray-600">
              Terima rekomendasi produk yang sesuai dengan tipe kulit Anda
            </p>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Mengapa SkinMatch?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Analisis berdasarkan kondisi kulit Anda saat ini</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Rekomendasi dari brand-brand terpercaya</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Tips perawatan kulit yang personal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Solusi skincare yang tepat untuk setiap tipe kulit</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Mulai Perjalanan Skincare Anda</h3>
              <p className="text-gray-600">
                Tidak perlu bingung lagi dalam memilih produk skincare. Biarkan SkinMatch membantu Anda menemukan produk yang tepat untuk kulit Anda.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/register"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Daftar Sekarang
                </Link>
                <Link
                  to="/login"
                  className="inline-block border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;