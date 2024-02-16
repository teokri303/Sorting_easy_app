import { useState, useEffect } from "react";
import React from "react";
import {
  ChakraProvider,
  Button,
  Box,
  Select,
  Text,
  CSSReset,
  extendTheme,
} from "@chakra-ui/react";
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
import CanvasMesh from "./Input_canvas";
import Navbar from "./Navbar";
import { Icon } from "@chakra-ui/react";
import { MdNotStarted } from "react-icons/md";

export default function Test() {
  const [array, setArray] = useState(null);
  const [record, setRecord] = useState([]);
  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);
  const [sortstate, setSortState] = useState(true);
  const [random_or_own, setRandom_Own] = useState("random");
  const [random_or_own_shear, setRandom_Own_shear] = useState("random");
  const [random_or_own_ss, setRandom_Own_ss] = useState("random");
  const [alg, setAlg] = useState("SHEARSHORT");
  const [loadingbar, setLoadingbar] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValue_shear, setSelectedValue_shear] = useState(null);
  const [selectedValue_ss, setSelectedValue_ss] = useState(null);
  const [input_size, setInputSize] = useState(null);
  const [shear_grid_size, setShear_size] = useState(null);
  const [ss_grid_size, setSSsize] = useState(null);

  const addRecord = (newArray) => {
    setRecord((prevRecord) => [...prevRecord, newArray]);
  };

  function generateArray(value) {
    const gridsize = value;

    let randomArray = generateLeema(gridsize);
    setRecord([]);
    setArray([...randomArray]);
    addRecord(randomArray);
  }

  //----------------------------------------------------SHEARSORT ODD EVEN TRANSPOTITION-------------------------------------------------

  async function sort_First_Alg() {
    let numRows = record[0].length;
    let oddPhases = Math.log(numRows) / Math.log(2) + 1; //rows
    let evenPhases = Math.log(numRows) / Math.log(2); //columns
    let Phases = Math.round(oddPhases + evenPhases);
    //console.log("PHASES : " + Phases);

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
        let dirtyRows;

        if (i === 0) {
          dirtyRows = [...grid];
        } else {
          dirtyRows = grid.filter((row) => row.includes(0) && row.includes(1));
        }

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
        if ((grid[j].includes(0) && grid[j].includes(1)) || i < 2) {
          // Αν η γραμμή είναι dirty, προσθέτει την ταξινομημένη dirty γραμμή
          resultGrid.push(sortedPhase[dirtyIndex]);
          dirtyIndex++;
        } else {
          // Αλλιώς, προσθέτει την clean γραμμή
          resultGrid.push([...grid[j]]);
        }
      }

      const areArraysEqual = are2DArraysEqual(grid, resultGrid);

      if (areArraysEqual && i !== 0) {
        //console.log("Οι πίνακες είναι ίδιοι.");
        break;
      } else {
        grid = [...resultGrid];
      }

      //console.log("Phase  " + (i + 1) + " COMPLETED");

      addRecord(grid);

      if (sortedPhase.length <= 1) {
        //console.log("GRID IS SORTED ");
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
    if (array.length === 16 || array.length === 256) {
      grid = [...array];
    } else {
      grid = reshapeArray(array);
      addRecord(grid);
    }

    calculate_vars(grid);

    setLoadingbar(true);

    while (sorted === false) {
      //phase 1
      const phase_1 = await snakelikeBlocks(grid, random_or_own);
      addRecord(phase_1);

      if (isSnakelikeOrder(phase_1)) {
        check_reshape(phase_1);
        break;
      }

      //phase 2
      const phase_2 = kWayUnshuffle2D(phase_1);
      addRecord(phase_2);

      if (isSnakelikeOrder(phase_2)) {
        check_reshape(phase_2);
        break;
      }
      //phase 3
      const phase_3 = await snakelikeBlocks(phase_2, random_or_own);
      addRecord(phase_3);

      if (isSnakelikeOrder(phase_3)) {
        check_reshape(phase_3);
        break;
      }

      //phase 4
      const phase_4 = await oddEvenSort_Columns_Parallel(phase_3);
      addRecord(phase_4);

      if (isSnakelikeOrder(phase_4)) {
        check_reshape(phase_4);
        break;
      }

      //phase 5
      const phase_5 = await vertical_slices_first(phase_4);
      addRecord(phase_5);

      if (isSnakelikeOrder(phase_5)) {
        check_reshape(phase_5);
        break;
      }

      //phase 6
      const phase_6 = await vertical_slices_second(phase_5);
      addRecord(phase_6);

      if (isSnakelikeOrder(phase_6)) {
        check_reshape(phase_6);
        break;
      }

      //phase 7
      const phase_7 = await shearsort(phase_6);
      addRecord(phase_7);

      if (isSnakelikeOrder(phase_7)) {
        check_reshape(phase_7);
        break;
      }

      //phase 8
      const phase_8 = await final_oddEven_steps(phase_7);
      if (isSnakelikeOrder(phase_8)) {
        break;
      }
      addRecord(phase_8);

      function check_reshape(mesh) {
        if (array.length === 16 || array.length === 256) {
          //console.log("no need for reshape");
        } else {
          //console.log("NEED FOR reshape");
          let final = reshape_to_given(mesh);
          addRecord(final);
        }
      }

      sorted = true;
    }

    setLoadingbar(false);
  }

  //handling small thing functions

  function are2DArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      const innerArr1 = arr1[i];
      const innerArr2 = arr2[i];

      if (innerArr1.length !== innerArr2.length) {
        return false;
      }

      for (let j = 0; j < innerArr1.length; j++) {
        if (innerArr1[j] !== innerArr2[j]) {
          return false;
        }
      }
    }

    return true;
  }

  function isSnakelikeOrder(matrix) {
    function deepCopyArray(arr) {
      return arr.map((innerArr) => [...innerArr]);
    }
    function isSorted(arr) {
      return arr.slice(1).every((item, i) => item >= arr[i]);
    }

    const testMatrix = deepCopyArray(matrix);

    // Αποθήκευση των γραμμών ως flat πίνακα
    const flattenedArray = testMatrix.flatMap((row, index) =>
      index % 2 === 0 ? row : row.reverse()
    );

    // Ελέγχουμε αν ο flat πίνακας είναι ταξινομημένος
    return isSorted(flattenedArray);
  }

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
    setArray(null);
    setSortState(true);
    setSelectedValue(null);
    setSelectedValue_shear(null);
    setSelectedValue_ss(null);
    setShear_size(null);
    setSSsize(null);
    setInputSize(null);
    setRandom_Own("random");
    setRandom_Own_shear("random");
    setRandom_Own_ss("random");
    setAlg("SHEARSHORT");
  }

  const handleSelectChange = (value) => {
    if (alg === "SHEARSHORT") {
      setSelectedValue_shear(value);
    } else {
      setSelectedValue_ss(value);
    }
  };

  function collectNcreate(value) {
    setSortState(true);
    console.log(value);
    setAlg(value);

    if (value === "SHEARSHORT") {
      if (random_or_own_shear === "random") {
        generateArray(selectedValue_shear);
        setShear_size(selectedValue_shear);
        setRandom_Own("random");
        if (selectedValue_shear > 0) {
          setSortState(false);
        }
      } else {
        if (selectedValue_shear <= 64) {
          setInputSize(selectedValue_shear);
          setShear_size(selectedValue_shear);
          setRandom_Own("own");
          setSortState(true);
        }
      }
    } else {
      if (random_or_own_ss === "random") {
        generateArray(selectedValue_ss);
        setSSsize(selectedValue_ss);
        setRandom_Own("random");
        if (selectedValue_ss > 0) {
          setSortState(false);
        }
      } else {
        if (selectedValue_ss <= 64) {
          setInputSize(selectedValue_ss);
          setSSsize(selectedValue_ss);
          setRandom_Own("own");
          setSortState(true);
        }
      }
    }
  }

  function your_own() {
    if (alg === "SHEARSHORT") {
      setRandom_Own_shear("own");
      setRecord([]);
    } else {
      setRandom_Own_ss("own");
      setRecord([]);
    }
  }

  function random_mesh() {
    if (alg === "SHEARSHORT") {
      setRandom_Own_shear("random");
      setRecord([]);
    } else {
      setRandom_Own_ss("random");
      setRecord([]);
    }
  }

  const set_grid_ready = (grid) => {
    setRecord([]);
    setArray([...grid]);
    addRecord(grid);
    setSortState(false);
  };

  const options_shear = [4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
  const options_SS = [4, 8, 16, 32, 64, 128, 256];

  const shear_text =
    "Shearshort is a grid parallel sorting algorithm that organizes elements in phases. It alternates between sorting rows towards the right or left and sorting columns downward. Rows are first sorted in alternating directions, creating a partially sorted grid horizontally. Then, all columns are sorted downward in subsequent phases, refining the order. This process repeats until the entire grid is sorted.";
  const SS_text =
    "The parallel sorting algorithm of Schnorr and Shamir for large N values. This algorithm efficiently sorts N items into a snakelike order using a multi-phase approach (8 phases). It divides the mesh into blocks, sorts them in snakelike order, performs column unshuffling, and conducts additional sorting phases. Phases 1, 3, 5, and 6 can all be accomplished using the Shearsort algorithm.";

  return (
    <div>
      <div>
        <Navbar onLogoClick={go_back} />
      </div>
      {showFirst && (
        <div>
          <div>
            <div className="container">
              <div className="left-div">
                <div>
                  <div>
                    <Box
                      border={alg === "SHEARSHORT" ? "5px solid" : "1px solid"}
                      borderColor={alg === "SHEARSHORT" ? "teal" : "#ccc"}
                      p="20px"
                      position="relative"
                    >
                      <div>
                        <Button
                          size="md"
                          width="400px"
                          height="50px"
                          marginBottom="10px"
                          colorScheme={alg === "SHEARSHORT" ? "teal" : "gray"}
                          onClick={() => collectNcreate("SHEARSHORT")}
                        >
                          Shearsort algorithm
                        </Button>
                      </div>
                      <div>
                        <TextDisplay text={shear_text} />
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
                              placeholder="Enter mesh dimensions"
                              onChange={(e) =>
                                handleSelectChange(e.target.value)
                              }
                              textAlign="center"
                              isDisabled={alg === "SNOR_SHAMMIR"}
                            >
                              {options_shear.map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </Select>
                          </Box>
                        </ChakraProvider>
                      </div>
                      <div>
                        <Button
                          size="lg"
                          width="200px"
                          height="40px"
                          isDisabled={
                            alg === "SNOR_SHAMMIR" ||
                            selectedValue_shear === null
                          }
                          colorScheme={
                            random_or_own_shear === "random" ? "teal" : "gray"
                          }
                          onClick={() => random_mesh()}
                        >
                          Random Mesh
                        </Button>

                        <Button
                          size="lg"
                          width="200px"
                          height="40px"
                          margin="5px"
                          isDisabled={
                            alg === "SNOR_SHAMMIR" ||
                            selectedValue_shear === null ||
                            selectedValue_shear > 64
                          }
                          colorScheme={
                            random_or_own_shear === "own" ? "teal" : "gray"
                          }
                          onClick={() => your_own()}
                        >
                          Your own Mesh
                        </Button>
                      </div>
                      <Icon
                        as={MdNotStarted}
                        w={14}
                        h={14}
                        color={
                          alg === "SNOR_SHAMMIR" ? "transparent" : "red.500"
                        }
                        style={{
                          position: "absolute",
                          bottom: 15,
                          right: 15,
                          cursor: "pointer",
                        }}
                        onClick={
                          alg === "SNOR_SHAMMIR"
                            ? null
                            : () => collectNcreate(alg)
                        }
                      />
                    </Box>
                  </div>

                  <div>
                    <Box
                      //------------------------------------------------------------------------------------------------------SS BLOCK---------------------------------------------
                      border={
                        alg === "SNOR_SHAMMIR" ? "5px solid" : "1px solid"
                      }
                      borderColor={alg === "SNOR_SHAMMIR" ? "teal" : "#ccc"}
                      marginTop="10px"
                      p="20px"
                      position="relative"
                    >
                      <div>
                        <Button
                          size="md"
                          width="400px"
                          height="50px"
                          marginBottom="10px"
                          colorScheme={alg === "SNOR_SHAMMIR" ? "teal" : "gray"}
                          onClick={() => collectNcreate("SNOR_SHAMMIR")}
                        >
                          Schnorr - Shamir algorithm
                        </Button>
                      </div>
                      <div>
                        <TextDisplay text={SS_text} />
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
                              placeholder="Enter mesh dimensions"
                              onChange={(e) =>
                                handleSelectChange(e.target.value)
                              }
                              textAlign="center"
                              isDisabled={alg === "SHEARSHORT"}
                            >
                              {options_SS.map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </Select>
                          </Box>
                        </ChakraProvider>
                      </div>
                      <div>
                        <Button
                          size="lg"
                          width="200px"
                          height="40px"
                          isDisabled={
                            alg === "SHEARSHORT" || selectedValue_ss === null
                          }
                          colorScheme={
                            random_or_own_ss === "random" ? "teal" : "gray"
                          }
                          onClick={() => random_mesh()}
                        >
                          Random Mesh
                        </Button>

                        <Button
                          size="lg"
                          width="200px"
                          height="40px"
                          margin="5px"
                          isDisabled={
                            alg === "SHEARSHORT" ||
                            selectedValue_ss === null ||
                            selectedValue_ss > 64
                          }
                          colorScheme={
                            random_or_own_ss === "own" ? "teal" : "gray"
                          }
                          onClick={() => your_own()}
                        >
                          Your own Mesh
                        </Button>
                      </div>
                      <Icon
                        as={MdNotStarted}
                        w={14}
                        h={14}
                        color={alg === "SHEARSHORT" ? "transparent" : "red.500"}
                        style={{
                          position: "absolute",
                          bottom: 15,
                          right: 15,
                          cursor: "pointer",
                        }}
                        onClick={
                          alg === "SHEARSHORT"
                            ? null
                            : () => collectNcreate(alg)
                        }
                      />
                    </Box>
                  </div>
                </div>
                <div>
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>

              <div className="right-div">
                <Box
                  //------------------------------------------------------------------------------------------------------RIGHT DIV---------------------------------------------
                  mt={4}
                >
                  <Text fontSize="lg" fontWeight="bold">
                    Current array dimensions:
                  </Text>
                  <Text fontSize="md">
                    {array === null
                      ? "No configurations made"
                      : alg === "SHEARSHORT" &&
                        (array.length > 0 || input_size !== null)
                      ? shear_grid_size + " X " + shear_grid_size
                      : alg === "SNOR_SHAMMIR" &&
                        (array.length > 0 || input_size !== null)
                      ? ss_grid_size + " X " + ss_grid_size
                      : "No configurations made"}
                  </Text>
                </Box>
                <div>
                  {random_or_own === "random" && <MeshComponent grid={array} />}
                  {random_or_own === "own" && input_size !== null && (
                    <CanvasMesh
                      onPrintValues={set_grid_ready}
                      size={input_size}
                    />
                  )}
                </div>

                <div>
                  <Box textAlign="center">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        {showSecond && (
          <div>
            <div>
              <Button
                size="lg"
                width="180px"
                colorScheme="red"
                backgroundColor="#404040"
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
                  <CircularProgress
                    size="420px"
                    color="teal"
                    thickness="5px"
                    isIndeterminate
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
