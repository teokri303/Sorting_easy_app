import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function NumberInputComponent() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");

  function handleTextareaChange1(e) {
    setNumber1(e.target.value);
  }

  function handleTextareaChange2(e) {
    setNumber2(e.target.value);
  }

  function createGround(width, height) {
    var result = [];
    for (var i = 0; i < width; i++) {
      result[i] = [];
      for (var j = 0; j < height; j++) {
        result[i][j] = (Math.random() * 100) | 0;
      }
    }
    return result;
  }

  const handlePrintNumbers = () => {
    console.log("Number 1:", number1);
    console.log("Number 2:", number2);
    var ground = createGround(number1, number2);

    console.log(ground);
  };

  return (
    <Box maxWidth="400px" margin="0 auto">
      <FormControl>
        <FormLabel>Number 1</FormLabel>
        <Input
          type="number"
          value={number1}
          onChange={handleTextareaChange1}
          placeholder="Enter number 1"
        />
      </FormControl>
      <FormControl marginTop="2">
        <FormLabel>Number 2</FormLabel>
        <Input
          type="number"
          value={number2}
          onChange={handleTextareaChange2}
          placeholder="Enter number 2"
        />
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={handlePrintNumbers}
        marginTop="4"
        size="sm"
      >
        Print Array
      </Button>
    </Box>
  );
}
