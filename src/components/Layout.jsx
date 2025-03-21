import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, cart }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header cart={cart} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
