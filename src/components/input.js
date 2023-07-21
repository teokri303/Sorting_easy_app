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
import Mesh from "../components/array";

export default function NumberInputComponent() {
  const [number1, setNumber1] = useState("null");
  const [showMesh, setShowMesh] = useState(false);
  const isError = number1 >= 20 || number1 <= 3;

  function handleTextareaChange1(e) {
    setNumber1(e.target.value);
    setShowMesh(false);
  }

  const handlePrintNumbers = () => {
    console.log("Number 1:", number1);

    setShowMesh(true);
  };

  return (
    <Box maxWidth="400px" margin="0 auto">
      <FormControl isInvalid={isError}>
        <FormLabel>Dimensions of 2D array</FormLabel>
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
      <div>{showMesh && <Mesh rows={number1} columns={number1} />}</div>
    </Box>
  );
}
