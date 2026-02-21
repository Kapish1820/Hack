"use client"

import Link from "next/link"
import { Eye, Pencil, Globe, MoreHorizontal, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface WebsiteCardProps {
  name: string
  status: "draft" | "published"
  lastEdited: string
  url?: string
  thumbnail?: string
}

export function WebsiteCard({
  name,
  status,
  lastEdited,
  url,
}: WebsiteCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-[16/10] bg-secondary/50">
        {/* Website thumbnail placeholder with subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id={`grid-${name}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${name})`} />
          </svg>
        </div>
        <div className="relative flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <Globe className="h-8 w-8 opacity-40" />
          <span className="text-xs opacity-60">{name}</span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-background/60 group-hover:opacity-100 group-hover:backdrop-blur-sm">
          <Link href="/dashboard/builder">
            <Button size="sm" className="gap-1.5">
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
          </Link>
          <Link href="/dashboard/preview">
            <Button size="sm" variant="outline" className="gap-1.5 text-foreground hover:bg-secondary">
              <Eye className="h-3.5 w-3.5" />
              Preview
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-foreground">{name}</h3>
          <p className="text-xs text-muted-foreground">
            Edited {lastEdited}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn(
              "text-xs font-medium capitalize",
              status === "published"
                ? "bg-success/10 text-success"
                : "bg-primary/10 text-primary"
            )}
          >
            {status}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>
                <Pencil className="mr-2 h-3.5 w-3.5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="mr-2 h-3.5 w-3.5" />
                Preview
              </DropdownMenuItem>
              {url && (
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  Visit site
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Globe className="mr-2 h-3.5 w-3.5" />
                {status === "published" ? "Unpublish" : "Publish"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
