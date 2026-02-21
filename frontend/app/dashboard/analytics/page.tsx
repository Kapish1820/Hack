export default function AnalyticsPage() {
  const pageViews = [
    { page: "/", views: 2340, change: "+12%" },
    { page: "/about", views: 1230, change: "+8%" },
    { page: "/pricing", views: 890, change: "-3%" },
    { page: "/blog", views: 670, change: "+22%" },
    { page: "/contact", views: 450, change: "+5%" },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track performance across all your websites.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Total Visitors", value: "12,847", change: "+18.2%" },
          { label: "Page Views", value: "38,291", change: "+12.5%" },
          { label: "Avg. Session", value: "2m 34s", change: "+5.1%" },
          { label: "Bounce Rate", value: "42.3%", change: "-3.2%" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-1 text-xs text-success">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Visitors over time</h3>
        <div className="flex h-64 items-end gap-2">
          {[40, 55, 35, 60, 75, 50, 80, 65, 90, 70, 85, 95].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-primary/20 transition-colors hover:bg-primary/40"
                style={{ height: `${h}%` }}
              />
              <span className="text-[10px] text-muted-foreground">
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top pages table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-sm font-semibold text-foreground">Top Pages</h3>
        </div>
        <div className="divide-y divide-border">
          {pageViews.map((page) => (
            <div key={page.page} className="flex items-center justify-between px-6 py-3">
              <span className="text-sm font-mono text-foreground">{page.page}</span>
              <div className="flex items-center gap-6">
                <span className="text-sm text-foreground">{page.views.toLocaleString()} views</span>
                <span className="text-xs text-success">{page.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
