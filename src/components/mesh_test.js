import React from "react";

import "../styles/MeshComponent.css";

const MeshComponent = ({ grid }) => {
  console.log("mphkaaaaaaaa");

  if (!grid || !Array.isArray(grid) || grid.length === 0) {
    console.log(grid);
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
