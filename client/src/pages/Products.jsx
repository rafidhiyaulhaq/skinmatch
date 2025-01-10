import { useState, useEffect } from 'react';
import { productService } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Katalog Produk Skincare</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden">
              {product.imageUrl && (
                <div className="relative pt-[100%]">
                  <img 
                    src={product.imageUrl}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
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
      </div>
    </div>
  );
}

export default Products;