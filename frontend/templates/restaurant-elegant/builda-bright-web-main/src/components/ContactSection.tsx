export default function ContactSection({ content }: any) {
  return (
    <section className="px-10 py-20 bg-black text-center">
      <h2 className="text-4xl font-bold mb-10">Contact Us</h2>

      <div className="space-y-4 text-neutral-400">
        <p>Email: {content?.contactEmail || "info@restaurant.com"}</p>
        <p>Phone: {content?.contactPhone || "+1 234 567 890"}</p>
      </div>
    </section>
  )
}