export default function SaaSModern({ content }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      
      <section className="text-center py-32">
        <h1 className="text-5xl font-bold">
          {content?.hero?.heading || "Default Heading"}
        </h1>

        <p className="mt-6 text-xl">
          {content?.hero?.subheading || "Default subheading"}
        </p>

        <button className="mt-8 px-8 py-3 bg-white text-black rounded">
          {content?.hero?.cta || "Get Started"}
        </button>
      </section>

    </div>
  )
}