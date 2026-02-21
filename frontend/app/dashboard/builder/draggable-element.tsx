import { useDrag, useDrop } from "react-dnd";
import api from "@/lib/api"; // API utility to interact with the backend

const DraggableElement = ({ element, index, moveElement }: any) => {
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

  const saveElementPosition = async (x: number, y: number) => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/pages/update-component-position", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pageId: "page_id_here", // Actual pageId will come from the backend or URL
        componentId: element._id, // Actual componentId
        x,
        y,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
    }
  };

  const handleDragEnd = (e: any) => {
    const x = e.clientX;  // Get the X position after drag
    const y = e.clientY;  // Get the Y position after drag
    saveElementPosition(x, y);  // Save the position to the backend
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

export default DraggableElement;