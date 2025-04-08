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

  if (loading) return <p className="p-6 text-red-800 font-gayathri">Product loading..</p>;
  if (!product) return <p className="p-6 text-red-800 font-gayathri">Product not found</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto p-6">
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-full max-h-80 shadow-md object-cover rounded-xl"
        />

        <h1 className="text-xl text-red-800 font-gayathri mt-4">{product.title}</h1>
        <p className="text-red-800 font-gayathri mt-2">{product.description}</p>

        <p className="text-red-800 font-gayathri mt-4">
          {product.discountedPrice < product.price ? (
            <>
              <span className="text-red-800 font-gayathri">{product.discountedPrice} kr</span>{" "}
              <span className="line-through text-red-800 font-gayathri">{product.price} kr</span>{" "}
            </>
          ) : (
            <span>{product.price} kr</span>
          )}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-red-800 text-white text-red-800 font-gayathri py-3 rounded-xl transition"
        >
          Add to bag
        </button>

        {product.reviews?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-red-800 font-gayathri mb-2">Reviews</h2>
            <ul className="space-y-4">
              {product.reviews.map((review) => (
                <li key={review.id} className="bg-red-100 p-3 rounded-xl">
                  <p className="text-red-800 font-bold font-gayathri">{review.username}</p>
                  <p className="text-sm text-red-800">Rating: {review.rating}/5</p>
                  <p className="text-red-800 mt-1 font-gayathri">{review.description}</p>
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

