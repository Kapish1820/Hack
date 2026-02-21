'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, X, Sparkles, Zap, Shield } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import Checkout from '@/components/checkout'

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
      { threshold: 0.15 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function MeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="animate-morph animate-pulse-glow absolute -top-40 -right-40 h-[600px] w-[600px] bg-primary/10 blur-[100px]" />
      <div
        className="animate-morph absolute top-1/3 -left-32 h-[400px] w-[400px] bg-accent/8 blur-[80px]"
        style={{ animationDelay: '-3s' }}
      />
      <div className="animate-float-slow absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[60px]" />
      <div
        className="animate-pulse-glow absolute -bottom-20 left-1/3 h-[350px] w-[350px] bg-accent/6 blur-[90px]"
        style={{ animationDelay: '-5s' }}
      />
    </div>
  )
}

const comparisonFeatures = [
  { name: 'Websites', feature: true },
  { name: 'Monthly Visits', feature: true },
  { name: 'AI Generations', feature: true },
  { name: 'Support', feature: true },
  { name: 'Custom Domains', starter: false, pro: true, enterprise: true },
  { name: 'Analytics', starter: false, pro: true, enterprise: true },
  { name: 'Team Collaboration', starter: false, pro: true, enterprise: true },
  { name: 'White-label', starter: false, pro: false, enterprise: true },
  { name: 'SSO & SAML', starter: false, pro: false, enterprise: true },
  { name: 'API Access', starter: false, pro: false, enterprise: true },
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const proPlan = PRODUCTS.find((p) => p.id === 'pro-plan')
  const enterprisePlan = PRODUCTS.find((p) => p.id === 'enterprise-plan')

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <MeshBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold text-foreground">
              SitePilot
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-foreground hover:bg-secondary">
                Back to Home
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          {/* Hero Section */}
          <FadeInSection className="mb-16 text-center">
            <Badge variant="secondary" className="mb-4 text-xs font-medium text-primary">
              <Sparkles className="mr-2 h-3 w-3" />
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Choose Your Plan
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Whether you're just starting out or managing an enterprise, we have the perfect plan for you. Start free, upgrade anytime.
            </p>
          </FadeInSection>

          {/* Billing Toggle */}
          <FadeInSection delay={100} className="mb-12 flex justify-center">
            <div className="inline-flex rounded-xl border border-border bg-card/50 p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground hover:text-foreground'
                }`}
              >
                Yearly
                <Badge variant="destructive" className="ml-2 text-xs">
                  Save 20%
                </Badge>
              </button>
            </div>
          </FadeInSection>

          {/* Pricing Cards */}
          <FadeInSection delay={200} className="mb-20 grid gap-8 md:grid-cols-3">
            {PRODUCTS.map((product, idx) => {
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
                      ? 'border-primary/50 shadow-2xl shadow-primary/20 scale-105 md:scale-105'
                      : 'border-border/50 hover:border-primary/30 hover:shadow-xl'
                  } ${selectedPlan === product.id ? 'ring-2 ring-primary' : ''}`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="gap-1.5 bg-gradient-to-r from-primary to-accent">
                        <Zap className="h-3 w-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <CardDescription className="mt-2">{product.description}</CardDescription>

                    {/* Pricing */}
                    <div className="mt-6 flex items-baseline gap-1">
                      {product.priceInCents === 0 ? (
                        <span className="text-3xl font-bold text-foreground">Free</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-foreground">${displayPrice}</span>
                          <span className="text-sm text-muted-foreground">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        </>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col gap-6">
                    {/* CTA Button */}
                    {product.priceInCents === 0 ? (
                      <Link href="/sign-up" className="w-full">
                        <Button size="lg" variant="outline" className="w-full text-foreground">
                          Get Started Free
                        </Button>
                      </Link>
                    ) : (
                      <button
                        onClick={() => setSelectedPlan(product.id)}
                        className={`w-full rounded-lg px-4 py-3 font-medium transition-all ${
                          selectedPlan === product.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {selectedPlan === product.id ? 'Selected' : 'Choose Plan'}
                      </button>
                    )}

                    {/* Features */}
                    <div className="flex-1 space-y-3 border-t border-border/50 pt-6">
                      {product.features?.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </FadeInSection>

          {/* Checkout Modal */}
          {selectedPlan && (
            <FadeInSection delay={300} className="mb-20">
              <Card className="border-primary/50 bg-card/50 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Complete Your Purchase
                  </CardTitle>
                  <CardDescription>
                    Secure payment powered by Stripe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Checkout productId={selectedPlan} />
                </CardContent>
              </Card>
            </FadeInSection>
          )}

          {/* Comparison Table */}
          <FadeInSection delay={400} className="mb-20">
            <div className="rounded-xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-foreground mb-8">Detailed Comparison</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-4 px-4 text-left font-semibold text-foreground">Features</th>
                        <th className="py-4 px-4 text-center font-semibold text-foreground">Starter</th>
                        <th className="py-4 px-4 text-center font-semibold text-foreground">Pro</th>
                        <th className="py-4 px-4 text-center font-semibold text-foreground">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((item) => (
                        <tr key={item.name} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                          <td className="py-4 px-4 text-sm font-medium text-foreground">{item.name}</td>
                          <td className="py-4 px-4 text-center">
                            {item.feature ? (
                              <Check className="mx-auto h-5 w-5 text-primary" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-muted-foreground" />
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {(item as any).pro || item.feature ? (
                              <Check className="mx-auto h-5 w-5 text-primary" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-muted-foreground" />
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {(item as any).enterprise || item.feature ? (
                              <Check className="mx-auto h-5 w-5 text-primary" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-muted-foreground" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* FAQ-like section */}
          <FadeInSection delay={500} className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about our pricing.</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'Can I change plans anytime?',
                  a: 'Yes! Upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'We offer a 30-day money-back guarantee if you\'re not satisfied with your plan.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, including Visa, Mastercard, American Express, and more through Stripe.',
                },
                {
                  q: 'Is there a contract or long-term commitment?',
                  a: 'No contracts! Pay month-to-month or save 20% with annual billing. Cancel anytime.',
                },
              ].map((item) => (
                <Card key={item.q} className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{item.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeInSection>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-24">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              <div>
                <h3 className="font-bold text-foreground">SitePilot</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Websites that build themselves.
                </p>
              </div>
              <div className="flex gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Product</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <a href="#" className="block hover:text-foreground transition-colors">Features</a>
                    <a href="#" className="block hover:text-foreground transition-colors">Pricing</a>
                    <a href="#" className="block hover:text-foreground transition-colors">Docs</a>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Company</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <a href="#" className="block hover:text-foreground transition-colors">About</a>
                    <a href="#" className="block hover:text-foreground transition-colors">Blog</a>
                    <a href="#" className="block hover:text-foreground transition-colors">Contact</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-border/50 pt-8 flex flex-col gap-4 md:flex-row md:justify-between text-sm text-muted-foreground">
              <p>&copy; 2024 SitePilot. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
