'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TemplateLibrary from "./template-library";
import BusinessInfoForm from "./BusinessInfoForm";
import { TEMPLATE_REGISTRY } from "@/templates";

export default function BuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const [aiContent, setAiContent] = useState<any>(null);
  const router = useRouter();

  // STEP 1: Template Selected
  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
  };

  // STEP 2: Business Info Submitted → Call AI
  const handleBusinessSubmit = async (info: any) => {
    setBusinessInfo(info);

    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/ai/customize-template",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          templateId: selectedTemplate.id, // IMPORTANT: use template.id
          businessInfo: info,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // AI returns structured content
    setAiContent(data.content);
  };

  const handleSaveWebsite = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/pages/save-layout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          content: aiContent,
        }),
      }
    );

    if (!res.ok) {
      const data = await res.json();
      alert(data.message);
      return;
    }

    router.push("/dashboard/websites");
  };

  // ----------------------------
  // FLOW CONTROL
  // ----------------------------

  if (!selectedTemplate) {
    return (
      <div className="p-8">
        <TemplateLibrary onSelectTemplate={handleSelectTemplate} />
      </div>
    );
  }

  if (!businessInfo) {
    return (
      <div className="p-8">
        <BusinessInfoForm
          template={selectedTemplate}
          onSubmit={handleBusinessSubmit}
        />
      </div>
    );
  }

  // ----------------------------
  // RENDER TEMPLATE
  // ----------------------------

  const TemplateComponent =
    TEMPLATE_REGISTRY[selectedTemplate.id];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP BAR */}
      <div className="flex justify-between items-center p-6 bg-white shadow">
        <h2 className="text-xl font-bold">
          Editing: {selectedTemplate.name}
        </h2>

        <Button onClick={handleSaveWebsite}>
          Save Website
        </Button>
      </div>

      {/* LIVE WEBSITE RENDER */}
      <div className="bg-white">
        {TemplateComponent && (
          <TemplateComponent content={aiContent || {}} />
        )}
      </div>

    </div>
  );
}