import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-red-100 text-red-800 text-center p-7">
        <Link to="/contact" className="font-inria">Contact us</Link>
      <p className="font-inria font-thin">&copy; 2025 LULU. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
