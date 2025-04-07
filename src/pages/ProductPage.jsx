import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
        const data = await response.json();
        setProduct(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Product not found", error);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Product loading..</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-full h-64 object-cover rounded-md"
        />

        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>

        <p className="text-gray-700 mt-4">
          {product.discountedPrice < product.price ? (
            <>
              <span className="text-black font-bold">{product.discountedPrice} kr</span>{" "}
              <span className="line-through text-gray-400">{product.price} kr</span>{" "}
            </>
          ) : (
            <span>{product.price} kr</span>
          )}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-orange-100 text-black py-3 rounded-md hover:bg-blue-600 transition"
        >
          Add to cart
        </button>

        {product.reviews?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Reviews</h2>
            <ul className="space-y-4">
              {product.reviews.map((review) => (
                <li key={review.id} className="bg-gray-100 p-3 rounded-md">
                  <p className="font-semibold">{review.username}</p>
                  <p className="text-sm text-yellow-500">Rating: {review.rating}/5</p>
                  <p className="mt-1">{review.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;

