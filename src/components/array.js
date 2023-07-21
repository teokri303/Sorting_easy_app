import React from "react";

const MeshBox = ({ number }) => {
  return <div className="mesh-box">{number}</div>;
};

const Mesh = ({ rows, columns }) => {
  // Function to generate a random number between 1 and 100 for each box
  const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  // Create an array to hold the rows of boxes
  const meshRows = [];

  // Generate random numbers for each box and create the rows
  for (let row = 0; row < rows; row++) {
    const meshRow = [];
    for (let col = 0; col < columns; col++) {
      meshRow.push(
        <MeshBox key={`${row}-${col}`} number={generateRandomNumber()} />
      );
    }
    meshRows.push(
      <div key={row} className="mesh-row">
        {meshRow}
      </div>
    );
  }

  return (
    <div className="mesh-container">
      <h1>This is the intial Mesh</h1>
      {meshRows}
    </div>
  );
};

export default Mesh;
