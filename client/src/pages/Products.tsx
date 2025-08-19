import { useEffect, useState } from 'react';
import apiClient from '../api/axios';

interface Product {
  _id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  createdAt: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/products');
        setProducts(response.data);
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Failed to fetch products.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Inventory Products</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <th className="py-3 px-5">Name</th>
              <th className="py-3 px-5">SKU</th>
              <th className="py-3 px-5">Quantity</th>
              <th className="py-3 px-5">Price</th>
              <th className="py-3 px-5">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-5">{product.name}</td>
                  <td className="py-3 px-5">{product.sku}</td>
                  <td className="py-3 px-5">{product.quantity}</td>
                  <td className="py-3 px-5">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-5">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
