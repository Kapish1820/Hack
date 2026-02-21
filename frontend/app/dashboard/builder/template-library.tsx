'use client'

import { useEffect, useState } from "react"
import { TEMPLATE_REGISTRY } from "@/templates"

export default function TemplateLibrary({ onSelectTemplate }: any) {
  const [templates, setTemplates] = useState<any[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/templates")
      .then(res => res.json())
      .then(data => setTemplates(data))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">
        Choose a Template
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templates.map((template) => {
          const TemplateComponent =
            TEMPLATE_REGISTRY[template.id]

          if (!TemplateComponent) return null

          return (
            <div
              key={template._id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer bg-white"
              onClick={() => onSelectTemplate(template)}
            >
              {/* PREVIEW WINDOW */}
              <div className="relative h-[420px] bg-neutral-900 rounded-t-xl overflow-hidden">

  {/* Browser Top Bar */}
  <div className="h-8 bg-neutral-800 flex items-center px-3 gap-2">
    <div className="w-3 h-3 bg-red-500 rounded-full" />
    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
    <div className="w-3 h-3 bg-green-500 rounded-full" />
  </div>

  {/* Preview Viewport */}
  <div className="absolute top-8 left-0 right-0 bottom-0 flex justify-center overflow-hidden">

    <div
      style={{
        width: "1200px",
        transform: "scale(0.5)",
        transformOrigin: "top center"
      }}
      className="pointer-events-none"
    >
      <TemplateComponent content={{}} />
    </div>

  </div>
</div>

              <div className="p-4 border-t bg-white">
                <h3 className="font-semibold text-lg">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {template.category || "General"}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}