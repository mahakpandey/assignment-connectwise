import React, { useState, useRef, useEffect } from "react";
import "./Draggable.css";

const Draggable = ({ children, width, height }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState(null);
  const draggableRef = useRef(null);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const pos = draggableRef.current.getBoundingClientRect();
    setRel({
      x: e.pageX - pos.left,
      y: e.pageY - pos.top,
    });
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const parentPos = draggableRef.current.parentNode.getBoundingClientRect();
    const newX = e.pageX - rel.x;
    const newY = e.pageY - rel.y;
    
    const constrainedX = Math.max(
      10,
      Math.min(newX, parentPos.width - draggableRef.current.offsetWidth - 10)
    );
    const constrainedY = Math.max(
      10,
      Math.min(newY, parentPos.height - draggableRef.current.offsetHeight - 10)
    );

    setPosition({
      x: constrainedX,
      y: constrainedY,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  const toggleDragging = () => {
    setDragging(!dragging);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [dragging]);

  return (
    <div
      className="draggable"
      ref={draggableRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={onMouseDown}
      onClick={toggleDragging}
    >
      <div className="title-bar" onMouseDown={onMouseDown}>
        Title
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Draggable;
