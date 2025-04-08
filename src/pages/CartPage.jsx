import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (total, product) => total + product.discountedPrice,
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-lg text-red-800 font-inria font-thin mb-4">Your cart</h1>

      {cart.length === 0 ? (
        <p className="text-red-800 font-inria">Cart is empty</p>
      ) : (
        <>
          {cart.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-red-100 py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image.url}
                  alt={product.image.alt}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-md text-red-800 font-semibold font-inria">{product.title}</h2>
                  <p className="text-red-800 font-inria font-thin">{product.discountedPrice} kr</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-800 font-inria"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6">
            <h2 className="text-xl text-red-800 font-inria font-bold">
              Total: {totalPrice.toFixed(2)} kr
            </h2>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={clearCart}
              className="bg-red-100 text-red-900 px-4 py-2 rounded-lg"
            >
              Empty cart
            </button>
            <Link
              to="/checkout"
              className="bg-red-800 text-white px-4 py-2 rounded-lg"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
