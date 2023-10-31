import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

export default function NumberInputComponent() {
  const [number1, setNumber1] = useState("null");
  const [showMesh, setShowMesh] = useState(false);
  const [generatedArray, setGeneratedArray] = useState(null);
  const [sortedArray, setSortedArray] = useState([]);
  const [isSorted, setSort] = useState(false);

  const isError = number1 >= 20 || number1 <= 3;

  function handleTextareaChange1(e) {
    setNumber1(e.target.value);
    setShowMesh(false);
    setSort(false);
  }

  function generateRandomMesh(rows, columns) {
    // Initialize an empty 2D array
    const mesh = [];

    // Generate random numbers and fill the mesh array
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        // Generate a random number between 1 and 100 (you can adjust the range as needed)
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        row.push(randomNumber);
      }
      mesh.push(row);
    }

    return mesh;
  }

  const handlePrintNumbers = () => {
    //console.log("Number 1:", number1);
    const mesh = generateRandomMesh(number1, number1);
    //console.log(mesh);

    setGeneratedArray(mesh);
    setSortedArray(mesh);

    setShowMesh(true);
  };

  const sort2DArray = () => {
    setSort(false);

    let array = sortedArray;

    // Phase 1: Sort rows in ascending order, then sort columns
    let numRows = array.length;
    let numCols = array[0].length;
    console.log("we started sorting");

    for (let i = 0; i < numRows; i++) {
      if (i % 2 === 0) {
        // Sort the row in ascending order (for even rows)
        array[i].sort((a, b) => a - b);
      } else {
        // Sort the row in descending order (for odd rows)
        array[i].sort((a, b) => b - a);
      }
    }
    console.log(array);

    // Phase 2: Sort columns in ascending order
    for (let col = 0; col < numCols; col++) {
      let columnValues = [];
      for (let row = 0; row < numRows; row++) {
        columnValues.push(array[row][col]);
      }
      columnValues.sort((a, b) => a - b);
      for (let row = 0; row < numRows; row++) {
        array[row][col] = columnValues[row];
      }
    }

    // Check if the array is sorted after Phase 2
    if (isDone(array)) {
      setSortedArray(array);
      setSort(true);
      return array;
    }

    // Phase 3: Sort rows again
    for (let i = 0; i < numRows; i++) {
      if (i % 2 === 0) {
        // Sort the row in ascending order (for even rows)
        array[i].sort((a, b) => a - b);
      } else {
        // Sort the row in descending order (for odd rows)
        array[i].sort((a, b) => b - a);
      }
    }

    // Check if the array is sorted after Phase 3
    if (isDone(array)) {
      setSortedArray(array);
      setSort(true);
      return array;
    }

    // Phase 4: Sort columns again
    for (let col = 0; col < numCols; col++) {
      let columnValues = [];
      for (let row = 0; row < numRows; row++) {
        columnValues.push(array[row][col]);
      }
      columnValues.sort((a, b) => a - b);
      for (let row = 0; row < numRows; row++) {
        array[row][col] = columnValues[row];
      }
    }

    // Check if the array is sorted after Phase 4
    if (isDone(array)) {
      setSortedArray(array);
      setSort(true);
      return array;
    }

    // Recursive call to repeat the process until the array is sorted
    return sort2DArray(array);
  };

  // Helper function to check if the 2D array is sorted
  function isDone(array) {
    let numRows = array.length;
    let numCols = array[0].length;
    for (let row = 1; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (array[row][col] < array[row - 1][col]) {
          return false;
        }
      }
    }
    return true;
  }

  //------------------------------------------------------------------------------------------

  const Mesh = ({ numbers }) => {
    const meshRows = numbers.map((row, rowIndex) => (
      <div key={rowIndex} className="mesh-row">
        {row.map((number, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="mesh-box">
            {number}
          </div>
        ))}
      </div>
    ));

    return (
      <div className="mesh-container">
        <h1>This is the initial Mesh</h1>
        {meshRows}
      </div>
    );
  };
  return (
    <Box maxWidth="400px" margin="0 auto">
      <FormControl isInvalid={isError}>
        <FormLabel>Dimensions of Mesh</FormLabel>
        <Input
          type="number"
          value={number1}
          onChange={handleTextareaChange1}
          placeholder="Enter Mesh Dimension"
        />
        {!isError ? (
          <FormHelperText>
            Enter under 20 cells for better understanding.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Please enter valid dimension</FormErrorMessage>
        )}
      </FormControl>
      <Button
        isDisabled={isError}
        colorScheme="teal"
        onClick={handlePrintNumbers}
        marginTop="4"
        size="sm"
      >
        Show Mesh
      </Button>
      <div>
        {showMesh && <Mesh numbers={generatedArray} />}
        {showMesh && (
          <Button
            colorScheme="teal"
            onClick={sort2DArray}
            marginTop="4"
            size="sm"
          >
            Sort Mesh
          </Button>
        )}
      </div>
      <div>{isSorted && <Mesh numbers={sortedArray} />}</div>
    </Box>
  );
}
