import { Button } from "@chakra-ui/react";
import {
  odd_Even_Sort,
  Reverse_odd_Even_Sort,
  sortColumns,
  isEven,
  generateUniqueArray,
} from "../algorithms/odd_even_sort";

export default function Test() {
  let array = [];

  // Function to print the 2D array to the console
  function generateArray() {
    let randomArray = generateUniqueArray();
    array = randomArray;

    console.log("Random 5x5 array:");

    for (const row of randomArray) {
      console.log(row.join("\t"));
    }
  }

  function oddEvenSort2D(mesh) {
    //here will be the sorting
    let numRows = mesh.length;
    let oddPhases = Math.round(Math.sqrt(numRows) + 1);
    let evenPhases = Math.round(Math.sqrt(numRows));
    let Phases = oddPhases + evenPhases;
    console.log(
      "Sorting.....with " +
        oddPhases +
        " oddPhases and " +
        evenPhases +
        " evenPhases"
    );

    for (let i = 0; i < Phases; i++) {
      if (isEven(i)) {
        for (let i = 0; i < numRows; i++) {
          if (isEven(i)) {
            odd_Even_Sort(mesh[i]);
          } else {
            Reverse_odd_Even_Sort(mesh[i]);
          }
        }
        console.log("PHASE " + [i + 1] + " rows snakelike");
        for (const row of mesh) {
          console.log(row.join("\t"));
        }
      } else {
        sortColumns(mesh);
        console.log("PHASE " + [i + 1] + " columns sort");
        for (const row of mesh) {
          console.log(row.join("\t"));
        }
      }
    }

    return mesh;
  }

  function printsorted() {
    var sortedMesh = oddEvenSort2D(array);
    console.log("SORTED 5x5 array:");

    for (const row of sortedMesh) {
      console.log(row.join("\t"));
    }
  }

  return (
    <div>
      <Button colorScheme="blue" onClick={generateArray}>
        Button
      </Button>
      <Button colorScheme="green" onClick={printsorted}>
        Sort the array
      </Button>
    </div>
  );
}
