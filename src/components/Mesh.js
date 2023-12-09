import React, { useEffect, useRef } from "react";
import "../styles/MeshComponent.css";

const MeshComponent = ({ grid }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!grid || !Array.isArray(grid) || grid.length === 0) {
      // Αν το grid δεν έχει οριστεί ή είναι ένα άδειο array, αποκρύπτουμε τον καμβά
      canvas.style.display = "none";
      return;
    } else {
      // Εάν υπάρχει grid, εμφανίζουμε ξανά τον καμβά
      canvas.style.display = "block";
    }

    const canvasSize = 480;
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
