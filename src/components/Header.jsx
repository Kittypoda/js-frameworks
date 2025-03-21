import { Link } from "react-router-dom";

function Header({ cart }) {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">LULU</Link>
      
      <nav className="flex gap-6">
        <Link to="/cart" className="relative">
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;

