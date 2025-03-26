import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const totalPrice = cart.reduce(
    (total, item) => total + item.discountedPrice,
    0
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Order placed!", formData, cart);
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
          <ul className="divide-y mb-6">
            {cart.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>{item.title}</span>
                <span>{item.discountedPrice} kr</span>
              </li>
            ))}
          </ul>

          <div className="mb-6 text-right font-semibold">
            Total: {totalPrice.toFixed(2)} kr
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded space-y-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Place order
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;


