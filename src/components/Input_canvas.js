import React, { useState, useRef, useEffect } from "react";
import { Button } from "@chakra-ui/react";

const CanvasMesh = ({ onPrintValues, onResetGrid, size }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const cellSize = 480 / size;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Καθαρίστε το canvas
    ctx.strokeStyle = "#grey";

    const drawGrid = () => {
      for (let i = 0; i <= size; i++) {
        for (let j = 0; j <= size; j++) {
          ctx.fillStyle = "white"; // Ορίστε το χρώμα σε μαύρο
          ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize); // Σχεδιάστε το κελί
          ctx.strokeStyle = "grey"; // Ορίστε το χρώμα του περιγράμματος σε γκρι
          ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize); // Σχεδιάστε το περίγραμμα του κελιού
        }
      }
    };

    drawGrid();
  }, [size, cellSize]);

  const toggleColor = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);
    ctx.fillStyle = "black";
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    ctx.strokeStyle = "grey";
    ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
  };

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const resetGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        ctx.fillStyle = "white"; // Ορίστε το χρώμα σε μαύρο
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize); // Σχεδιάστε το κελί
        ctx.strokeStyle = "grey"; // Ορίστε το χρώμα του περιγράμματος σε γκρι
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize); // Σχεδιάστε το περίγραμμα του κελιού
      }
    }
    onResetGrid(); // Εκτέλεση της λειτουργίας onResetGrid
  };

  const createGridFromArray = () => {
    console.log("print values");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const newGrid = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const x = j * cellSize + cellSize / 2;
        const y = i * cellSize + cellSize / 2;

        // Διαβάζουμε το χρώμα του pixel στις συντεταγμένες (x, y)
        const colorData = ctx.getImageData(x, y, 1, 1).data;
        const red = colorData[0];
        const green = colorData[1];
        const blue = colorData[2];

        // Έλεγχος αν το χρώμα είναι μαύρο (0, 0, 0)
        if (red === 0 && green === 0 && blue === 0) {
          row.push(1); // Έχει μαύρο χρώμα, οπότε είναι 1
        } else {
          row.push(0); // Έχει άλλο χρώμα, οπότε είναι 0
        }
      }
      newGrid.push(row);
    }

    console.log(newGrid);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={480}
        height={480}
        style={{ border: "0.8px solid #C0C0C0", marginBottom: "20px" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={(event) => {
          if (isDrawing) {
            toggleColor(event);
          }
        }}
      />
      <Button
        size="md"
        width="90px"
        margin="10px"
        marginBottom="20px"
        onClick={resetGrid}
      >
        Reset Grid
      </Button>
      <Button
        size="lg"
        width="200px"
        margin="10px"
        marginBottom="20px"
        onClick={createGridFromArray}
      >
        Ready to sort
      </Button>
    </div>
  );
};

export default CanvasMesh;
