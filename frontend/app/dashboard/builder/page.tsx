import { AIControls } from "@/components/ai-controls"
import { PageList } from "@/components/page-list"
import { BuilderCanvas } from "@/components/builder-canvas"
import { PropertyEditor } from "@/components/property-editor"

export default function BuilderPage() {
  return (
    <div className="flex h-full flex-col">
      <AIControls />
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Page list */}
        <div className="w-56 shrink-0 border-r border-border bg-card">
          <PageList />
        </div>

        {/* Center panel - Canvas */}
        <div className="flex-1">
          <BuilderCanvas />
        </div>

        {/* Right panel - Property editor */}
        <div className="w-72 shrink-0 border-l border-border bg-card">
          <PropertyEditor />
        </div>
      </div>
    </div>
  )
}
