import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

const CanvasMesh = ({ onPrintValues, onResetGrid }) => {
  const rows = 16;
  const cols = 16;

  const initialGrid = Array.from({ length: rows }, () => Array(cols).fill(1));
  const [grid, setGrid] = useState(initialGrid);
  const [input_ready, setInputReady] = useState(true);
  const [sorted, setSorted] = useState(false);

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
      <Button
        size="lg"
        width="110px"
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
        Input Mesh Ready
      </Button>
    </div>
  );
};

export default CanvasMesh;
