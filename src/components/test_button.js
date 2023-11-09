import { useState } from "react";
import { Button, Input, Show } from "@chakra-ui/react";
import { oddEvenSort2D } from "../algorithms/odd_even_sort/odd_even_sort";

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
  //generateUniqueArray,
  generateLeema,
} from "../algorithms/arrays/generate_arrays";
import {
  reshapeArray,
  reshape_to_given,
} from "../algorithms/arrays/arrays_correction_SS";

import MeshComponent from "../components/mesh_test";
import { sortColumns } from "../algorithms/odd_even_sort/sort_columns";

export default function Test() {
  const [gridsize, setGridsize] = useState("null");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [array, setArray] = useState("null");
  const [record, setRecord] = useState([]);
  const [showButtons, setShowButtons] = useState(false);

  const addRecord = (newArray) => {
    setRecord((prevRecord) => [...prevRecord, newArray]);
  };

  function generateArray() {
    let randomArray = generateLeema(gridsize);
    setRecord([]);
    setArray([...randomArray]);
    addRecord(randomArray);

    console.log("STARTING RANDOM ARRAY CREATED. ");
    /*
    for (const row of randomArray) {
      console.log(row.join("\t"));
    }*/
  }

  //----------------------------------------------------ODD EVEN TRANSPOTITION-------------------------------------------------

  function sort_First_Alg() {
    let sortedMesh = oddEvenSort2D(array);
    setArray([...sortedMesh]);

    console.log("SORTED array: ");

    for (const row of sortedMesh) {
      console.log(row.join("\t"));
    }
  }
  //----------------------------------------------------SCHNORR AND SHAMIR-------------------------------------------------

  function sort_Second_Alg() {
    let grid = reshapeArray(array);
    addRecord(grid);
    setArray([...grid]);
    calculate_vars(grid);

    //phase 1
    const phase_1 = snakelikeBlocks(grid);
    console.log("-!-!-!-! PHASE 1 SNAKE: -DONE  \u2713 ");
    addRecord(phase_1);

    //phase 2
    const phase_2 = kWayUnshuffle2D(phase_1);
    console.log("-!-!-!-! PHASE 2 SHUFFLE: -DONE  \u2713 ");
    addRecord(phase_2);

    //phase 3

    const phase_3 = snakelikeBlocks(phase_2);
    console.log("-!-!-!-! PHASE 3 SNAKE -DONE  \u2713");
    //console.log(phase_3);
    addRecord(phase_3);

    //phase 4
    const phase_4 = sortColumns(phase_3);
    console.log("-!-!-!-! PHASE 4 COLUMNS -DONE  \u2713");
    addRecord(phase_4);

    const phase_5 = vertical_slices_first(phase_4);
    console.log("-!-!-!-! PHASE 5 VERTICAL SLICES 1 -DONE  \u2713");
    addRecord(phase_5);

    const phase_6 = vertical_slices_second(phase_5);
    console.log("-!-!-!-! PHASE 6 VERTICAL SLICES 2 -DONE  \u2713");
    addRecord(phase_6);

    const phase_7 = simple_snakelike(phase_6);
    console.log("-!-!-!-! PHASE 7 SIMPLE SNAKELIKE 2 -DONE  \u2713");
    addRecord(phase_7);

    const phase_8 = final_oddEven_steps(phase_7);
    console.log(
      "-!-!-!-! PHASE 8 SIMPLE 2N^3/8 STEPS OF ODD-EVEN -DONE  \u2713"
    );
    addRecord(phase_8);

    let final = reshape_to_given(phase_8);
    addRecord(final);

    setArray([...final]);
    setShowButtons(true);
  }

  function handleTextareaChange1(e) {
    setGridsize(e.target.value);
  }

  const goForward = () => {
    console.log(record);
    //console.log(record.length);

    if (currentIndex < record.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setArray([...record[currentIndex + 1]]);
    }
    //console.log("CURRENT INDEX :" + currentIndex);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setArray([...record[currentIndex - 1]]);
    }
    //console.log("CURRENT INDEX :" + currentIndex);
  };

  return (
    <div>
      <div>
        <Input
          type="number"
          value={gridsize}
          onChange={handleTextareaChange1}
          placeholder="Enter Mesh Dimension"
        />
      </div>
      <div>
        <Button colorScheme="blue" onClick={generateArray}>
          Create Random small
        </Button>
        <Button colorScheme="green" onClick={sort_First_Alg}>
          ODD EVEN
        </Button>
      </div>
      <div>
        <Button colorScheme="green" onClick={sort_Second_Alg}>
          SHNORR-SHAMMIR
        </Button>
      </div>

      <div>
        <MeshComponent grid={array} />
      </div>
      {showButtons && (
        <div class="button-container">
          <Button
            id="button-left"
            colorScheme="teal"
            variant="outline"
            onClick={goBack}
          >
            BACK
          </Button>
          <Button
            id="button-right"
            colorScheme="teal"
            variant="solid"
            onClick={goForward}
          >
            NEXT
          </Button>
        </div>
      )}
    </div>
  );
}
