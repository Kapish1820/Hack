"use client"

import { useEffect, useState } from "react"
import { Plus, Sparkles, Globe, ArrowUpRight, BarChart3, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WebsiteCard } from "@/components/website-card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
interface User {
  id: string
  name: string
  email: string
  role: string
}

interface Website {
  _id: string
  name: string
  status: "DRAFT" | "LIVE"
  domain?: string
  createdAt: string
}

export default function DashboardPage() {
  const [aiPrompt, setAiPrompt] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [websites, setWebsites] = useState<Website[]>([])
  const [usage, setUsage] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (!token) {
      router.push("/sign-in")
      return
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [websitesRes, usageRes] = await Promise.all([
        api.get("/websites"),
        api.get("/usage")
      ])

      setWebsites(websitesRes.data)
      setUsage(usageRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  const websiteLimitReached =
    usage.usage.websites >= usage.limits.maxWebsites

  return (
    <div className="p-8">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Good morning, {user?.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You are on the {usage.plan} plan
        </p>
      </div>

      {/* Dynamic Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Total Websites"
          value={`${usage.usage.websites}/${usage.limits.maxWebsites}`}
          icon={Globe}
        />
        <StatCard
          label="Total Pages"
          value={`${usage.usage.pages}/${usage.limits.maxPages}`}
          icon={BarChart3}
        />
        <StatCard
          label="AI Usage"
          value={`${usage.usage.aiUsage}/${usage.limits.aiLimit}`}
          icon={Sparkles}
        />
      </div>

      {/* AI Generator */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-primary/20 bg-card p-6">
        <div className="mb-4 flex items-center gap-2.5">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">
            Generate with AI
          </h2>
        </div>

        <div className="flex gap-3">
          <Input
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="A modern SaaS landing page..."
          />
          <Link href="/dashboard/builder">
            <Button>Generate</Button>
          </Link>
        </div>
      </div>

      {/* Websites Section */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">
          Your Websites
        </h2>

        <Button
          size="sm"
          disabled={websiteLimitReached}
          onClick={() => router.push("/dashboard/builder")}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          New Website
        </Button>
      </div>

      {websiteLimitReached && (
        <p className="mb-4 text-sm text-red-500">
          Website limit reached. Upgrade to PRO.
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

  {/* If no websites → Empty state card */}
  {websites.length === 0 && (
    <div
      onClick={() => router.push("/dashboard/builder")}
      className="group flex aspect-16/10 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card transition-all hover:border-primary/30 hover:bg-primary/5"
    >
      <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
      <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
        You haven’t built anything yet. Start now.
      </p>
    </div>
  )}

  {/* Existing Websites */}
  {websites.map((site) => (
    <WebsiteCard
      key={site._id}
      name={site.name}
      status={site.status === "LIVE" ? "published" : "draft"}
      lastEdited={new Date(site.createdAt).toLocaleDateString()}
      url={site.domain}
    />
  ))}

  {/* Always show "Build More" card */}
  <div
    onClick={() => {
      if (websiteLimitReached && usage.plan !== "PRO") {
        router.push("/dashboard/settings") // or billing page
      } else {
        router.push("/dashboard/builder")
      }
    }}
    className="group flex aspect-16/10 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card transition-all hover:border-primary/30 hover:bg-primary/5"
  >
    <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />

    {websiteLimitReached && usage.plan !== "PRO" ? (
      <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
        Build more. Upgrade to PRO.
      </p>
    ) : (
      <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
        Build more.
      </p>
    )}
  </div>

</div>
    </div>
  )
}

/* Reusable Stat Card */
function StatCard({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  )
}