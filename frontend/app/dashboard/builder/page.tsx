'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TemplateLibrary from "@/components/template/template-library"; // Import TemplateLibrary component
import { useDrag, useDrop } from "react-dnd"; // Import react-dnd hooks
import api from "@/lib/api"; // API utility for interacting with the backend

const BuilderPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [elements, setElements] = useState<any[]>([]);
  const router = useRouter();

  // Handle template selection
  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    setElements(template.layout); // Load the selected template's layout
  };

  // Handle saving the layout to the backend
  const handleSaveLayout = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/pages/save-layout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        elements,
        templateId: selectedTemplate._id, // Store which template user selected
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    router.push("/dashboard/websites");
  };

  // Move element logic
  const moveElement = (fromIndex: number, toIndex: number) => {
    const updatedElements = [...elements];
    const [movedElement] = updatedElements.splice(fromIndex, 1);
    updatedElements.splice(toIndex, 0, movedElement);
    setElements(updatedElements);
  };

  return (
    <div className="p-8">
      {!selectedTemplate ? (
        <TemplateLibrary onSelectTemplate={handleSelectTemplate} />
      ) : (
        <div>
          <h2 className="text-xl font-bold text-foreground">Edit Your Website</h2>

          <div style={{ position: "relative", height: "500px", border: "1px solid black" }}>
            {elements.map((element, index) => (
              <DraggableElement
                key={index}
                element={element}
                index={index}
                moveElement={moveElement}
                saveElementPosition={saveElementPosition}
              />
            ))}
          </div>

          <Button onClick={handleSaveLayout}>Save Layout</Button>
        </div>
      )}
    </div>
  );
};

// Draggable Element component
const DraggableElement = ({ element, index, moveElement, saveElementPosition }: any) => {
  const [, drag] = useDrag(() => ({
    type: "element",
    item: { index },
  }));

  const [, drop] = useDrop({
    accept: "element",
    hover: (item: any) => {
      if (item.index !== index) {
        moveElement(item.index, index);
        item.index = index;
      }
    },
  });

  const handleDragEnd = (e: any) => {
    const x = e.clientX;  // Get the X position after drag
    const y = e.clientY;  // Get the Y position after drag
    saveElementPosition(element._id, x, y);  // Save the position to the backend
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        position: "absolute",
        top: element.y,
        left: element.x,
        cursor: "pointer",
      }}
      onDragEnd={handleDragEnd}
    >
      {element.type === "text" ? (
        <p>{element.content}</p>
      ) : (
        <button>{element.content}</button>
      )}
    </div>
  );
};

// Save element position
const saveElementPosition = async (componentId: string, x: number, y: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/pages/update-component-position", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      pageId: "page_id_here",  // Replace with actual pageId
      componentId,
      x,
      y,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
  }
};

export default BuilderPage;