export default function Footer({ setPage }) {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-sm">Q</span>
              </div>
              <span className="font-black text-xl">QPICK</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Curated streetwear and performance gear for those who move fast.
            </p>
          </div>
          {[
            {
              title: "Shop",
              links: ["All Products", "New Arrivals", "Sale", "Bestsellers"],
            },
            { title: "Company", links: ["About", "Careers", "Press", "Blog"] },
            {
              title: "Support",
              links: ["FAQ", "Shipping", "Returns", "Contact"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() =>
                        setPage(l === "Contact" ? "Contact" : "Products")
                      }
                      className="text-gray-500 text-sm hover:text-white transition-colors"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 QPICK. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Built with React + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
