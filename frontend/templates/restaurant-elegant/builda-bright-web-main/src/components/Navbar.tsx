'use client'

export default function Navbar({
  navigate,
}: {
  navigate: (path: string) => void
}) {
  return (
    <nav className="flex justify-between items-center px-10 py-6 border-b border-neutral-800 bg-black">
      <h1 className="text-2xl font-bold tracking-wide">
        Restaurant Elegant
      </h1>

      <div className="flex gap-8 uppercase text-sm tracking-widest">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/menu")}>Menu</button>
        <button onClick={() => navigate("/about")}>About</button>
        <button onClick={() => navigate("/contact")}>Contact</button>
      </div>
    </nav>
  )
}