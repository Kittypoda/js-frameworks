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
    setCart([...cart, product]); 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage addToCart={addToCart} /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductPage addToCart={addToCart} /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage cart={cart} /></Layout>} />
        <Route path="/checkout" element={<Layout><CheckoutPage cart={cart} setCart={setCart} /></Layout>} />
        <Route path="/checkout-success" element={<Layout><CheckoutSuccessPage setCart={setCart} /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;

