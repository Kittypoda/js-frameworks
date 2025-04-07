import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [addedProductId, setAddedProductId] = useState(null);

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

  function handleAddToCart(product) {
    addToCart(product);
    setAddedProductId(product.id);

    
    setTimeout(() => setAddedProductId(null), 2000);
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="">
            <Link to={`/product/${product.id}`}>
              <img src={product.image.url} alt={product.image.alt} className="w-full h-80 object-cover rounded-md" />
            </Link>

            <div className="flex justify-between items-center mt-2">
              <Link to={`/product/${product.id}`} className="text-red-800 font-gayathri">
                {product.title}
              </Link>

              {addedProductId === product.id ? (
                <span className="text-red-800 text-sm font-medium">✓ Added to bag!</span>
              ) : (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="text-red-800 text-lg"
                >
                  <i className="fa-solid fa-shopping-bag"></i>
                </button>
              )}
            </div>

            <p className="text-red-800 text-sm">
              {product.discountedPrice < product.price ? (
                <>
                  <span className="text-red-800 font-gayathri text-sm">{product.discountedPrice} kr</span>{" "}
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





