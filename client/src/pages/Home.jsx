import { Link } from 'react-router-dom';

function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section dan Features Section tetap sama */}

      {/* Info Section dengan conditional rendering */}
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
              {!token && ( // Hanya tampilkan jika belum login
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
              )}
              {token && ( // Tampilkan tombol Quiz jika sudah login
                <div className="flex space-x-4">
                  <Link
                    to="/quiz"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Mulai Quiz
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;