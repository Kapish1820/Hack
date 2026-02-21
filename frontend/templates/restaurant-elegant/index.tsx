'use client'

export default function RestaurantElegant({ content }: any) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-serif">

      {/* HERO SECTION */}
      <section
        className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage: `url(${content?.hero?.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide">
            {content?.hero?.heading || "An Unforgettable Dining Experience"}
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            {content?.hero?.subheading || "Where flavor meets elegance in every bite."}
          </p>

          <button className="mt-8 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
            {content?.hero?.cta || "Reserve a Table"}
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">
            {content?.about?.title || "Our Story"}
          </h2>

          <p className="text-gray-400 leading-relaxed">
            {content?.about?.description ||
              "Founded with a passion for culinary excellence, our restaurant blends tradition with innovation to create memorable dishes."}
          </p>
        </div>

        <div>
          <img
            src={content?.about?.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836"}
            alt="About"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* MENU SECTION */}
      <section className="py-24 bg-[#161616] px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            {content?.menu?.title || "Signature Dishes"}
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {(content?.menu?.items || [
              { name: "Truffle Pasta", price: "$24" },
              { name: "Grilled Salmon", price: "$29" },
              { name: "Classic Tiramisu", price: "$12" },
            ]).map((item: any, index: number) => (
              <div
                key={index}
                className="bg-[#1f1f1f] p-6 rounded-xl hover:bg-[#272727] transition"
              >
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="mt-2 text-gray-400">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          {content?.contact?.title || "Visit Us"}
        </h2>

        <p className="text-gray-400">
          {content?.contact?.address || "123 Gourmet Street, Culinary City"}
        </p>

        <p className="text-gray-400 mt-2">
          {content?.contact?.phone || "+1 (234) 567-890"}
        </p>

        <button className="mt-8 px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition">
          {content?.contact?.cta || "Get Directions"}
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} {content?.footer?.name || "Restaurant Elegant"}. All rights reserved.
      </footer>

    </div>
  );
}