import React from "react";

import "../styles/MeshComponent.css";

const MeshComponent = ({ grid }) => {
  if (!grid || !Array.isArray(grid) || grid.length === 0) {
    return <div>No input yet.</div>;
  }

  const gridLength = grid.length;

  const boxSize = gridLength <= 60 ? 8 : 3;
  const marginSize = gridLength <= 60 ? 1 : 0.1;
  // Render the mesh
  return (
    <div className="mesh">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`box ${cell === 0 ? "black" : "white"}`}
              style={{
                width: `${boxSize}px`,
                height: `${boxSize}px`,
                margin: `${marginSize}px`,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MeshComponent;
