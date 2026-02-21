"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your workspace and account settings.
        </p>
      </div>

      <Tabs defaultValue="general" className="max-w-2xl">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-1 text-sm font-semibold text-foreground">
              Workspace Name
            </h3>
            <p className="mb-4 text-xs text-muted-foreground">
              This is your workspace display name.
            </p>
            <Input defaultValue="Acme Corp" className="max-w-sm" />
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-1 text-sm font-semibold text-foreground">
              Workspace URL
            </h3>
            <p className="mb-4 text-xs text-muted-foreground">
              Your workspace URL on SitePilot.
            </p>
            <div className="flex max-w-sm items-center gap-0">
              <span className="flex h-9 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                sitepilot.io/
              </span>
              <Input
                defaultValue="acme-corp"
                className="rounded-l-none"
              />
            </div>
          </div>

          <Separator />

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-1 text-sm font-semibold text-foreground">
              Notifications
            </h3>
            <p className="mb-4 text-xs text-muted-foreground">
              Configure how you receive notifications.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: "Email notifications", desc: "Receive updates via email", checked: true },
                { label: "Push notifications", desc: "Browser push notifications", checked: false },
                { label: "Weekly digest", desc: "Weekly summary of your analytics", checked: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">{item.label}</Label>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Team Members
            </h3>
            <div className="divide-y divide-border">
              {[
                { name: "John Doe", email: "john@acme.com", role: "Owner" },
                { name: "Jane Smith", email: "jane@acme.com", role: "Editor" },
                { name: "Bob Wilson", email: "bob@acme.com", role: "Viewer" },
              ].map((member) => (
                <div key={member.email} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                  <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button variant="outline" size="sm">
              Invite Member
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-1 text-sm font-semibold text-foreground">
              Current Plan
            </h3>
            <p className="mb-4 text-xs text-muted-foreground">
              {"You're on the Pro plan."}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">$29</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <Button variant="outline" size="sm" className="mt-4">
              Manage Subscription
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="domains" className="mt-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-1 text-sm font-semibold text-foreground">
              Custom Domains
            </h3>
            <p className="mb-4 text-xs text-muted-foreground">
              Add custom domains to your websites.
            </p>
            <div className="flex max-w-sm gap-2">
              <Input placeholder="yourdomain.com" />
              <Button>Add</Button>
            </div>
            <div className="mt-4 divide-y divide-border">
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">acme.com</p>
                  <p className="text-xs text-success">Verified</p>
                </div>
                <Button variant="ghost" size="sm" className="text-destructive">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
