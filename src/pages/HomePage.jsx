import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastProduct, setToastProduct] = useState(null);

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
    setToastProduct(product);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setToastProduct(null);
    }, 2000);
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image.url} alt={product.image.alt} className="w-full h-80 object-cover rounded-xl shadow-md" />
            </Link>

            <div className="flex justify-between items-center mt-2">
              <Link to={`/product/${product.id}`} className="text-red-800 font-inria text-sm font-semibold">
                {product.title}
              </Link>

              <button
                onClick={() => handleAddToCart(product)}
                className="text-red-800 text-lg"
              >
                <i className="fa-solid fa-shopping-bag"></i>
              </button>
            </div>

            <p className="text-red-800 font-inria font-thin text-sm">
              {product.discountedPrice < product.price ? (
                <>
                  <span>{product.discountedPrice} kr</span>{" "}
                  <span className="line-through">{product.price} kr</span>
                </>
              ) : (
                <span>{product.price} kr</span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      {showToast && toastProduct && (
        <div className="fixed bottom-4 right-4 bg-red-800 text-white text-sm px-4 py-3 rounded-lg shadow-md animate-fade-in-out z-50">
          <i className="fa-solid fa-check mr-2" />
          <span className="font-inria">Added <strong>{toastProduct.title}</strong> to cart!</span>
        </div>
      )}
    </div>
  );
}

export default HomePage;






