import React from "react";

import "../styles/MeshComponent.css";

const MeshComponent = ({ grid }) => {
  if (!grid || !Array.isArray(grid) || grid.length === 0) {
    return <div>Invalid mesh data.</div>;
  }

  // Render the mesh
  return (
    <div className="mesh">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`box ${cell === 0 ? "black" : "white"}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MeshComponent;
