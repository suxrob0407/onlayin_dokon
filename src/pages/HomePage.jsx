import Icon from "../components/Icon";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

export default function HomePage({
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
}) {
  const bestsellers = PRODUCTS.slice(0, 4);

  return (
    <div>
      <section className="relative bg-black text-white overflow-hidden min-h-screen flex items-center">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-linear-to-l from-white to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              New Collection 2026 — Live Now
            </div>

            <h1 className="text-7xl font-black leading-none tracking-tight mb-6">
              PICK YOUR
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2px white" }}
              >
                STYLE
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
              Curated streetwear and performance gear for those who move fast
              and look sharp.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setPage("Products")}
                className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                Shop Now {Icon.arrow}
              </button>
              <button className="flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-colors">
                View Lookbook
              </button>
            </div>

            <div className="flex gap-12 mt-16">
              {[
                ["2K+", "Products"],
                ["50K+", "Customers"],
                ["4.9★", "Rating"],
              ].map(([num, label]) => (
                <div key={label}>
                  <div className="text-3xl font-black">{num}</div>
                  <div className="text-gray-500 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="w-72 h-80 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-9xl backdrop-blur-sm">
            👟
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 w-64">
            <div className="text-xs text-gray-400 mb-1">Featured Drop</div>
            <div className="font-bold">Arc Runner Pro</div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-black">$189</span>
              <button
                onClick={() => setPage("Products")}
                className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                Shop
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black tracking-tight">
              Shop by Category
            </h2>
            <button
              onClick={() => setPage("Products")}
              className="text-sm font-semibold text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
            >
              View all {Icon.arrow}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Sneakers", emoji: "👟", bg: "#F5F0E8" },
              { name: "Hoodies", emoji: "🧥", bg: "#E8F0F5" },
              { name: "Accessories", emoji: "🎒", bg: "#F0F5E8" },
              { name: "Jackets", emoji: "🧤", bg: "#F5E8F0" },
            ].map((cat) => (
              <button
                key={cat.name}
                onClick={() => setPage("Products")}
                className="group rounded-2xl p-8 flex flex-col items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
                style={{ background: cat.bg }}
              >
                <span className="text-5xl group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </span>
                <span className="font-bold text-gray-800 text-sm">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">
                Most Popular
              </p>
              <h2 className="text-3xl font-black tracking-tight">
                Bestsellers
              </h2>
            </div>
            <button
              onClick={() => setPage("Products")}
              className="text-sm font-semibold text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
            >
              See all {Icon.arrow}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                setPage={setPage}
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-yellow-400 font-bold tracking-widest text-sm uppercase mb-4">
            Limited Time Offer
          </p>
          <h2 className="text-5xl font-black tracking-tight mb-4">
            UP TO 40% OFF
          </h2>
          <p className="text-gray-400 mb-8">
            Use code{" "}
            <span className="text-white font-mono font-bold bg-white/10 px-3 py-1 rounded">
              QPICK40
            </span>{" "}
            at checkout
          </p>
          <button
            onClick={() => setPage("Products")}
            className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors"
          >
            Claim Deal
          </button>
        </div>
      </section>
    </div>
  );
}
