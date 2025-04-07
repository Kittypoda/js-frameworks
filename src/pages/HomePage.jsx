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
          <div key={product.id} className="">
            <Link to={`/product/${product.id}`}>
              <img src={product.image.url} alt={product.image.alt} className="w-full h-80 object-cover rounded-md" />
            </Link>
            <Link to={`/product/${product.id}`} className="block mt-2 text-red-800">
              {product.title}
            </Link>
            <p className="text-red-800 text-sm">
              {product.discountedPrice < product.price ? (
                <>
                  <span className="text-red-800 text-sm">{product.discountedPrice} kr</span>{" "}
                  <span className="line-through text-red-800">{product.price} kr</span>
                </>
              ) : (
                <span>{product.price} kr</span>
              )}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-red-800 text-white py-2 rounded-md"
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



