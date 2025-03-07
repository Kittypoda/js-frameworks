import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://v2.api.noroff.dev/online-shop";

const HomePage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Kunne ikke hente produkter.");
        }
        const data = await response.json();
        console.log("Hentede produkter:", data.data); 
        setProducts(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-xl">Loads products...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center my-6">Produkter</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md bg-white">
            <Link to={`/product/${product.id}`}>
              <img 
                src={product.image.url} 
                alt={product.image.alt} 
                className="w-full h-40 object-cover rounded cursor-pointer"
              />
            </Link>

            <h2 className="text-lg font-bold mt-2 hover:underline">
              <Link to={`/product/${product.id}`}>{product.title}</Link>
            </h2>

            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-500 font-bold">{product.discountedPrice} NOK</p>
            
            {product.price > product.discountedPrice && (
              <p className="text-sm text-red-500">
                Før: <span className="line-through">{product.price} NOK</span>
              </p>
            )}

            <button 
              onClick={() => addToCart(product)} 
              className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded transition hover:bg-green-600"
            >
              🛍️ Quick Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;


