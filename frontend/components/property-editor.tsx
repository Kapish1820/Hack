"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function PropertyEditor() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center border-b border-border px-4 py-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Properties
        </h3>
      </div>
      <div className="flex flex-1 flex-col gap-5 overflow-auto p-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <p className="mb-1 text-xs font-medium text-foreground">Hero Section</p>
          <p className="text-[11px] text-muted-foreground">
            Edit the hero section of your website
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="heading" className="text-xs">Heading</Label>
          <Input
            id="heading"
            defaultValue="Welcome to Your Website"
            className="text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="subheading" className="text-xs">Subheading</Label>
          <Textarea
            id="subheading"
            defaultValue="This is a preview of your AI-generated website. Click on any section to edit it."
            className="min-h-[80px] resize-none text-sm"
          />
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <Label htmlFor="btn-text" className="text-xs">Button Text</Label>
          <Input id="btn-text" defaultValue="Get Started" className="text-sm" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="btn-link" className="text-xs">Button Link</Label>
          <Input id="btn-link" defaultValue="#" className="text-sm" />
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <Label className="text-xs">Font Size</Label>
          <Select defaultValue="xl">
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
              <SelectItem value="2xl">2X Large</SelectItem>
              <SelectItem value="3xl">3X Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3">
          <Label className="text-xs">Section Padding</Label>
          <Slider defaultValue={[64]} max={128} step={8} />
          <span className="text-[11px] text-muted-foreground">64px</span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <Label htmlFor="show-bg" className="text-xs">Background Image</Label>
          <Switch id="show-bg" />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-badge" className="text-xs">Show Badge</Label>
          <Switch id="show-badge" defaultChecked />
        </div>
      </div>
    </div>
  )
}
