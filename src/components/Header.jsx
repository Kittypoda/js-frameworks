import { Link } from "react-router-dom";
import logo from "../assets/images/Lulu.png";
import { useState, useEffect, useRef } from "react";

function Header({ cart }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState([]);

  const searchRef = useRef(); 

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://v2.api.noroff.dev/online-shop");
      const data = await response.json();
      setProducts(data.data);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5));
    }
  }, [query, products]);

 
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white text-red-800 p-4 ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between relative">
        
        <div className="flex-1">
          <Link to="/">
            <img src={logo} alt="Lulu logo" className="h-10 w-auto" />
          </Link>
        </div>

        
        <div className="flex-1 flex justify-center relative" ref={searchRef}>
          <div className="w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <i className="fa fa-search text-red-800" />
  </span>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-red-800 placeholder-red-800 text-red-800 fa-magnifying-glass rounded-2xl px-10 py-2 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
             
            />
            {results.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white shadow-lg border border-red-200 rounded-md mt-1 z-10">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/product/${product.id}`}
                      className="block px-4 py-2 hover:bg-red-100 text-sm"
                      onClick={() => setQuery("")}
                    >
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <Link to="/cart" className="relative">
            <i className="fa-solid fa-shopping-bag text-red-800 text-2xl"></i>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;





