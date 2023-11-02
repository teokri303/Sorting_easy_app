import React from "react";
import "../styles/MeshComponent.css";

const MeshComponent = ({ mesh }) => {
  console.log("mphkaaaaaaaa");
  if (!mesh || !Array.isArray(mesh) || mesh.length === 0) {
    return <div>Invalid mesh data.</div>;
  }

  // Render the mesh
  return (
    <div className="mesh">
      {mesh.map((row, rowIndex) => (
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
