"use client"

import { useState } from "react"
import { Plus, Sparkles, Globe, ArrowUpRight, BarChart3, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WebsiteCard } from "@/components/website-card"
import Link from "next/link"

const mockWebsites = [
  {
    name: "Acme Marketing",
    status: "published" as const,
    lastEdited: "2 hours ago",
    url: "https://acme.sitepilot.io",
  },
  {
    name: "Product Launch",
    status: "draft" as const,
    lastEdited: "1 day ago",
  },
  {
    name: "Company Blog",
    status: "published" as const,
    lastEdited: "3 days ago",
    url: "https://blog.acme.sitepilot.io",
  },
  {
    name: "Event Landing Page",
    status: "draft" as const,
    lastEdited: "5 days ago",
  },
]

const stats = [
  { label: "Total Websites", value: "12", icon: Globe, change: "+2 this month" },
  { label: "Total Visits", value: "8.4K", icon: BarChart3, change: "+14% from last month" },
  { label: "Team Members", value: "6", icon: Users, change: "2 pending invites" },
]

export default function DashboardPage() {
  const [aiPrompt, setAiPrompt] = useState("")

  return (
    <div className="p-8">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Good morning, John
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {"Here's what's happening with your websites today."}
        </p>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/20"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Generator */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-primary/20 bg-card p-6">
        {/* Top animated bar */}
        <div className="absolute inset-x-0 top-0 h-0.5 animate-gradient-shift bg-gradient-to-r from-primary via-accent to-primary" />

        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4.5 w-4.5 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Generate with AI
            </h2>
            <p className="text-xs text-muted-foreground">Describe your website and let AI do the rest</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Input
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="A modern SaaS landing page for a project management tool..."
            className="flex-1 bg-secondary/50 text-foreground placeholder:text-muted-foreground"
          />
          <Link href="/dashboard/builder">
            <Button className="gap-1.5 whitespace-nowrap">
              <Sparkles className="h-4 w-4" />
              Generate
            </Button>
          </Link>
        </div>
      </div>

      {/* Websites grid */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">
          Your Websites
        </h2>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/builder">
            <Button size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New Website
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {mockWebsites.map((site) => (
          <WebsiteCard key={site.name} {...site} />
        ))}

        {/* Create new card */}
        <Link href="/dashboard/builder" className="group">
          <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card transition-all hover:border-primary/30 hover:bg-primary/[0.02]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary/10">
              <Plus className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              Create new website
            </span>
          </div>
        </Link>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/20">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary/10">
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              Import from Figma
            </h3>
            <p className="text-xs text-muted-foreground">
              Convert your Figma designs into live websites
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:text-primary group-hover:opacity-100" />
        </div>
        <div className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/20">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary/10">
            <Globe className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              Browse Templates
            </h3>
            <p className="text-xs text-muted-foreground">
              Start with a pre-built template and customize it
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:text-primary group-hover:opacity-100" />
        </div>
      </div>
    </div>
  )
}
