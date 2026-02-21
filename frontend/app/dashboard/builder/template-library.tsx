import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";  // Custom button component
import api from "@/lib/api"; // API utility to fetch templates

const TemplateLibrary = ({ onSelectTemplate }: { onSelectTemplate: Function }) => {
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const res = await api.get("/templates");  // Fetch templates from your backend
      setTemplates(res.data);  // Populate the templates list
    };

    fetchTemplates();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground">Select a Template</h2>
      <ul>
        {templates.map((template) => (
          <li key={template._id} className="my-4">
            <Button onClick={() => onSelectTemplate(template)}>
              {template.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateLibrary;