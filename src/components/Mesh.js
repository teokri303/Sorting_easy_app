import React, { useEffect, useRef } from "react";
import "../styles/MeshComponent.css";

const MeshComponent = ({ grid }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!grid || !Array.isArray(grid) || grid.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      const text = "No input yet";
      const textWidth = ctx.measureText(text).width;
      const x = (canvas.width - textWidth) / 2;
      const y = canvas.height / 2;
      ctx.fillText(text, x, y);
      return;
    }

    const canvasSize = 500;
    const gridLength = grid.length;
    const boxSize = canvasSize / Math.max(grid[0].length, gridLength);

    // Set canvas size
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render the mesh
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        ctx.fillStyle = cell === 0 ? "black" : "white";
        ctx.fillRect(cellIndex * boxSize, rowIndex * boxSize, boxSize, boxSize);
      });
    });
  }, [grid]);

  return (
    <canvas
      ref={canvasRef}
      className="mesh"
      style={{ border: "1px solid #000", margin: "auto", display: "block" }}
    ></canvas>
  );
};

export default MeshComponent;
