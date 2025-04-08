import { Link } from "react-router-dom";
import { useEffect } from "react";

function CheckoutSuccessPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on load
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center py-16 px-4">
      <h1 className="text-4xl font-bold text-red-800 mb-4 font-leckerli">Thank you for your order!</h1>
      <p className="text-red-800 text-lg mb-6 font-inria">
        We're so happy you chose to shop with Lulu. Your order has been placed successfully
      </p>
      <p className="text-red-800 font-inria font-thin">
        You will receive a confirmation email with your order details shortly.
      </p>

      <Link
        to="/"
        className="inline-block mt-8 bg-red-800 font-inria text-white px-6 py-3 rounded-lg"
      >
        Continue shopping
      </Link>
    </div>
  );
}

export default CheckoutSuccessPage;
