"use client"

import { useState } from "react"
import Link from "next/link"
import { SitePilotLogo } from "@/components/site-pilot-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowRight, Check } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import api from "@/lib/api"
import { useRouter } from "next/navigation"

const perks = [
  "3 free websites to start",
  "50 AI generations per month",
  "No credit card required",
  "Cancel anytime",
]

export default function SignUpPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await api.post("/auth/signup", {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
        organizationName: `${form.firstName}'s Workspace`,
      })

      localStorage.setItem("token", res.data.token)

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Start building beautiful websites with AI
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label>First name</Label>
                <Input
                  required
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Last name</Label>
                <Input
                  required
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
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

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden flex-1 lg:flex items-center justify-center border-l border-border">
        <ul className="flex flex-col gap-3">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}