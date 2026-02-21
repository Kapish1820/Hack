// TemplateLibrary.tsx

'use client'

import { useState, useEffect } from "react"
import { TEMPLATE_REGISTRY } from "@/templates/index"

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
          const TemplateComponent = TEMPLATE_REGISTRY[template.id]

          if (!TemplateComponent) return null

          return (
            <div
              key={template._id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer bg-white"
              onClick={() => onSelectTemplate(template)}
            >
              {/* PREVIEW WINDOW */}
              <div className="h-[400px] overflow-hidden bg-gray-100 relative">

                {/* Scale Down Real Template */}
                <div className="scale-[0.35] origin-top-left pointer-events-none">
                  <TemplateComponent content={{}} />
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