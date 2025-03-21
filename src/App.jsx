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
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout cart={cart}><HomePage addToCart={addToCart} /></Layout>} />
        <Route path="/product/:id" element={<Layout cart={cart}><ProductPage addToCart={addToCart} /></Layout>} />
        <Route path="/cart" element={<Layout cart={cart}><CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} /></Layout>} />
        <Route path="/checkout" element={<Layout cart={cart}><CheckoutPage cart={cart} clearCart={clearCart} /></Layout>} />
        <Route path="/checkout-success" element={<Layout cart={cart}><CheckoutSuccessPage clearCart={clearCart} /></Layout>} />
        <Route path="/contact" element={<Layout cart={cart}><ContactPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;


