import { cn } from "@/lib/utils"

export function SitePilotLogo({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-primary to-accent opacity-80" />
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="relative text-primary-foreground"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M2 17l10 5 10-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12l10 5 10-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {!iconOnly && (
        <span className="text-lg font-bold tracking-tight text-foreground">
          Site<span className="text-primary">Pilot</span>
        </span>
      )}
    </div>
  )
}
