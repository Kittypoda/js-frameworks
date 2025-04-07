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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded transition">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image.url}
                alt={product.image.alt}
                className="w-full h-80 object-cover rounded-md"
              />
            </Link>

            <div className="flex justify-between items-center mt-2">
              <Link to={`/product/${product.id}`} className="text-red-800 font-gayathri">
                {product.title}
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="text-red-800 text-xl"
              >
                <i className="fa-solid fa-shopping-bag"></i>
              </button>
            </div>

            <p className="text-red-800 font-gayathri text-sm mt-1">
              {product.discountedPrice < product.price ? (
                <>
                  <span className="text-red-800 font-medium">{product.discountedPrice} kr</span>{" "}
                  <span className="line-through text-red-800">{product.price} kr</span>
                </>
              ) : (
                <span>{product.price} kr</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;




