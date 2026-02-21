export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  images?: string[]
  features?: string[]
  tier?: 'starter' | 'pro' | 'enterprise'
}

// Source of truth for all products
// All UI to display products should pull from this array
// IDs passed to the checkout session should be the same as IDs from this array
export const PRODUCTS: Product[] = [
  {
    id: 'starter-plan',
    name: 'Starter',
    description: 'Perfect for personal projects and experiments',
    priceInCents: 0, // Free
    tier: 'starter',
    features: [
      '3 websites',
      '1,000 monthly visits',
      'AI generations (50/mo)',
      'Community support',
      'Free subdomain',
    ],
  },
  {
    id: 'pro-plan',
    name: 'Pro',
    description: 'For freelancers and growing businesses',
    priceInCents: 2900, // $29.00
    tier: 'pro',
    features: [
      'Unlimited websites',
      '100,000 monthly visits',
      'AI generations (unlimited)',
      'Priority support',
      'Custom domains',
      'Analytics dashboard',
      'Team collaboration (5 seats)',
    ],
  },
  {
    id: 'enterprise-plan',
    name: 'Enterprise',
    description: 'For agencies and large teams',
    priceInCents: 9900, // $99.00
    tier: 'enterprise',
    features: [
      'Everything in Pro',
      'Unlimited visits',
      'White-label branding',
      'Dedicated account manager',
      'SSO & SAML',
      'SLA guarantee',
      'Unlimited team seats',
      'API access',
    ],
  },
]
