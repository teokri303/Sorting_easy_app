import React, { useState } from "react";

const CanvasMesh = () => {
  const rows = 16;
  const cols = 16;

  const initialGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
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
    console.log(grid);
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
            border: 1px solid #000;
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
              className={`cell ${cell === 0 ? "white" : "black"}`}
              onClick={() => toggleColor(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <button onClick={resetGrid}>Επαναφορά</button>
      <button onClick={printValues}>Εκτύπωση Τιμών</button>
    </div>
  );
};

export default CanvasMesh;
