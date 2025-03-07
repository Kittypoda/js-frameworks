import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CeckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccess";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductPage /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
        <Route path="/checkout-success" element={<Layout><CheckoutSuccessPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
