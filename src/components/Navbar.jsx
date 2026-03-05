import { useState } from "react";
import Icon from "./Icon";

export default function Navbar({
  page,
  setPage,
  cartCount,
  wishCount,
  searchQuery,
  setSearchQuery,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const links = ["Home", "Products", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setPage("Home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <span className="text-white font-black text-sm">Q</span>
            </div>
            <span className="font-black text-xl tracking-tight text-gray-900">
              QPICK
            </span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l}
                onClick={() => setPage(l)}
                className={`text-sm font-medium transition-colors ${
                  page === l
                    ? "text-black border-b-2 border-black pb-0.5"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <span className="text-gray-400">{Icon.search}</span>
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage("Products");
                  }}
                  placeholder="Search..."
                  className="bg-transparent text-sm outline-none w-40 text-gray-800"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-gray-400 hover:text-gray-700"
                >
                  {Icon.close}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all"
              >
                {Icon.search}
              </button>
            )}

            <button
              onClick={() => setPage("Wishlist")}
              className="relative p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all"
            >
              {Icon.heart}
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setPage("Cart")}
              className="relative p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all"
            >
              {Icon.bag}
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="hidden md:flex p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all">
              {Icon.user}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
            >
              {mobileOpen ? Icon.close : Icon.menu}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => {
                setPage(l);
                setMobileOpen(false);
              }}
              className={`text-left text-sm font-medium py-2 ${
                page === l ? "text-black font-bold" : "text-gray-600"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
