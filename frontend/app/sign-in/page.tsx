"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { jwtDecode } from "jwt-decode"
import axios from "axios"

import { SitePilotLogo } from "@/components/site-pilot-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface DecodedToken {
  userId: string
  tenantId: string
  role: string
  exp: number
}

export default function SignInPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      )

      const { token, user } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      // Decode user info
      const decoded: DecodedToken = jwtDecode(token)

      // Redirect
      router.push("/dashboard")

    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed"
      )
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
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/sign-up" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}