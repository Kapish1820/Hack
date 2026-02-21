export default function GallerySection() {
  return (
    <section className="px-10 py-20 bg-neutral-950">
      <h2 className="text-4xl font-bold mb-12 text-center">Gallery</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((img) => (
          <img
            key={img}
            src={`https://source.unsplash.com/600x400/?restaurant,food&sig=${img}`}
            className="rounded-lg object-cover w-full h-64"
          />
        ))}
      </div>
    </section>
  )
}