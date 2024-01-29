import { useState } from "react";
import React from "react";
import {
  ChakraProvider,
  VStack,
  Button,
  Image,
  Box,
  Select,
  Text,
  CSSReset,
  extendTheme,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Progress } from "@chakra-ui/react";

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
import { SliderLabel } from "../styles/slider";
import CanvasMesh from "./Input_canvas";

export default function Test() {
  const [array, setArray] = useState("null");
  const [record, setRecord] = useState([]);
  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);
  const [sortstate, setSortState] = useState(true);
  const [createstate, setCreateState] = useState(true);
  const [alg, setAlg] = useState("SHEARSHORT");
  const [loadingbar, setLoadingbar] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const addRecord = (newArray) => {
    setRecord((prevRecord) => [...prevRecord, newArray]);
  };

  function generateArray() {
    const gridsize = selectedValue;

    let randomArray = generateLeema(gridsize);
    setRecord([]);
    setArray([...randomArray]);
    addRecord(randomArray);

    if (alg !== 1) {
      setSortState(false);
    }
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
    setLoadingbar(true);

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

    setLoadingbar(false);

    return grid;
  }
  //----------------------------------------------------SCHNORR AND SHAMIR-------------------------------------------------

  async function sort_Second_Alg() {
    let sorted = false;

    let grid = [];
    console.log(array.length);
    if (array.length === 16 || array.length === 256) {
      grid = array;
    } else {
      grid = reshapeArray(array);
      addRecord(grid);
    }

    //setArray([...grid]);
    calculate_vars(grid);

    setLoadingbar(true);

    while (sorted === false) {
      //phase 1
      const phase_1 = await snakelikeBlocks(grid);
      addRecord(phase_1);

      //phase 2
      const phase_2 = kWayUnshuffle2D(phase_1);
      addRecord(phase_2);

      //phase 3
      const phase_3 = await snakelikeBlocks(phase_2);
      addRecord(phase_3);

      //phase 4
      const phase_4 = await oddEvenSort_Columns_Parallel(phase_3);
      addRecord(phase_4);
      console.log(record);

      //phase 5
      const phase_5 = await vertical_slices_first(phase_4);
      addRecord(phase_5);

      //phase 6
      const phase_6 = await vertical_slices_second(phase_5);
      addRecord(phase_6);

      //phase 7
      const phase_7 = await shearsort(phase_6);
      addRecord(phase_7);

      //phase 8
      const phase_8 = await final_oddEven_steps(phase_7);
      addRecord(phase_8);

      if (array.length === 16 || array.length === 256) {
        console.log("no need for reshape");
      } else {
        console.log("NEED FOR reshape");
        let final = reshape_to_given(phase_8);
        addRecord(final);
      }

      sorted = true;
    }

    setLoadingbar(false);
  }

  //handling small thing functions

  const handleButtonClick = (value) => {
    setAlg(value);
    if (value === "SNOR_SHAMMIR") {
      setOptions(options_SS);
      setAlgText(SS_text);
      if (selectedValue !== 256 || selectedValue !== 16) {
        setSortState(true);
      }
    } else {
      setOptions(options_shear);
      setAlgText(shear_text);
    }
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

  const handleSelectChange = (value) => {
    if (createstate === true) {
      setCreateState(false);
    }
    setSelectedValue(value);
  };

  const options_shear = [
    10, 20, 30, 50, 75, 100, 200, 300, 500, 750, 1000, 1500,
  ];
  const options_SS = [16, 256];
  const [options, setOptions] = useState(options_shear);

  const shear_text =
    "Shearshort is a grid parallel sorting algorithm that organizes elements in phases. It alternates between sorting rows towards the right or left and sorting columns downward. Rows are first sorted in alternating directions, creating a partially sorted grid horizontally. Then, all columns are sorted downward in subsequent phases, refining the order. This process repeats until the entire grid is sorted.";
  const SS_text =
    "The parallel sorting algorithm of Schnorr and Shamir for large N values. This algorithm efficiently sorts N items into a snakelike order using a multi-phase approach (8 phases). It divides the mesh into blocks, sorts them in snakelike order, performs column unshuffling, and conducts additional sorting phases. Phases 1, 3, 5, and 6 can all be accomplished using the Shearsort algorithm.";
  const [alg_text, setAlgText] = useState(shear_text);

  return (
    <div>
      {showFirst && (
        <div>
          <div className="container">
            <div className="left-div">
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "30px",
                  }}
                >
                  <Box boxSize="100px">
                    <Image src="/media/onlylogo.png" />
                  </Box>
                </div>
                <div>
                  <SliderLabel className="styled-text" htmlFor="slider">
                    Enter Mesh Dimensions and click CREATE:
                  </SliderLabel>
                </div>
                <div>
                  <ChakraProvider
                    theme={extendTheme({
                      styles: { global: { body: { bg: "gray.100" } } },
                    })}
                  >
                    <CSSReset />
                    <Box p={4} maxW="md" mx="auto">
                      <Select
                        placeholder="Select mesh dimensions"
                        onChange={(e) => handleSelectChange(e.target.value)}
                        textAlign="center"
                      >
                        {options.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </Select>
                    </Box>
                  </ChakraProvider>
                </div>
                <Button
                  id="create"
                  size="lg"
                  width="230px"
                  colorScheme="teal"
                  onClick={generateArray}
                  isDisabled={createstate}
                >
                  CREATE RANDOM MESH
                </Button>
              </div>
              <div>
                <div>
                  <div>
                    <h1 className="styled-text">CHOOSE ALGORITHM. </h1>
                    <ChakraProvider>
                      <VStack spacing={4} align="center">
                        <Button
                          size="lg"
                          width="200px"
                          colorScheme={alg === "SHEARSHORT" ? "teal" : "gray"}
                          onClick={() => handleButtonClick("SHEARSHORT")}
                        >
                          SHEARSHORT
                        </Button>
                        <Button
                          size="lg"
                          width="200px"
                          colorScheme={alg === "SNOR_SHAMMIR" ? "teal" : "gray"}
                          onClick={() => handleButtonClick("SNOR_SHAMMIR")}
                        >
                          SCHNORR SHAMIR
                        </Button>
                      </VStack>
                    </ChakraProvider>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextDisplay text={alg_text} />
                  </div>
                </div>
              </div>
            </div>
            <div className="right-div">
              <Box mt={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Current array dimensions:
                </Text>
                <Text fontSize="xl">
                  {array.length === 4
                    ? "Καμία επιλογή"
                    : array.length + " X " + array.length}
                </Text>
              </Box>
              <MeshComponent grid={array} />
              <div>
                <ChakraProvider>
                  <Box textAlign="center" marginTop="30px">
                    <Button
                      colorScheme="teal"
                      rightIcon={<ArrowForwardIcon />}
                      size="lg"
                      width="250px"
                      onClick={go_sort}
                      isDisabled={sortstate}
                    >
                      SORT
                    </Button>
                  </Box>
                </ChakraProvider>
              </div>
            </div>
          </div>
          <div>
            <CanvasMesh gridSize={10} />
          </div>
        </div>
      )}

      <div>
        {showSecond && (
          <div className="container-paginator">
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
              <Paginator items={record} algorithm={alg} />
              {loadingbar && (
                <div id="bar">
                  <Progress height="34px" colorScheme="teal" isIndeterminate />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
