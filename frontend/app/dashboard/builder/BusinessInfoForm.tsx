'use client'

import { useState } from "react"

interface Props {
  template: any
  onSubmit: (businessInfo: any) => void
}

export default function BusinessInfoForm({ template, onSubmit }: Props) {
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    targetAudience: "",
    tone: "",
    services: ""
  })

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Tell us about your business
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="businessName"
          placeholder="Business Name"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="industry"
          placeholder="Industry (e.g. SaaS, Restaurant)"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="targetAudience"
          placeholder="Target Audience"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="tone"
          placeholder="Tone (Professional, Fun, Minimal)"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="services"
          placeholder="List your services"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded"
        >
          Generate Website
        </button>
      </form>
    </div>
  )
}