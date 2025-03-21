import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
        <Link to="/contact" className="hover:underline">Contact us</Link>
      <p>&copy; 2025 LULU. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
