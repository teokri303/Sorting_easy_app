import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import {
  generateUniqueArray,
  oddEvenSort2D,
  sortColumns,
  generateLeema,
} from "../algorithms/odd_even_sort";

import { snakelikeBlocks, calculate_vars } from "../algorithms/snorr_shamir";
import { kWayUnshuffle2D } from "../algorithms/kway_unshuffle";
import { vertical_slices } from "../algorithms/vertical_slices";

export default function Test() {
  let array = [];
  const [gridsize, setGridsize] = useState("null");

  function generateArray() {
    let randomArray = generateLeema(gridsize);
    array = randomArray;

    console.log("STARTING RANDOM ARRAY CREATED. ");
    /*
    for (const row of randomArray) {
      console.log(row.join("\t"));
    }*/
  }

  //----------------------------------------------------ODD EVEN TRANSPOTITION-------------------------------------------------

  function sort_First_Alg() {
    var sortedMesh = oddEvenSort2D(array);

    console.log("SORTED array: ");

    for (const row of sortedMesh) {
      console.log(row.join("\t"));
    }
  }
  //----------------------------------------------------SCHNORR AND SHAMIR-------------------------------------------------

  function sort_Second_Alg() {
    calculate_vars(array);
    //phase 1
    const sortedGrid = snakelikeBlocks(array);
    console.log("-!-!-!-! PHASE 1 SNAKE: -!-!-!-! ");

    //phase 2
    const phase_2 = kWayUnshuffle2D(sortedGrid);
    console.log("-!-!-!-! PHASE 2 SHUFFLE: -!-!-!-! ");

    //phase 3
    const phase_3 = snakelikeBlocks(phase_2);
    console.log("-!-!-!-! PHASE 3 SNAKE -!-!-!-!");

    //phase 4
    //me kapoio tropo edo meta epireazei to phase_3 pros to paron to afino
    //logika giati mesa sto sortColumns den dimourgeitai neo ARRAY
    const phase_4 = sortColumns(phase_3);
    console.log("-!-!-!-! PHASE 4 COLUMNS -!-!-!-!");

    const phase_5 = vertical_slices(phase_4);
    console.log("-!-!-!-! PHASE 5 VERTICAL SLICES -!-!-!-!");
  }

  function handleTextareaChange1(e) {
    setGridsize(e.target.value);
  }

  return (
    <div>
      <div>
        <Input
          type="number"
          value={gridsize}
          onChange={handleTextareaChange1}
          placeholder="Enter Mesh Dimension"
        />
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
