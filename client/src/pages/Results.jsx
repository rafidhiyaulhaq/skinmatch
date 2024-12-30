import { useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const { skinType, recommendations } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Results</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Your Skin Type: {skinType}</h2>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Recommended Products</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recommendations?.map((product) => (
                <div key={product._id} className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-gray-600">{product.brand}</p>
                  <p className="text-sm mt-2">{product.description}</p>
                  <p className="text-blue-600 font-semibold mt-2">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;