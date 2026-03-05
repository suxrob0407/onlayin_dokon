import Icon from "../components/Icon";

export default function CartPage({ cart, setCart, setPage }) {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping = subtotal > 150 ? 0 : 12;
  const total = subtotal + shipping;

  const update = (id, delta) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c))
        .filter((c) => c.qty > 0)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Your Cart</h1>
        <p className="text-gray-500 mb-10">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </p>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-8xl mb-6">🛍️</div>
            <h2 className="text-2xl font-black mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some items to get started</p>
            <button
              onClick={() => setPage("Products")}
              className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 flex gap-5 border border-gray-100"
                >
                  <div
                    className="w-24 h-24 rounded-xl flex items-center justify-center text-4xl shrink-0"
                    style={{ background: item.color }}
                  >
                    {item.img}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                          {item.category}
                        </p>
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Size: {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setCart((prev) => prev.filter((c) => c.id !== item.id))
                        }
                        className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                      >
                        {Icon.trash}
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                        <button
                          onClick={() => update(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors"
                        >
                          {Icon.minus}
                        </button>
                        <span className="text-sm font-bold w-6 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => update(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors"
                        >
                          {Icon.plus}
                        </button>
                      </div>
                      <span className="font-black text-lg">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
                <h2 className="text-xl font-black mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span
                      className={`font-semibold ${shipping === 0 ? "text-green-600" : ""}`}
                    >
                      {shipping === 0 ? "Free" : `$${shipping}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">
                      🎉 You qualify for free shipping!
                    </p>
                  )}
                  {shipping > 0 && (
                    <p className="text-xs text-gray-400">
                      Add ${(150 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="flex justify-between text-lg font-black border-t border-gray-100 pt-4 mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex gap-2 mb-6">
                  <input
                    placeholder="Promo code"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-black transition-colors"
                  />
                  <button className="bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-colors">
                    Apply
                  </button>
                </div>

                <button
                  onClick={() => setPage("Checkout")}
                  className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  Checkout {Icon.arrow}
                </button>

                <button
                  onClick={() => setPage("Products")}
                  className="w-full mt-3 text-center text-sm text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
