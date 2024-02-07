import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

const CanvasMesh = ({ onPrintValues, onResetGrid, size }) => {
  const rows = size;
  const cols = size;

  const initialGrid = Array.from({ length: rows }, () => Array(cols).fill(1));
  const [grid, setGrid] = useState(initialGrid);
  const [input_ready, setInputReady] = useState(true);
  const [sorted, setSorted] = useState(false);

  const cellSize = 480 / Math.max(rows, cols); // Υπολογισμός μεγέθους κελιών βάσει του grid

  const toggleColor = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = newGrid[row][col] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  const resetGrid = () => {
    onResetGrid();
    setGrid(initialGrid);
    setSorted(false);
    setInputReady(true);
  };

  const printValues = () => {
    if (input_ready === false && sorted === false) {
      setInputReady(true);
    } else {
      setInputReady(false);
    }
    setSorted(true);
    onPrintValues(grid);
  };

  return (
    <div>
      <style>
        {`
          .cont {
            width: 480px;
            height: 480px;
            display: flex;
            flex-wrap: wrap;
          }

          .cell {
            width: ${cellSize}px;
            height: ${cellSize}px;
            border: 0.8px solid #C0C0C0;
            box-sizing: border-box;
          }

          .white {
            background-color: #fff;
          }

          .black {
            background-color: #000;
          }
        `}
      </style>

      <div className="cont">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell === 1 ? "white" : "black"}`}
              onClick={() => toggleColor(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
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
        colorScheme={input_ready === false ? "teal" : "gray"}
        onClick={printValues}
      >
        Ready to sort
      </Button>
    </div>
  );
};

export default CanvasMesh;
