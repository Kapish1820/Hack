"use client"

import { cn } from "@/lib/utils"
import { Monitor, Tablet, Smartphone, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function BuilderCanvas() {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop")

  return (
    <div className="flex h-full flex-col bg-muted/50">
      {/* Viewport toolbar */}
      <div className="flex items-center justify-center gap-1 border-b border-border bg-card px-4 py-2">
        <Button
          variant={viewport === "desktop" ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={() => setViewport("desktop")}
        >
          <Monitor className="h-4 w-4" />
          <span className="sr-only">Desktop</span>
        </Button>
        <Button
          variant={viewport === "tablet" ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={() => setViewport("tablet")}
        >
          <Tablet className="h-4 w-4" />
          <span className="sr-only">Tablet</span>
        </Button>
        <Button
          variant={viewport === "mobile" ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={() => setViewport("mobile")}
        >
          <Smartphone className="h-4 w-4" />
          <span className="sr-only">Mobile</span>
        </Button>
        <div className="mx-2 h-4 w-px bg-border" />
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ZoomOut className="h-4 w-4" />
          <span className="sr-only">Zoom out</span>
        </Button>
        <span className="min-w-[3rem] text-center text-xs text-muted-foreground">100%</span>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Zoom in</span>
        </Button>
      </div>

      {/* Canvas area */}
      <div className="flex flex-1 items-start justify-center overflow-auto p-8">
        <div
          className={cn(
            "rounded-lg border border-border bg-card shadow-sm transition-all",
            viewport === "desktop" && "w-full max-w-4xl",
            viewport === "tablet" && "w-[768px]",
            viewport === "mobile" && "w-[375px]"
          )}
        >
          {/* Simulated website hero */}
          <div className="border-b border-border px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-primary/20" />
                <div className="h-3 w-20 rounded bg-muted" />
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2.5 w-12 rounded bg-muted" />
                <div className="h-2.5 w-12 rounded bg-muted" />
                <div className="h-2.5 w-12 rounded bg-muted" />
                <div className="h-7 w-20 rounded-md bg-primary/20" />
              </div>
            </div>
          </div>

          {/* Hero section */}
          <div
            className="group relative cursor-pointer border-2 border-transparent px-8 py-16 text-center transition-colors hover:border-primary/40"
          >
            <div className="absolute -top-3 left-3 hidden rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground group-hover:block">
              Hero
            </div>
            <div className="mx-auto mb-4 h-3 w-48 rounded bg-muted" />
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              Welcome to Your Website
            </h2>
            <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground">
              This is a preview of your AI-generated website. Click on any
              section to edit it.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-9 w-28 rounded-md bg-primary" />
              <div className="h-9 w-28 rounded-md border border-border bg-card" />
            </div>
          </div>

          {/* Features section */}
          <div className="group relative cursor-pointer border-2 border-transparent px-8 py-12 transition-colors hover:border-primary/40">
            <div className="absolute -top-3 left-3 hidden rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground group-hover:block">
              Features
            </div>
            <div className="mx-auto mb-8 h-3 w-32 rounded bg-muted" />
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-3 rounded-lg border border-border p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10" />
                  <div className="h-2.5 w-20 rounded bg-muted" />
                  <div className="h-2 w-full rounded bg-muted" />
                  <div className="h-2 w-3/4 rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact section */}
          <div className="group relative cursor-pointer border-2 border-transparent bg-muted/30 px-8 py-12 transition-colors hover:border-primary/40">
            <div className="absolute -top-3 left-3 hidden rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground group-hover:block">
              Contact
            </div>
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-6 h-3 w-28 rounded bg-muted" />
              <div className="flex flex-col gap-3">
                <div className="h-9 w-full rounded-md border border-border bg-card" />
                <div className="h-9 w-full rounded-md border border-border bg-card" />
                <div className="h-20 w-full rounded-md border border-border bg-card" />
                <div className="h-9 w-full rounded-md bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
