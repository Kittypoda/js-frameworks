import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://v2.api.noroff.dev/online-shop");
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Can't find product from API:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 shadow-lg rounded-lg bg-white">
            <Link to={`/product/${product.id}`}>
              <img src={product.image.url} alt={product.image.alt} className="w-full h-48 object-cover rounded-md" />
            </Link>
            <Link to={`/product/${product.id}`} className="block mt-2 text-lg font-semibold hover:text-blue-500">
              {product.title}
            </Link>
            <p className="text-gray-600">
              {product.discountedPrice < product.price ? (
                <>
                  <span className="text-red-500 font-bold">{product.discountedPrice} kr</span>{" "}
                  <span className="line-through text-gray-400">{product.price} kr</span>
                </>
              ) : (
                <span>{product.price} kr</span>
              )}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;



