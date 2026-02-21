"use client"

import { cn } from "@/lib/utils"
import { File, Home, User, Mail, Plus, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const defaultPages = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
]

export function PageList() {
  const [activePage, setActivePage] = useState("home")

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pages
        </h3>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
          <Plus className="h-3.5 w-3.5" />
          <span className="sr-only">Add page</span>
        </Button>
      </div>
      <div className="flex flex-col gap-0.5 p-2">
        {defaultPages.map((page) => (
          <button
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
              activePage === page.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <GripVertical className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-50" />
            <page.icon className="h-4 w-4" />
            <span>{page.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-auto border-t border-border p-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5 text-xs"
        >
          <File className="h-3.5 w-3.5" />
          Add Page
        </Button>
      </div>
    </div>
  )
}
