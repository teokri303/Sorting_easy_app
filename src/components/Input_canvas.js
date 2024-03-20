import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/react";

const CanvasMesh = ({ onPrintValues, size }) => {
  const { t } = useTranslation();

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ready_to_sort, setReadytoSort] = useState(false);

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

    // Υπολογισμός της κλίμακας συσκευής
    const scale = canvas.width / rect.width;

    // Υπολογισμός των συντεταγμένων με βάση την κλίμακα
    const x = (event.clientX - rect.left) * scale;
    const y = (event.clientY - rect.top) * scale;

    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    ctx.fillStyle = "black";
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    ctx.strokeStyle = "grey";
    ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
  };

  const handleMouseDown = (event) => {
    toggleColor(event);
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
  };

  const createGridFromArray = () => {
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

    if (ready_to_sort === false) {
      setReadytoSort(true);
    }

    onPrintValues(newGrid);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={480}
        height={480}
        style={{ border: "0.8px solid #C0C0C0", marginBottom: "5px" }}
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
        width="110px"
        height="38px"
        margin="5px"
        onClick={resetGrid}
      >
        {t("Reset Grid")}
      </Button>
      <Button
        size="lg"
        width="180px"
        height="45px"
        margin="5px"
        colorScheme={ready_to_sort ? "teal" : "gray"}
        onClick={createGridFromArray}
      >
        {t("Ready to sort")}
      </Button>
    </div>
  );
};

export default CanvasMesh;
