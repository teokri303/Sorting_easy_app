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

  const isError = number1 >= 20 || number1 <= 3;

  function handleTextareaChange1(e) {
    setNumber1(e.target.value);
    setShowMesh(false);
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
    console.log(mesh);

    setGeneratedArray(mesh);
    setShowMesh(true);
  };

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
      <div>{showMesh && <Mesh numbers={generatedArray} />}</div>
    </Box>
  );
}
