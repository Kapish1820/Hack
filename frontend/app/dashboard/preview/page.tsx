import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PreviewPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Preview toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            Acme Marketing
          </span>
          <span className="rounded bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
            Published
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/builder">
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Button size="sm">Publish</Button>
        </div>
      </div>

      {/* Website preview */}
      <div className="flex-1 overflow-auto bg-card">
        {/* Navigation */}
        <nav className="border-b border-border">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary" />
              <span className="text-lg font-bold text-foreground">Acme</span>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-sm font-medium text-foreground">Home</span>
              <span className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </span>
              <span className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </span>
              <span className="text-sm text-muted-foreground hover:text-foreground">
                About
              </span>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="px-8 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              New: AI-Powered Workflows
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-foreground text-balance">
              Build the future with intelligent automation
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
              Acme helps teams ship faster with AI-powered tools that automate
              the mundane and amplify creativity. Join 10,000+ teams already
              building with us.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button size="lg" className="px-8">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-foreground">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border bg-muted/30 px-8 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Everything you need to ship faster
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Powerful features designed for modern teams. From ideation to
                production in record time.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  title: "AI Assistant",
                  desc: "Let AI handle repetitive tasks so your team can focus on what matters most.",
                },
                {
                  title: "Real-time Collaboration",
                  desc: "Work together seamlessly with live cursors, comments, and instant sync.",
                },
                {
                  title: "Advanced Analytics",
                  desc: "Get deep insights into performance with customizable dashboards and reports.",
                },
                {
                  title: "Custom Workflows",
                  desc: "Build automated workflows that adapt to your team's unique processes.",
                },
                {
                  title: "Enterprise Security",
                  desc: "SOC 2 compliant with SSO, audit logs, and granular access controls.",
                },
                {
                  title: "API First",
                  desc: "Extend and integrate with a powerful REST and GraphQL API.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <div className="h-5 w-5 rounded bg-primary/30" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to get started?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Join thousands of teams already building with Acme. Start your
              free 14-day trial today.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button size="lg" className="px-8">
                Start Free Trial
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/30 px-8 py-10">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary" />
              <span className="text-sm font-semibold text-foreground">
                Acme
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-muted-foreground">Privacy</span>
              <span className="text-xs text-muted-foreground">Terms</span>
              <span className="text-xs text-muted-foreground">Contact</span>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; 2026 Acme. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
