import { useState } from "react";
import Icon from "../components/Icon";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

export function WishlistPage({
  wishlist,
  setWishlist,
  cart,
  setCart,
  setPage,
  setSelectedProduct,
}) {
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Wishlist</h1>
        <p className="text-gray-500 mb-10">{items.length} saved items</p>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-6">💝</div>
            <h2 className="text-2xl font-black mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">
              Save items you love by clicking the heart icon
            </p>
            <button
              onClick={() => setPage("Products")}
              className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((p) => (
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

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (sent)
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✉️</div>
          <h2 className="text-3xl font-black mb-3">Message Sent!</h2>
          <p className="text-gray-500">
            We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-6 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
          >
            Send Another
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
              Get in Touch
            </p>
            <h1 className="text-5xl font-black tracking-tight mb-6 leading-tight">
              We'd love to
              <br />
              hear from you.
            </h1>
            <p className="text-gray-500 text-lg mb-12 leading-relaxed">
              Have a question about an order, a product, or just want to say hi?
              Drop us a message and we'll get back to you.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Icon.map,
                  label: "Our Store",
                  val: "Tashkent, Uzbekistan",
                },
                { icon: Icon.mail, label: "Email", val: "hello@qpick.uz" },
                { icon: Icon.phone, label: "Phone", val: "+998 90 123 45 67" },
              ].map(({ icon, label, val }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-700">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="font-semibold text-gray-900">{val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-12">
              {["Instagram", "Telegram", "Twitter"].map((s) => (
                <button
                  key={s}
                  className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-black hover:text-black transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-3xl p-8">
            <h2 className="text-2xl font-black mb-6">Send a Message</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Your Name", "name"],
                  ["Email Address", "email"],
                ].map(([ph, k]) => (
                  <div key={k}>
                    <input
                      value={form[k]}
                      onChange={(e) => set(k, e.target.value)}
                      placeholder={ph}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                    />
                  </div>
                ))}
              </div>
              <input
                value={form.subject}
                onChange={(e) => set("subject", e.target.value)}
                placeholder="Subject"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors"
              />
              <textarea
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Your message..."
                rows={6}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors resize-none"
              />
              <button
                onClick={() => setSent(true)}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Send Message {Icon.arrow}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
