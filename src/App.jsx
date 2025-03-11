import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CeckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccess";
import ContactPage from "./pages/ContactPage";

function App() {
  // 🛒 State for handlekurven
  const [cart, setCart] = useState([]);

  // 🛒 Funksjon for å legge til produkter i handlekurven
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // 🛒 Funksjon for å fjerne produkter fra handlekurven
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // 🛒 Funksjon for å tømme handlekurven
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage addToCart={addToCart} /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductPage addToCart={addToCart} /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} /></Layout>} />
        <Route path="/checkout" element={<Layout><CheckoutPage cart={cart} clearCart={clearCart} /></Layout>} />
        <Route path="/checkout-success" element={<Layout><CheckoutSuccessPage clearCart={clearCart} /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;


