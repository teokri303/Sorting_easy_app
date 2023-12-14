import { useState } from "react";
import React from "react";
import { ChakraProvider, VStack, Button, Box } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { CircularProgress } from "@chakra-ui/react";

import {
  oddEvenSort_Columns_Parallel,
  oddEvenSort_Rows_Parallel,
} from "../algorithms/odd_even_sort/parallel_odd_even";

import {
  snakelikeBlocks,
  calculate_vars,
} from "../algorithms/shnorr_shamir/snakelike_blocks_1";
import { kWayUnshuffle2D } from "../algorithms/shnorr_shamir/kway_unshuffle_2";
import { vertical_slices_first } from "../algorithms/shnorr_shamir/vertical_slices_A_5";
import { vertical_slices_second } from "../algorithms/shnorr_shamir/vertical_slices_B_6";
import { shearsort } from "../algorithms/odd_even_sort/odd_even_sort";
import { final_oddEven_steps } from "../algorithms/shnorr_shamir/less_steps_odd_even_8";
import { generateLeema } from "../algorithms/arrays/generate_arrays";
import {
  reshapeArray,
  reshape_to_given,
} from "../algorithms/arrays/arrays_correction_SS";

import MeshComponent from "./Mesh";
import Paginator from "./Paginator";
import TextDisplay from "./phase_expl";
import {
  GlobalStyle,
  SliderContainer,
  SliderLabel,
  StyledSlider,
} from "../styles/slider";

export default function Test() {
  const [array, setArray] = useState("null");
  const [record, setRecord] = useState([]);
  const [text, setText] = useState(0);
  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);
  const [sortstate, setSortState] = useState(true);
  const [choosealg, setChooseAlg] = useState(true);
  const [sliderValue, setSliderValue] = useState(220);
  const [alg, setAlg] = useState("1");
  const [loading, setLoading] = useState(false);

  const addRecord = (newArray) => {
    setRecord((prevRecord) => [...prevRecord, newArray]);
  };

  const subtitles = [
    "RANDOM ARRAY",
    "NORMALIZATION TO OPTIMAL STATE (16-256) IF IT WASNT",
    "PHASE 1 SNAKELIKE BLOCKS",
    "PHASE 2 K-WAY UNSHUFFLE",
    "PHASE 3 SNAKELIKE BLOCKS",
    "PHASE 4 SHORT COLUMNS",
    "PHASE 5 VERTICAL SLICES SORT (1-2...)",
    "PHASE 6 VERTICAL SLICES SORT (2-3...)",
    "PHASE 7 ROWS SORT SNAKELIKE",
    "PHASE 8  2N^3/8 STEPS OF ODD-EVEN TRANSPOTITION  ",
    "RESHAPE TO GIVEN DIMENTIONS  FINAL SORTED ARRAY ",
  ];

  function generateArray() {
    const gridsize = sliderValue;

    let randomArray = generateLeema(gridsize);
    setRecord([]);
    setArray([...randomArray]);
    //console.log("ARRAY CREATED");
    addRecord(randomArray);
    setChooseAlg(false);
    setText(subtitles[0]);
  }

  //----------------------------------------------------ODD EVEN TRANSPOTITION-------------------------------------------------

  async function sort_First_Alg() {
    let numRows = record[0].length;
    let oddPhases = Math.log(numRows) / Math.log(2) + 1; //rows
    let evenPhases = Math.log(numRows) / Math.log(2); //columns
    let Phases = Math.round(oddPhases + evenPhases);
    console.log("PHASESSSSS : " + Phases);

    let sortedPhase;
    let grid = record[0];
    let rows_phase;
    let columns_phase;

    console.time("WHOLE TIME");
    for (let i = 0; i < Phases; i++) {
      if (i % 2 === 0) {
        // xrisimopoioume ta dirtyrows gia na epeksergazomaste kathe fora
        //tis grammes poy den einai sortarismenes
        const dirtyRows = grid.filter(
          (row) => row.includes(0) && row.includes(1)
        );

        const index = grid.indexOf(dirtyRows[0]);

        rows_phase = await oddEvenSort_Rows_Parallel(dirtyRows, index);
        sortedPhase = [...rows_phase];
      } else {
        columns_phase = await oddEvenSort_Columns_Parallel(sortedPhase);

        sortedPhase = [...columns_phase];
      }

      let dirtyIndex = 0;
      let resultGrid = [];
      for (let j = 0; j < grid.length; j++) {
        if (grid[j].includes(0) && grid[j].includes(1)) {
          // Αν η γραμμή είναι dirty, προσθέτει την ταξινομημένη dirty γραμμή
          resultGrid.push(sortedPhase[dirtyIndex]);
          dirtyIndex++;
        } else {
          // Αλλιώς, προσθέτει την clean γραμμή
          resultGrid.push([...grid[j]]);
        }
      }

      grid = [...resultGrid];

      console.log("Phase  " + (i + 1) + " COMPLETED");

      addRecord(grid);

      if (sortedPhase.length <= 1) {
        console.log("GRID IS SORTED ");
        break;
      }
    }
    console.timeEnd("WHOLE TIME");

    return grid;
  }
  //----------------------------------------------------SCHNORR AND SHAMIR-------------------------------------------------

  async function sort_Second_Alg() {
    let grid = reshapeArray(array);
    addRecord(grid);
    //setArray([...grid]);
    calculate_vars(grid);

    //phase 1
    const phase_1 = await snakelikeBlocks(grid);
    console.log("-!-!-!-! PHASE 1 SNAKE: -DONE  \u2713 ");
    addRecord(phase_1);

    //phase 2
    const phase_2 = kWayUnshuffle2D(phase_1);
    console.log("-!-!-!-! PHASE 2 SHUFFLE: -DONE  \u2713 ");
    addRecord(phase_2);

    //phase 3
    const phase_3 = await snakelikeBlocks(phase_2);
    console.log("-!-!-!-! PHASE 3 SNAKE -DONE  \u2713");
    //console.log(phase_3);
    addRecord(phase_3);

    //phase 4
    const phase_4 = await oddEvenSort_Columns_Parallel(phase_3);
    console.log("-!-!-!-! PHASE 4 COLUMNS -DONE  \u2713");
    addRecord(phase_4);

    const phase_5 = await vertical_slices_first(phase_4);
    console.log("-!-!-!-! PHASE 5 VERTICAL SLICES 1 -DONE  \u2713");
    addRecord(phase_5);

    const phase_6 = await vertical_slices_second(phase_5);
    console.log("-!-!-!-! PHASE 6 VERTICAL SLICES 2 -DONE  \u2713");
    addRecord(phase_6);

    const phase_7 = await shearsort(phase_6);
    console.log("-!-!-!-! PHASE 7 SIMPLE SNAKELIKE 2 -DONE  \u2713");
    addRecord(phase_7);

    const phase_8 = await final_oddEven_steps(phase_7);
    console.log(
      "-!-!-!-! PHASE 8 SIMPLE 2N^3/8 STEPS OF ODD-EVEN -DONE  \u2713"
    );
    addRecord(phase_8);

    let final = reshape_to_given(phase_8);
    addRecord(final);
  }

  //handling small thing functions

  const clear_states = () => {
    setArray(null);
    setText(0);
  };

  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value, 10));
  };

  const handleButtonClick = (value) => {
    setAlg(value);
    if (value === "SHEARSHORT") {
      setSliderValue(256);
    }

    setSortState(false);
  };

  function go_sort() {
    if (alg === "SHEARSHORT") {
      sort_First_Alg();
    } else {
      sort_Second_Alg();
    }

    setShowFirst(false);
    setShowSecond(true);
  }

  function go_back() {
    setShowSecond(false);
    setShowFirst(true);
    setRecord([]);
    addRecord(array);
  }

  return (
    <div>
      {showFirst && (
        <div>
          <Button
            id="create"
            size="lg"
            width="230px"
            colorScheme="teal"
            onClick={generateArray}
          >
            CREATE RANDOM MESH
          </Button>
          <div className="button-container_b">
            <>
              <GlobalStyle />
              <SliderContainer>
                <SliderLabel className="styled-text" htmlFor="slider">
                  Enter Mesh Dimensions and click CREATE:
                </SliderLabel>
                <StyledSlider
                  type="range"
                  id="slider"
                  name="slider"
                  min="2"
                  max="2000"
                  value={sliderValue}
                  step="1"
                  onChange={handleSliderChange}
                />
                <p>Current Value: {sliderValue}</p>
              </SliderContainer>
            </>
          </div>
        </div>
      )}
      <div>
        {showFirst && (
          <div className="container">
            <div className="left-div">
              <h1 className="styled-text">CHOOSE ALGORITHM USE. </h1>
              <ChakraProvider>
                <VStack spacing={4} align="center">
                  <Button
                    size="lg"
                    width="200px"
                    colorScheme={alg === "SNOR_SHAMMIR" ? "teal" : "gray"}
                    onClick={() => handleButtonClick("SNOR_SHAMMIR")}
                    isDisabled={choosealg}
                  >
                    SNOR SHAMMIR
                  </Button>
                  <Button
                    size="lg"
                    width="200px"
                    colorScheme={alg === "SHEARSHORT" ? "teal" : "gray"}
                    onClick={() => handleButtonClick("SHEARSHORT")}
                    isDisabled={choosealg}
                  >
                    SHEARSHORT
                  </Button>
                </VStack>
              </ChakraProvider>
            </div>

            <div className="mesh">
              <MeshComponent grid={array} />
            </div>

            <div className="right-div">
              <ChakraProvider>
                <Box textAlign="center" marginTop="40px">
                  <Button
                    colorScheme="teal"
                    rightIcon={<ArrowForwardIcon />}
                    size="lg"
                    width="300px"
                    onClick={go_sort}
                    isDisabled={sortstate}
                  >
                    SORT
                  </Button>
                </Box>
              </ChakraProvider>
            </div>
          </div>
        )}
      </div>
      <div>
        {showSecond && (
          <div className="container">
            <div>
              <Button
                id="back"
                size="lg"
                width="180px"
                colorScheme="red"
                leftIcon={<ArrowBackIcon />}
                onClick={go_back}
              >
                Back to sort
              </Button>
            </div>
            <div>
              <Paginator items={record} />
              {loading && (
                <CircularProgress
                  size="120px"
                  color="green.400"
                  isIndeterminate
                ></CircularProgress>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
