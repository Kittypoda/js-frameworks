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
      <h1 className="text-lg text-red-800 font-inria font-thin mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul className="divide-y divide-red-100  mb-6">
            {cart.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span className="text-md text-red-800 font-inria">{item.title}</span>
                <span className="text-md text-red-800 font-inria">{item.discountedPrice} kr</span>
              </li>
            ))}
          </ul>

          <div className="mb-6 text-right text-lg text-red-800 font-inria font-semibold">
            Total: {totalPrice.toFixed(2)} kr
          </div>

          <form onSubmit={handleSubmit} className="bg-red-100 p-6 rounded-lg shadow-md space-y-4">
            <div className="text-red-800 font-inria font-semibold text-center">Shipping details</div>
            <div>
              <label className="block text-red-800 font-inria">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-red-800 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-red-800 font-inria">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-red-800 rounded-lg"
              />
            </div>

            <div>
            <label className="block text-red-800 font-inria">Address</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-red-800 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-4 py-2 bg-red-800 text-white rounded-lg"
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


