"use client"

import { useState } from "react"
import Link from "next/link"
import { SitePilotLogo } from "@/components/site-pilot-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowRight, Check } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const perks = [
  "3 free websites to start",
  "50 AI generations per month",
  "No credit card required",
  "Cancel anytime",
]

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="relative flex min-h-screen bg-background">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-morph animate-pulse-glow absolute -top-32 -left-32 h-[500px] w-[500px] bg-accent/8 blur-[100px]" />
        <div className="animate-morph absolute bottom-0 -right-20 h-[400px] w-[400px] bg-primary/6 blur-[80px]" style={{ animationDelay: "-4s" }} />
      </div>

      {/* Theme toggle */}
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      {/* Left form panel */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-2 lg:hidden">
            <SitePilotLogo className="mb-8" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground">Create your account</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Start building beautiful websites with AI</p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName" className="text-foreground">First name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  autoComplete="given-name"
                  className="bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName" className="text-foreground">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  required
                  autoComplete="family-name"
                  className="bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                required
                autoComplete="email"
                className="bg-secondary/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                required
                autoComplete="new-password"
                className="bg-secondary/50 text-foreground placeholder:text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>

            <Button type="submit" className="mt-1 w-full gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or sign up with</span></div>
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2 text-foreground hover:bg-secondary">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="flex-1 gap-2 text-foreground hover:bg-secondary">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right branding panel */}
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden border-l border-border bg-card/30 p-12 lg:flex">
        <div className="relative z-10">
          <SitePilotLogo />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-foreground">Start free, scale infinitely</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Everything you need to build professional websites, powered by AI that
            understands design, copy, and code.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative z-10 text-xs text-muted-foreground">&copy; 2026 SitePilot</p>

        {/* Decorative orbit ring */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin-slow h-[400px] w-[400px] rounded-full border border-accent/[0.06]" />
          <div className="animate-spin-slow absolute inset-8 rounded-full border border-primary/[0.04]" style={{ animationDirection: "reverse" }} />
        </div>
      </div>
    </div>
  )
}
