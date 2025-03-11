import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Can't get product from API:", error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Laster produkt...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <img src={product.image.url} alt={product.image.alt} className="w-full h-64 object-cover rounded-md" />

        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>

        <p className="text-gray-700 mt-4">
          {product.discountedPrice < product.price ? (
            <>
              <span className="text-red-500 font-bold">{product.discountedPrice} kr</span>{" "}
              <span className="line-through text-gray-400">{product.price} kr</span>
            </>
          ) : (
            <span>{product.price} kr</span>
          )}
        </p>

        {/* 🛒 Legg til i handlekurv-knapp */}
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
