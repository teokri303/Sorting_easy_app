import { Button } from "@chakra-ui/react";
import {
  generateUniqueArray,
  oddEvenSort2D,
  sortColumns,
  generateLeema,
} from "../algorithms/odd_even_sort";

import { snakelikeBlocks } from "../algorithms/snorr_shamir";
import { kWayUnshuffle2D } from "../algorithms/kway_unshuffle";

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

    console.log("SORTED array: ");

    for (const row of sortedMesh) {
      console.log(row.join("\t"));
    }
  }
  //----------------------------------------------------SCHNORR AND SHAMIR-------------------------------------------------

  function sort_Second_Alg() {
    //phase 1
    const sortedGrid = snakelikeBlocks(array);
    //phase 2
    const phase_2 = kWayUnshuffle2D(sortedGrid);
    //phase 3
    const phase_3 = snakelikeBlocks(phase_2);
    //phase 4
    const zoo = sortColumns(phase_3);
    //edw exoyme thema giati to phase 3 epireazetai otan sortarw ta columns

    console.log("PHASE 1 SNAKE:");

    for (const row of sortedGrid) {
      console.log(row.join("\t"));
    }
    console.log("PHASE 2 SHUFFLE:");

    for (const row of phase_2) {
      console.log(row.join("\t"));
    }

    console.log("PHASE 3 SNAKE");
    for (const row of phase_3) {
      console.log(row.join("\t"));
    }

    console.log("PHASE 4 COLUMNS");
    for (const row of zoo) {
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
        <Button colorScheme="green" onClick={sort_Second_Alg}>
          Sort SCHAMMIR
        </Button>
      </div>
    </div>
  );
}
