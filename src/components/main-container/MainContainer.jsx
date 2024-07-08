import React, { useState } from "react";
import "./Main.css";
import Draggable from "../draggable/Draggable";

const MainContainer = () => {
  const initialWidth = 100;
  const initialHeight = 100;
  const padding = 100;

  const [components, setComponents] = useState([
    <Draggable key={0} width={initialWidth} height={initialHeight}></Draggable>,
  ]);
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });   

  const addParent = () => {
    const newWidth = dimensions.width + 2 * padding;
    const newHeight = dimensions.height + 2 * padding;

    const newComponent = (
      <Draggable key={components.length} width={newWidth} height={newHeight}>
        <div className="padded-container">
          {components[components.length - 1]}
        </div>
      </Draggable>
    );
    setComponents([...components, newComponent]);
    setDimensions({ width: newWidth, height: newHeight });
  };

  return (
    <div className="App">
      <button onClick={addParent}>Add Parent</button>
      <div className="draggable-container">
        {components[components.length - 1]}
      </div>
    </div>
  );
};

export default MainContainer;
