import type { JSX } from "react";
import React, { useState, useEffect, useRef } from "react";
import { NodeViewWrapper } from "@tiptap/react";

const ResizeAbleImageNodeView = ({
  node,
  updateAttributes,
  selected
}: any): JSX.Element => {
  const { src, alt, width, height } = node.attrs;
  const [isResizing, setIsResizing] = useState(false);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  const handleMouseDownControl = (e: React.MouseEvent) => {
    setIsResizing(true);
    startX.current = e.clientX;
    startWidth.current = parseFloat(width);
    e.preventDefault();
  };

  const handleMouseMoveControl = (e: MouseEvent) => {
    if (!isResizing) return;
    const newWidth = startWidth.current + (e.clientX - startX.current);
    updateAttributes({ width: `${newWidth}px` });
  };

  const handleMouseUpControl = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMoveControl);
      document.addEventListener("mouseup", handleMouseUpControl);
    } else {
      document.removeEventListener("mousemove", handleMouseMoveControl);
      document.removeEventListener("mouseup", handleMouseUpControl);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMoveControl);
      document.removeEventListener("mouseup", handleMouseUpControl);
    };
  }, [isResizing]);

  return (
    <NodeViewWrapper
      as="div"
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width,
          height,
          maxWidth: "100%",
        }}
      />
      {selected && (
        <div
          onMouseDown={handleMouseDownControl}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "10px",
            height: "10px",
            transform: "translateX(50%)",
            backgroundColor: "#FFF",
            border: "2px solid black",
            borderRadius: "50%",
            cursor: "nwse-resize",
          }}
        />
      )}
    </NodeViewWrapper>
  );
};

export default ResizeAbleImageNodeView;
