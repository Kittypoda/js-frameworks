import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.discountedPrice,
    0
  );

  function handleCheckout() {
    clearCart(); 
    navigate("/checkout-success"); 
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>{item.title}</span>
                <span>{item.discountedPrice} kr</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-right font-semibold">
            Total: {totalPrice.toFixed(2)} kr
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Place order
          </button>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;

