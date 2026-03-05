import { useState } from "react";
import Icon from "../components/Icon";

export default function CheckoutPage({ cart, setCart, setPage }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: "",
  });
  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping = subtotal > 150 ? 0 : 12;
  const total = subtotal + shipping;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleOrder = () => {
    setSuccess(true);
    setCart([]);
  };

  if (success)
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              className="w-12 h-12"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-4xl font-black mb-3">Order Placed! 🎉</h1>
          <p className="text-gray-500 mb-2">
            Thank you, <strong>{form.name || "there"}</strong>!
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Your order confirmation has been sent to{" "}
            {form.email || "your email"}. Expected delivery: 3–5 business days.
          </p>
          <div className="bg-white rounded-2xl p-6 text-left mb-8 border border-gray-100">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Order Total</span>
              <span className="font-black text-lg">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping to</span>
              <span className="font-medium">{form.city || "—"}</span>
            </div>
          </div>
          <button
            onClick={() => setPage("Home")}
            className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => setPage("Cart")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 font-medium transition-colors"
        >
          {Icon.arrowLeft} Back to Cart
        </button>
        <div className="flex items-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all ${
                  step >= s
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step > s ? Icon.check : s}
              </div>
              <span
                className={`text-sm font-semibold ${
                  step >= s ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {["Shipping", "Payment", "Review"][s - 1]}
              </span>
              {s < 3 && (
                <div
                  className={`w-12 h-0.5 ${step > s ? "bg-black" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-black mb-6">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["Full Name", "name", "col-span-2"],
                    ["Email", "email", "col-span-1"],
                    ["Phone", "phone", "col-span-1"],
                    ["Address", "address", "col-span-2"],
                    ["City", "city", "col-span-1"],
                    ["ZIP Code", "zip", "col-span-1"],
                  ].map(([label, key, span]) => (
                    <div key={key} className={span}>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">
                        {label}
                      </label>
                      <input
                        value={form[key]}
                        onChange={(e) => set(key, e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                        placeholder={label}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  Continue to Payment {Icon.arrow}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-black mb-6">Payment Details</h2>
                <div className="flex gap-3 mb-6">
                  {["💳 Card", "🏦 Bank", "📱 PayMe"].map((m) => (
                    <button
                      key={m}
                      className="flex-1 border-2 border-black rounded-xl py-3 text-sm font-bold text-center first:bg-black first:text-white"
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">
                      Card Number
                    </label>
                    <input
                      value={form.card}
                      onChange={(e) => set("card", e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">
                        Expiry
                      </label>
                      <input
                        value={form.expiry}
                        onChange={(e) => set("expiry", e.target.value)}
                        placeholder="MM/YY"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">
                        CVV
                      </label>
                      <input
                        value={form.cvv}
                        onChange={(e) => set("cvv", e.target.value)}
                        placeholder="•••"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-200 py-4 rounded-2xl font-bold hover:border-gray-400 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors"
                  >
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-black mb-6">Review Your Order</h2>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                        style={{ background: item.color }}
                      >
                        {item.img}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-gray-400">
                          Size: {item.size} · Qty: {item.qty}
                        </p>
                      </div>
                      <span className="font-black">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ship to</span>
                    <span className="font-medium">
                      {form.name}, {form.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Card</span>
                    <span className="font-medium font-mono">
                      •••• {form.card.slice(-4) || "——"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-gray-200 py-4 rounded-2xl font-bold hover:border-gray-400 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleOrder}
                    className="flex-1 bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors"
                  >
                    Place Order 🎉
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h3 className="font-black text-lg mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal ({cart.length} items)
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between font-black text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
