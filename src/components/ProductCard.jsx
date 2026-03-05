/* eslint-disable no-unused-vars */
import Icon from "./Icon";

export default function ProductCard({
  product: p,
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  onSelect,
}) {
  const inWish = wishlist.includes(p.id);
  const inCart = cart.find((c) => c.id === p.id);

  const addToCart = (e) => {
    e.stopPropagation();
    setCart((prev) => {
      const exists = prev.find((c) => c.id === p.id);
      if (exists)
        return prev.map((c) =>
          c.id === p.id ? { ...c, qty: c.qty + 1 } : c
        );
      return [...prev, { ...p, qty: 1, size: "M" }];
    });
  };

  const toggleWish = (e) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(p.id)
        ? prev.filter((id) => id !== p.id)
        : [...prev, p.id]
    );
  };

  return (
    <div
      onClick={() => (onSelect ? onSelect(p) : null)}
      className="bg-white rounded-2xl overflow-hidden group border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all cursor-pointer"
    >
      <div
        className="relative aspect-square flex items-center justify-center text-7xl p-6"
        style={{ background: p.color }}
      >
        <span className="group-hover:scale-110 transition-transform duration-300">
          {p.img}
        </span>

        {p.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-black px-2.5 py-1 rounded-full ${
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

        <button
          onClick={toggleWish}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
        >
          {inWish ? Icon.heartFill : Icon.heart}
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">
          {p.category}
        </p>
        <h3 className="font-bold text-gray-900 mb-2 leading-tight">{p.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400">{Icon.star}</span>
          <span className="text-sm font-semibold text-gray-700">{p.rating}</span>
          <span className="text-xs text-gray-400">({p.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-gray-900">${p.price}</span>
            {p.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${p.oldPrice}
              </span>
            )}
          </div>
          <button
            onClick={addToCart}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              inCart
                ? "bg-green-500 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {inCart ? Icon.check : Icon.plus}
          </button>
        </div>
      </div>
    </div>
  );
}
