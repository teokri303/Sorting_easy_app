import { Button } from "@chakra-ui/react";
import {
  generateUniqueArray,
  oddEvenSort2D,
} from "../algorithms/odd_even_sort";

import {
  sortAndPopulateBlocks,
  createSortedGrid,
} from "../algorithms/snorr_shamir";
import { kWayUnshuffle2D } from "../algorithms/kway_unsuffle";

export default function Test() {
  let array = [];

  // Function to print the 2D array to the console
  function generateArray() {
    let randomArray = generateUniqueArray(16);
    array = randomArray;

    console.log("Random array:");

    for (const row of randomArray) {
      console.log(row.join("\t"));
    }
  }

  function sort_First_Alg() {
    var sortedMesh = oddEvenSort2D(array);

    console.log("SORTED array:");

    for (const row of sortedMesh) {
      console.log(row.join("\t"));
    }

    var unshuffled = kWayUnshuffle2D(sortedMesh);

    console.log("SORTED UNSHUFFLED:");

    for (const row of unshuffled) {
      console.log(row.join("\t"));
    }
  }
  //----------------------------------------------------SCHNORR AND SHAMIR-------------------------------------------------

  function sort_Second_Alg() {
    const sortedBlocks = sortAndPopulateBlocks(array);
    const sortedGrid = createSortedGrid(sortedBlocks);
    console.log("SORTED array:");

    for (const row of sortedGrid) {
      console.log(row.join("\t"));
    }
  }

  return (
    <div>
      <div>
        <Button colorScheme="blue" onClick={generateArray}>
          Create Random small
        </Button>
        <Button colorScheme="green" onClick={sort_First_Alg}>
          Sort ONE
        </Button>
      </div>
      <div>
        <Button colorScheme="blue" onClick={generateArray}>
          Create BIG
        </Button>
        <Button colorScheme="green" onClick={sort_Second_Alg}>
          Sort SCHAMMIR
        </Button>
      </div>
    </div>
  );
}
