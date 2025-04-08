import { Link } from "react-router-dom";
import logo from "../assets/images/Lulu.png";
import { useState, useEffect, useRef } from "react";

function Header({ cart }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
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

  // Close search results on outside click
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
    <header className="bg-white text-red-800 pt-4">
      <div className="container mx-auto px-4 flex items-center justify-between relative">

        {/* Logo */}
        <div className="flex-1">
          <Link to="/">
            <img src={logo} alt="Lulu logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop search bar */}
        <div className="hidden md:flex flex-1 justify-center relative" ref={searchRef}>
          <div className="w-full max-w-xl relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa fa-search text-red-800" />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="border border-red-800 placeholder-red-800 font-gayathri text-sm rounded-2xl pl-9 px-4 py-2 pt-3 focus:outline-none w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white shadow-lg border font-gayathri border-red-800 rounded-xl mt-1 z-10">
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

        {/* Right: search icon (mobile) + cart */}
        <div className="flex-1 flex justify-end items-center relative">
          
          {/* Mobile search icon */}
          <button onClick={() => setShowMobileSearch(true)} className="md:hidden mr-4">
            <i className="fa fa-search text-red-800 text-xl" />
          </button>

          {/* Cart icon */}
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

      {/* Mobile search overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-white z-50 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-Gayathri text-red-800">Search</h2>
            <button onClick={() => setShowMobileSearch(false)} className="text-red-800 text-xl">
              &times;
            </button>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            className="border border-red-800 placeholder-red-800 font-gayathri text-sm rounded-xl px-4 py-2 pt-2 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          {results.length > 0 && (
            <ul className="mt-2 border border-red-800 rounded-xl">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    className="block px-4 py-2 hover:bg-red-100 text-sm"
                    onClick={() => {
                      setQuery("");
                      setShowMobileSearch(false);
                    }}
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;







