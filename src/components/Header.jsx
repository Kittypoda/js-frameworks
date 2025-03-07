import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">LULU</Link>
        <ul className="flex gap-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/cart" className="hover:underline">Cart</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
