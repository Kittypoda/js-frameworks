import { Link } from "react-router-dom";

function CartPage({ cart, removeFromCart, clearCart }) {
  const totalPrice = cart.reduce((total, product) => total + product.discountedPrice, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        <div>
          {cart.map((product, index) => (
            <div key={index} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center gap-4">
                <img src={product.image.url} alt={product.image.alt} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-gray-700">{product.discountedPrice} kr</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}

          {/* 🛒 Totalsum */}
          <div className="mt-6">
            <h2 className="text-xl font-bold">Total: {totalPrice.toFixed(2)} kr</h2>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={clearCart}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Empty cart
            </button>
            <Link to="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
