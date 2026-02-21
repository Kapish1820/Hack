'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, X, Sparkles, Zap } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'

function FadeInSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const handleCheckout = async (planId: string) => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        window.location.href = '/sign-in'
        return
      }

      const res = await fetch('http://localhost:5000/api/billing/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout failed', err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-6 py-20">

        {/* Hero */}
        <FadeInSection className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4 text-xs font-medium text-primary">
            <Sparkles className="mr-2 h-3 w-3" />
            Simple Pricing
          </Badge>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            Choose Your Plan
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Upgrade anytime and unlock powerful features.
          </p>
        </FadeInSection>

        {/* Billing Toggle */}
        <FadeInSection delay={100} className="mb-12 flex justify-center">
          <div className="inline-flex rounded-xl border border-border bg-card p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground'
              }`}
            >
              Yearly
            </button>
          </div>
        </FadeInSection>

        {/* Pricing Cards */}
        <FadeInSection delay={200} className="grid gap-8 md:grid-cols-3">
          {PRODUCTS.map((product) => {
            const isPopular = product.tier === 'pro'
            const displayPrice =
              billingCycle === 'yearly'
                ? Math.floor((product.priceInCents * 12 * 0.8) / 100)
                : product.priceInCents / 100

            return (
              <Card
                key={product.id}
                className={`relative flex flex-col transition-all duration-300 ${
                  isPopular
                    ? 'border-primary/50 shadow-2xl shadow-primary/20 scale-105'
                    : 'border-border/50 hover:border-primary/30 hover:shadow-xl'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="gap-1.5 bg-gradient-to-r from-primary to-accent">
                      <Zap className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>

                  <div className="mt-6 flex items-baseline gap-1">
                    {product.priceInCents === 0 ? (
                      <span className="text-3xl font-bold">Free</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">
                          ${displayPrice}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-6">
                  {product.priceInCents === 0 ? (
                    <Link href="/sign-up" className="w-full">
                      <Button variant="outline" className="w-full">
                        Get Started Free
                      </Button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleCheckout(product.id)}
                      className="w-full rounded-lg px-4 py-3 font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all"
                    >
                      Choose Plan
                    </button>
                  )}

                  <div className="flex-1 space-y-3 border-t border-border pt-6">
                    {product.features?.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </FadeInSection>
      </main>
    </div>
  )
}