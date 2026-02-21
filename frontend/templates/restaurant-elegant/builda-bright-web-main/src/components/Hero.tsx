export default function Hero({ content }: any) {
  return (
    <section
      className="relative h-[80vh] flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1920&auto=format)"
      }}
    >
      <div className="bg-black/60 absolute inset-0" />

      <div className="relative z-10 px-6">
        <h2 className="text-5xl font-bold mb-6">
          {content?.businessName || "Elegant Dining"}
        </h2>

        <p className="text-xl mb-8 text-neutral-300">
          {content?.tagline || "An unforgettable dining experience."}
        </p>

        <button className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400">
          {content?.ctaText || "Reserve a Table"}
        </button>
      </div>
    </section>
  )
}