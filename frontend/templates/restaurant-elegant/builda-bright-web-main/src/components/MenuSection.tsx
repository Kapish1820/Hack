export default function MenuSection({ content }: any) {
  const items = content?.menuItems || [
    { name: "Grilled Salmon", price: "$24" },
    { name: "Truffle Pasta", price: "$28" },
    { name: "Steak Supreme", price: "$32" },
  ]

  return (
    <section className="px-10 py-20 bg-black text-white">
      <h2 className="text-4xl font-bold mb-12 text-center">Featured Menu</h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {items.map((item: any, index: number) => (
          <div key={index} className="flex justify-between border-b border-neutral-700 pb-4">
            <span>{item.name}</span>
            <span className="text-yellow-400">{item.price}</span>
          </div>
        ))}
      </div>
    </section>
  )
}