import { useState } from "react";
import { Button, Input, Show } from "@chakra-ui/react";
import {
  oddEvenSort2D,
  sortColumns,
} from "../algorithms/odd_even_sort/odd_even_sort";

import {
  snakelikeBlocks,
  calculate_vars,
} from "../algorithms/shnorr_shamir/snakelike_blocks_1";
import { kWayUnshuffle2D } from "../algorithms/shnorr_shamir/kway_unshuffle_2";
import { vertical_slices_first } from "../algorithms/shnorr_shamir/vertical_slices_A_5";
import { vertical_slices_second } from "../algorithms/shnorr_shamir/vertical_slices_B_6";
import { simple_snakelike } from "../algorithms/shnorr_shamir/simple_snakelike_7";
import { final_oddEven_steps } from "../algorithms/shnorr_shamir/less_steps_odd_even_8";
import {
  generateUniqueArray,
  generateLeema,
} from "../algorithms/arrays/generate_arrays";
import { reshapeArray } from "../algorithms/arrays/arrays_correction_SS";

import MeshComponent from "../components/mesh_test";

export default function Test() {
  let array = [];
  const [gridsize, setGridsize] = useState("null");

  const yourMeshArray = [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
  ];

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
    console.log("-!-!-!-! PHASE 1 SNAKE: -DONE  \u2713 ");

    //phase 2
    const phase_2 = kWayUnshuffle2D(sortedGrid);
    console.log("-!-!-!-! PHASE 2 SHUFFLE: -DONE  \u2713 ");

    //phase 3
    const phase_3 = snakelikeBlocks(phase_2);
    console.log("-!-!-!-! PHASE 3 SNAKE -DONE  \u2713");

    //phase 4
    //me kapoio tropo edo meta epireazei to phase_3 pros to paron to afino
    //logika giati mesa sto sortColumns den dimourgeitai neo ARRAY
    const phase_4 = sortColumns(phase_3);
    console.log("-!-!-!-! PHASE 4 COLUMNS -DONE  \u2713");

    const phase_5 = vertical_slices_first(phase_4);
    console.log("-!-!-!-! PHASE 5 VERTICAL SLICES 1 -DONE  \u2713");

    const phase_6 = vertical_slices_second(phase_5);
    console.log("-!-!-!-! PHASE 6 VERTICAL SLICES 2 -DONE  \u2713");

    const phase_7 = simple_snakelike(phase_6);
    console.log("-!-!-!-! PHASE 7 SIMPLE SNAKELIKE 2 -DONE  \u2713");

    const phase_8 = final_oddEven_steps(phase_7);
    console.log(
      "-!-!-!-! PHASE 8 SIMPLE 2N^3/8 STEPS OF ODD-EVEN -DONE  \u2713"
    );
  }

  function handleTextareaChange1(e) {
    setGridsize(e.target.value);
  }

  function test() {
    const test_array = reshapeArray(array);
    const after = oddEvenSort2D(test_array);
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
          Sort shnor -shamir
        </Button>
      </div>
      <div>
        <Button colorScheme="green" onClick={test}>
          reshape test
        </Button>
      </div>
      <div>
        {/* Pass the array (mesh) as a prop to the MeshComponent */}
        <MeshComponent mesh={yourMeshArray} />
      </div>
    </div>
  );
}
