import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

const CanvasMesh = ({ onPrintValues }) => {
  const rows = 16;
  const cols = 16;

  const initialGrid = Array.from({ length: rows }, () => Array(cols).fill(1));
  const [grid, setGrid] = useState(initialGrid);

  const toggleColor = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = newGrid[row][col] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  const resetGrid = () => {
    setGrid(initialGrid);
  };

  const printValues = () => {
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
            width: 30px;
            height: 30px;
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
      <button onClick={resetGrid}>Επαναφορά</button>
      <Button
        size="lg"
        width="200px"
        margin="10px"
        marginBottom="20px"
        onClick={printValues}
      >
        Input Mesh Ready
      </Button>
    </div>
  );
};

export default CanvasMesh;
