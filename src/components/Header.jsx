import { Link } from "react-router-dom";
import logo from "../assets/images/Lulu.png"; 

function Header({ cart }) {
  return (
    <header className="bg-white text-red-800 py-4">
  <div className="container mx-auto px-4 flex justify-between items-center">
    <Link to="/">
      <img src={logo} alt="Lulu logo" className="h-10 w-auto" />
    </Link>

    <nav className="flex gap-6">
      <Link to="/cart" className="relative">
        <i className="fa-solid fa-bag-shopping text-red-800 text-2xl"></i>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  </div>
</header>

  );
}

export default Header;


