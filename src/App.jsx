import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { WishlistPage, ContactPage } from "./pages/WishlistAndContact";

export default function App() {
  const [page, setPage] = useState("Home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }
        input[type=range] { -webkit-appearance: none; height: 4px; background: #e5e7eb; border-radius: 4px; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; background: #000; border-radius: 50%; cursor: pointer; }
      `}</style>

      <Navbar
        page={page}
        setPage={setPage}
        cartCount={cartCount}
        wishCount={wishlist.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main>
        {page === "Home" && (
          <HomePage
            setPage={setPage}
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        )}

        {page === "Products" && (
          <ProductsPage
            setPage={setPage}
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
            searchQuery={searchQuery}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {page === "ProductDetail" && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            setPage={setPage}
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {page === "Cart" && (
          <CartPage cart={cart} setCart={setCart} setPage={setPage} />
        )}

        {page === "Checkout" && (
          <CheckoutPage cart={cart} setCart={setCart} setPage={setPage} />
        )}

        {page === "Wishlist" && (
          <WishlistPage
            wishlist={wishlist}
            setWishlist={setWishlist}
            cart={cart}
            setCart={setCart}
            setPage={setPage}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {page === "Contact" && <ContactPage />}
      </main>

      {page !== "Checkout" && <Footer setPage={setPage} />}
    </div>
  );
}
