import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://v2.api.noroff.dev/online-shop";

const ProductPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Can't find product from api");
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Did not find the product</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img 
          src={product.image.url} 
          alt={product.image.alt} 
          className="w-full md:w-1/2 h-96 object-cover rounded-lg"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-bold text-blue-500 mt-4">
            {product.discountedPrice} NOK
          </p>
          {product.price > product.discountedPrice && (
            <p className="text-sm text-red-500">
              Before: <span className="line-through">{product.price} NOK</span>
            </p>
          )}
          <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
