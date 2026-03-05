import { useState } from "react";
import Icon from "../components/Icon";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

export default function ProductDetail({
  product: p,
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  setSelectedProduct,
}) {
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const inWish = wishlist.includes(p.id);
  const inCart = cart.find((c) => c.id === p.id);

  const addToCart = () => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === p.id);
      if (exists)
        return prev.map((c) =>
          c.id === p.id ? { ...c, qty: c.qty + qty } : c,
        );
      return [...prev, { ...p, qty, size }];
    });
  };

  const toggleWish = () => {
    setWishlist((prev) =>
      prev.includes(p.id) ? prev.filter((id) => id !== p.id) : [...prev, p.id],
    );
  };

  const related = PRODUCTS.filter(
    (prod) => prod.category === p.category && prod.id !== p.id,
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => setPage("Products")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors font-medium"
        >
          {Icon.arrowLeft} Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-4">
            <div
              className="aspect-square rounded-3xl flex items-center justify-center text-9xl"
              style={{ background: p.color }}
            >
              {p.img}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl flex items-center justify-center text-4xl opacity-60 hover:opacity-100 cursor-pointer border-2 border-transparent hover:border-black transition-all"
                  style={{ background: p.color }}
                >
                  {p.img}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                {p.category}
              </span>
              {p.badge && (
                <span
                  className={`text-xs font-black px-3 py-1 rounded-full ${
                    p.badge === "SALE"
                      ? "bg-red-500 text-white"
                      : p.badge === "NEW"
                        ? "bg-black text-white"
                        : "bg-yellow-400 text-black"
                  }`}
                >
                  {p.badge}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-4">
              {p.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(p.rating)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  >
                    {Icon.star}
                  </span>
                ))}
              </div>
              <span className="font-bold text-gray-900">{p.rating}</span>
              <span className="text-gray-400 text-sm">
                ({p.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl font-black text-gray-900">
                ${p.price}
              </span>
              {p.oldPrice && (
                <>
                  <span className="text-2xl text-gray-400 line-through">
                    ${p.oldPrice}
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded">
                    -{Math.round((1 - p.price / p.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{p.desc}</p>
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-900 mb-3">Size</p>
              <div className="flex gap-2 flex-wrap">
                {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-12 h-12 rounded-xl font-bold text-sm transition-all border-2 ${
                      size === s
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <p className="text-sm font-bold text-gray-900 mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  {Icon.minus}
                </button>
                <span className="text-xl font-black w-8 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  {Icon.plus}
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addToCart}
                className={`flex-1 py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
                  inCart
                    ? "bg-green-500 text-white"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {inCart ? (
                  <>{Icon.check} Added to Cart</>
                ) : (
                  <>{Icon.bag} Add to Cart</>
                )}
              </button>
              <button
                onClick={toggleWish}
                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                  inWish
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {inWish ? Icon.heartFill : Icon.heart}
              </button>
            </div>

            {inCart && (
              <button
                onClick={() => setPage("Cart")}
                className="mt-3 w-full py-4 rounded-2xl border-2 border-black font-bold hover:bg-black hover:text-white transition-all"
              >
                Go to Cart →
              </button>
            )}
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-black mb-6">You may also like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  setPage={setPage}
                  cart={cart}
                  setCart={setCart}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  onSelect={(pr) => {
                    setSelectedProduct(pr);
                    setPage("ProductDetail");
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
