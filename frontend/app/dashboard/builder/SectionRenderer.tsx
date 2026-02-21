'use client'

export default function SectionRenderer({ section, theme }: any) {

  if (section.type === "hero") {
    return (
      <div
        style={{
          width: section.width,
          height: section.height,
          background: "linear-gradient(to right, #2563eb, #9333ea)",
          fontFamily: theme?.fontFamily
        }}
        className="flex flex-col items-center justify-center text-white"
      >
        <h1 className="text-4xl font-bold">
          {section.content.heading || "Your Headline"}
        </h1>

        <p className="mt-4 text-lg">
          {section.content.subheading || "Your subheading"}
        </p>

        <button
          className="mt-6 px-6 py-2 bg-white text-black rounded"
        >
          {section.content.cta || "Get Started"}
        </button>
      </div>
    )
  }

  if (section.type === "features") {
    return (
      <div
        style={{
          width: section.width,
          height: section.height,
          fontFamily: theme?.fontFamily
        }}
        className="p-10 bg-gray-50"
      >
        <h2 className="text-3xl font-bold mb-6">
          {section.content.title || "Features"}
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {(section.content.features || []).map((feature: any, index: number) => (
            <div key={index} className="p-4 bg-white shadow rounded">
              {feature}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}