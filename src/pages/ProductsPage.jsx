import { useState } from "react";
import Icon from "../components/Icon";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";

export default function ProductsPage({
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  searchQuery,
  setSelectedProduct,
}) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [priceMax, setPriceMax] = useState(300);

  let filtered = PRODUCTS.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = p.price <= priceMax;
    return matchCat && matchSearch && matchPrice;
  });

  if (sort === "price-asc")
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc")
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating")
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-1">
            All Products
          </h1>
          <p className="text-gray-500">
            {filtered.length} items found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2 flex-wrap flex-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  category === cat
                    ? "bg-black text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {Icon.filter}
              <span>Max: ${priceMax}</span>
              <input
                type="range"
                min="30"
                max="300"
                value={priceMax}
                onChange={(e) => setPriceMax(+e.target.value)}
                className="w-24 accent-black"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none font-medium cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-bold mb-2">No products found</p>
            <p className="text-sm">Try different filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                setPage={setPage}
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
                onSelect={(prod) => {
                  setSelectedProduct(prod);
                  setPage("ProductDetail");
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
