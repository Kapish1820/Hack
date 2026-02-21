"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { SitePilotLogo } from "@/components/site-pilot-logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Layers,
  Cpu,
  Check,
  ChevronRight,
  Star,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import SplineModel from "@/components/Model";

/* ─── Animated Background ─── */
function MeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Large morphing blob top-right */}
      <div className="animate-morph animate-pulse-glow absolute -top-40 -right-40 h-[600px] w-[600px] bg-primary/10 blur-[100px]" />
      {/* Accent blob left */}
      <div
        className="animate-morph absolute top-1/3 -left-32 h-[400px] w-[400px] bg-accent/8 blur-[80px]"
        style={{ animationDelay: "-3s" }}
      />
      {/* Small floating orb center */}
      <div className="animate-float-slow absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[60px]" />
      {/* Bottom accent glow */}
      <div
        className="animate-pulse-glow absolute -bottom-20 left-1/3 h-[350px] w-[350px] bg-accent/6 blur-[90px]"
        style={{ animationDelay: "-5s" }}
      />
    </div>
  );
}

/* ─── Orbiting particles around a center point ─── */
function OrbitRing() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* Ring visual */}
      <div className="animate-spin-slow absolute h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/[0.06]" />
      <div
        className="animate-spin-slow absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/[0.04]"
        style={{ animationDirection: "reverse" }}
      />

      {/* Orbiting dots */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-orbit absolute left-0 top-0"
          style={{
            ["--orbit-radius" as string]: `${150 + i * 50}px`,
            ["--orbit-duration" as string]: `${18 + i * 6}s`,
            animationDelay: `${i * -4}s`,
            animationDirection: i % 2 === 0 ? "normal" : "reverse",
          }}
        >
          <div
            className="h-2 w-2 rounded-full"
            style={{
              background:
                i % 2 === 0
                  ? "oklch(0.72 0.19 330 / 0.6)"
                  : "oklch(0.65 0.22 300 / 0.4)",
              boxShadow:
                i % 2 === 0
                  ? "0 0 12px oklch(0.72 0.19 330 / 0.4)"
                  : "0 0 12px oklch(0.65 0.22 300 / 0.3)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Particle Canvas ─── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getColors = useCallback(() => {
    if (typeof window === "undefined")
      return {
        dot1: "rgba(220,130,180,",
        dot2: "rgba(180,120,220,",
        line: "rgba(200,140,220,",
      };
    const isDark = document.documentElement.classList.contains("dark");
    return isDark
      ? {
          dot1: "rgba(220,130,180,",
          dot2: "rgba(180,120,220,",
          line: "rgba(200,140,220,",
        }
      : {
          dot1: "rgba(110,40,150,",
          dot2: "rgba(140,50,180,",
          line: "rgba(120,50,160,",
        };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }> = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function init() {
      particles.length = 0;
      const count = Math.min(
        60,
        Math.floor((canvas!.offsetWidth * canvas!.offsetHeight) / 12000),
      );
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas!.offsetWidth,
          y: Math.random() * canvas!.offsetHeight,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          hue: Math.random() > 0.5 ? 330 : 300,
        });
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas!.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.offsetHeight) p.vy *= -1;

        const colors = getColors();
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle =
          p.hue === 330
            ? `${colors.dot1}${p.opacity})`
            : `${colors.dot2}${p.opacity})`;
        ctx!.fill();
      });

      const colors = getColors();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `${colors.line}${0.04 * (1 - dist / 100)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const handleResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [getColors]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/* ─── Animated counter ─── */
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const duration = 2000;
    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Scroll-triggered fade in ─── */
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Data ─── */
const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    desc: "Describe your vision and watch it materialize. Our AI understands context, brand identity, and modern design patterns.",
  },
  {
    icon: Zap,
    title: "Instant Deploy",
    desc: "One click to go live. Every site ships on a global edge network with automatic SSL and blazing performance.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "SOC 2 compliant with DDoS protection, automated backups, and granular access controls for your entire team.",
  },
  {
    icon: Globe,
    title: "Multi-Tenant Ready",
    desc: "Manage hundreds of sites from one dashboard. Custom domains, team permissions, and white-label support.",
  },
  {
    icon: Layers,
    title: "Component Library",
    desc: "Thousands of pre-built sections you can mix and match. Every component is responsive and accessible out of the box.",
  },
  {
    icon: Cpu,
    title: "Smart Optimization",
    desc: "Automatic image compression, code splitting, and lazy loading. Your sites score 95+ on Lighthouse without lifting a finger.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "0",
    desc: "For personal projects and experiments",
    features: [
      "3 websites",
      "1,000 monthly visits",
      "AI generations (50/mo)",
      "Community support",
      "Free subdomain",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "29",
    desc: "For freelancers and growing businesses",
    features: [
      "Unlimited websites",
      "100,000 monthly visits",
      "AI generations (unlimited)",
      "Priority support",
      "Custom domains",
      "Analytics dashboard",
      "Team collaboration (5 seats)",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "99",
    desc: "For agencies and large teams",
    features: [
      "Everything in Pro",
      "Unlimited visits",
      "White-label branding",
      "Dedicated account manager",
      "SSO & SAML",
      "SLA guarantee",
      "Unlimited team seats",
      "API access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, Loomify",
    quote:
      "SitePilot replaced our entire web team's workflow. We ship sites 10x faster now.",
    rating: 5,
  },
  {
    name: "Marcus Wright",
    role: "CTO, Buildwell",
    quote:
      "The AI generation is genuinely impressive. It understands brand context better than most designers.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Marketing Lead, Nexo",
    quote:
      "We manage 40+ client sites from one dashboard. The multi-tenant setup is flawless.",
    rating: 5,
  },
];

/* ─── Main Landing Page ─── */
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      <MeshBackground />

      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <SitePilotLogo />
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="text-foreground hover:bg-secondary"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="gap-1.5">
                Get Started
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          <button
            className="text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-sm text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#about"
                className="text-sm text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#pricing"
                className="text-sm text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-sm text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <div className="flex items-center gap-3 pt-2">
                <ThemeToggle />
                <Link href="/sign-in" className="flex-1">
                  <Button variant="outline" className="w-full text-foreground">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" className="flex-1">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen overflow-hidden bg-background">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[5%] top-[10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute right-[20%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-accent/8 blur-[100px]" />
        </div>

        {/* Spline — pinned to right half, fully interactive */}
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <SplineModel />
          {/* Covers the "Built with Spline" watermark */}
          <div className="absolute bottom-3 right-3 z-50 h-15 w-44 bg-background rounded-md" />
        </div>

        {/* Text — left half only, normal flow */}
        <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 lg:w-1/2 lg:px-16">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              AI Website Builder
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl xl:text-7xl">
            Websites that
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              build themselves
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Describe your vision. Our AI generates, customizes, and deploys
            production-ready websites in seconds — no code required.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2 px-8 text-base font-semibold">
                Start Building Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 text-base text-muted-foreground hover:text-foreground"
              >
                Sign In
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["S", "M", "A", "J"].map((initial, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary/20 text-xs font-bold text-primary"
                >
                  {initial}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Loved by{" "}
                <span className="font-semibold text-foreground">12,000+</span>{" "}
                teams
              </p>
            </div>
          </div>
        </div>

        {/* Floating badges over the model */}
        <div className="animate-float-fast pointer-events-none absolute bottom-20 right-[48%] z-20 hidden rounded-xl border border-border/50 bg-card/80 px-4 py-2.5 shadow-xl backdrop-blur-md lg:flex">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Zap className="h-4 w-4 text-primary" />
            Built in 90s
          </span>
        </div>

        <div
          className="animate-float-fast pointer-events-none absolute right-8 top-28 z-20 hidden rounded-xl border border-border/50 bg-card/80 px-4 py-2.5 shadow-xl backdrop-blur-md lg:flex"
          style={{ animationDelay: "-2s" }}
        >
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            AI-Powered
          </span>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="relative z-10 border-y border-border bg-card/30 backdrop-blur-sm">
        <div className="mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-4">
          {[
            { value: 12000, suffix: "+", label: "Websites Built" },
            { value: 98, suffix: "%", label: "Uptime SLA" },
            { value: 3, suffix: "s", label: "Avg. Build Time" },
            { value: 150, suffix: "+", label: "Countries Served" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-1 px-6 py-10 ${i < 3 ? "border-r border-border" : ""}`}
            >
              <span className="text-3xl font-bold text-primary md:text-4xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section id="about" className="relative z-10 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeInSection>
              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 text-xs font-medium text-primary"
                >
                  About SitePilot
                </Badge>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  The future of web creation is{" "}
                  <span className="text-primary">conversational</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  SitePilot was born from a simple idea: building a website
                  should be as easy as describing it. Our AI engine combines
                  deep understanding of design principles, brand identity, and
                  modern web standards to generate sites that look hand-crafted
                  by a senior design team.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  We serve everyone from solo founders shipping their first
                  landing page to agencies managing hundreds of client sites.
                  Our multi-tenant architecture means you can scale without
                  limits, and our AI keeps getting smarter with every site we
                  build.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link href="/sign-up">
                    <Button className="gap-1.5">
                      Try It Now <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={200}>
              <div className="relative">
                {/* Decorative card stack */}
                <div className="relative rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive/60" />
                    <div className="h-3 w-3 rounded-full bg-warning/60" />
                    <div className="h-3 w-3 rounded-full bg-success/60" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="h-2.5 w-3/4 rounded-full bg-foreground/10" />
                        <div className="mt-2 h-2 w-1/2 rounded-full bg-foreground/5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="aspect-[4/3] rounded-lg bg-primary/[0.06] border border-primary/10"
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 flex-1 rounded-lg bg-primary/10" />
                      <div className="h-8 w-20 rounded-lg bg-accent/10" />
                    </div>
                  </div>
                </div>
                {/* Floating label */}
                <div className="animate-float-fast absolute -right-4 -bottom-4 rounded-xl border border-border bg-card px-4 py-2.5 shadow-xl">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Zap className="h-4 w-4 text-primary" />
                    Built in 3s
                  </span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section
        id="features"
        className="relative z-10 border-y border-border bg-card/20 px-6 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="mb-16 text-center">
              <Badge
                variant="secondary"
                className="mb-4 text-xs font-medium text-primary"
              >
                Features
              </Badge>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Everything you need,
                <br />
                <span className="text-primary">nothing you don{"'"}t</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Built for teams that move fast. Every feature eliminates
                friction between idea and live website.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <FadeInSection key={f.title} delay={i * 80}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  {/* Top shimmer on hover */}
                  <div className="absolute inset-x-0 top-0 h-px overflow-hidden opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="animate-shimmer h-full w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  </div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="relative z-10 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="mb-16 text-center">
              <Badge
                variant="secondary"
                className="mb-4 text-xs font-medium text-primary"
              >
                Pricing
              </Badge>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Simple, transparent pricing
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Start free. Upgrade when you need more power. No hidden fees,
                cancel anytime.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((plan, i) => (
              <FadeInSection key={plan.name} delay={i * 120}>
                <div
                  className={`relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-300 ${
                    plan.popular
                      ? "border-primary/40 bg-primary/[0.04] shadow-lg shadow-primary/5"
                      : "border-border bg-card hover:border-primary/20"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute inset-x-0 top-0 h-1 animate-gradient-shift bg-gradient-to-r from-primary via-accent to-primary" />
                  )}
                  {plan.popular && (
                    <Badge className="mb-4 w-fit text-xs">Most Popular</Badge>
                  )}
                  <h3 className="text-lg font-bold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.desc}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up" className="mt-8">
                    <Button
                      className="w-full gap-1.5"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section
        id="testimonials"
        className="relative z-10 border-y border-border bg-card/20 px-6 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="mb-16 text-center">
              <Badge
                variant="secondary"
                className="mb-4 text-xs font-medium text-primary"
              >
                Testimonials
              </Badge>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Loved by teams everywhere
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeInSection key={t.name} delay={i * 100}>
                <div className="flex flex-col rounded-2xl border border-border bg-card p-7">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {`"${t.quote}"`}
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="relative z-10 px-6 py-24 lg:py-32">
        <FadeInSection>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Ready to build something{" "}
              <span className="animate-gradient-shift bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                extraordinary
              </span>
              ?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
              Join thousands of teams shipping beautiful websites with AI. Free
              to start, no credit card required.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="gap-2 px-8 text-base font-semibold"
                >
                  Start Building Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-border px-8 text-base text-foreground hover:bg-secondary"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 border-t border-border px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <SitePilotLogo />
              <p className="mt-3 text-sm text-muted-foreground">
                AI-powered website builder for modern teams.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Product
              </h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="#features"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Company
              </h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="#about"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Legal
              </h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-border pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; 2026 SitePilot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
