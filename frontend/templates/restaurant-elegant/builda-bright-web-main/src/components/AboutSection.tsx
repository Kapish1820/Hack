export default function AboutSection({ content }: any) {
  return (
    <section className="px-10 py-20 bg-neutral-950 text-center">
      <h2 className="text-4xl font-bold mb-6">Our Story</h2>

      <p className="max-w-3xl mx-auto text-neutral-400 leading-relaxed">
        {content?.aboutText ||
          "We blend tradition and innovation to create memorable culinary experiences."}
      </p>
    </section>
  )
}