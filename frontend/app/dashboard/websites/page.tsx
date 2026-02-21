import { WebsiteCard } from "@/components/website-card"

const allWebsites = [
  { name: "Acme Marketing", status: "published" as const, lastEdited: "2 hours ago", url: "https://acme.sitepilot.io" },
  { name: "Product Launch", status: "draft" as const, lastEdited: "1 day ago" },
  { name: "Company Blog", status: "published" as const, lastEdited: "3 days ago", url: "https://blog.acme.sitepilot.io" },
  { name: "Event Landing Page", status: "draft" as const, lastEdited: "5 days ago" },
  { name: "Developer Docs", status: "published" as const, lastEdited: "1 week ago", url: "https://docs.acme.sitepilot.io" },
  { name: "Careers Page", status: "draft" as const, lastEdited: "2 weeks ago" },
]

export default function WebsitesPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Websites
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage all your websites in one place.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {allWebsites.map((site) => (
          <WebsiteCard key={site.name} {...site} />
        ))}
      </div>
    </div>
  )
}
