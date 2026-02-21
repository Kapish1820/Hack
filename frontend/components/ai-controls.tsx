"use client"

import { Sparkles, Wand2, Eye, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AIControls() {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2.5">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Sparkles className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
          <Input
            placeholder="Describe changes... e.g. Make the hero section more modern"
            className="pl-9 text-sm"
          />
        </div>
        <Button size="sm" className="gap-1.5">
          <Wand2 className="h-3.5 w-3.5" />
          Generate
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          Improve
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-6 w-px bg-border" />
        <Button size="sm" variant="ghost" className="gap-1.5 text-muted-foreground">
          <Eye className="h-3.5 w-3.5" />
          Preview
        </Button>
        <Button size="sm" className="gap-1.5">
          <Globe className="h-3.5 w-3.5" />
          Publish
        </Button>
      </div>
    </div>
  )
}
