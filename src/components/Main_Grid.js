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
import CanvasMesh from "./Input_canvas";
import Navbar from "./Navbar";

import { useTranslation } from "react-i18next";
import HorizontalAccordion from "./Accordion";

export default function Test() {
  const [array, setArray] = useState(null);
  const [record, setRecord] = useState([]);
  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);
  const [sortstate_shear, setSortState_shear] = useState(true);
  const [sortstate_ss, setSortState_ss] = useState(true);
  const [random_or_own, setRandom_Own] = useState("random");
  const [random_or_own_shear, setRandom_Own_shear] = useState("random");
  const [random_or_own_ss, setRandom_Own_ss] = useState("random");
  const [alg, setAlg] = useState("SHEARSHORT");
  const [loadingbar, setLoadingbar] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValue_shear, setSelectedValue_shear] = useState(null);
  const [selectedValue_ss, setSelectedValue_ss] = useState(null);
  const [input_size, setInputSize] = useState(null);

  const { t } = useTranslation();

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
    setSortState_shear(true);
    setSortState_ss(true);
    setSelectedValue_shear(null);
    setSelectedValue_ss(null);
    setInputSize(null);
    setRandom_Own("random");
    setRandom_Own_shear("random");
    setRandom_Own_ss("random");
    //setAlg("SHEARSHORT");
  }

  const handleSelectChange = (value) => {
    if (alg === "SHEARSHORT") {
      setSelectedValue_shear(value);
    } else {
      setSelectedValue_ss(value);
    }
  };

  const change_box = (value) => {
    if (value === "SHEARSHORT") {
      setAlg(value);
    } else {
      setAlg("SNOR_SHAMMIR");
    }
  };

  function collectNcreate(value) {
    setAlg(value);

    if (value === "SHEARSHORT") {
      if (random_or_own_shear === "random") {
        generateArray(selectedValue_shear);
        setSelectedValue(selectedValue_shear);

        setRandom_Own("random");
        if (selectedValue_shear > 0) {
          setSortState_shear(false);
        }
      } else {
        if (selectedValue_shear <= 64) {
          setInputSize(selectedValue_shear);
          setSelectedValue(selectedValue_shear);

          setRandom_Own("own");
          setSortState_shear(true);
        }
      }
    } else {
      if (random_or_own_ss === "random") {
        generateArray(selectedValue_ss);
        setSelectedValue(selectedValue_ss);
        setRandom_Own("random");
        if (selectedValue_ss > 0) {
          setSortState_ss(false);
        }
      } else {
        if (selectedValue_ss <= 64) {
          setInputSize(selectedValue_ss);
          setSelectedValue(selectedValue_ss);
          setRandom_Own("own");
          setSortState_ss(true);
        }
      }
    }
  }

  useEffect(() => {
    generateArray(input_size);
  }, [input_size]);

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
    if (alg === "SHEARSHORT") {
      setSortState_shear(false);
    } else {
      setSortState_ss(false);
    }
  };

  const options_shear = [4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
  const options_SS = [4, 8, 16, 32, 64, 128, 256];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    handleResize(); // Ελέγχει το πλάτος της οθόνης όταν η εφαρμογή φορτώνεται
    window.addEventListener("resize", handleResize); // Παρακολουθεί τις αλλαγές μεγέθους της οθόνης

    return () => {
      window.removeEventListener("resize", handleResize); // Καθαρίζει τον event listener κατά το unmount
    };
  }, []);

  return (
    <div>
      <div>
        <Navbar onLogoClick={go_back} />
      </div>
      {isMobile && showFirst && (
        <div>
          <HorizontalAccordion />
        </div>
      )}

      {showFirst && (
        <div>
          <div>
            <div className="container">
              <div className="left-div">
                <div>
                  <div id="box1">
                    <Box
                      border={alg === "SHEARSHORT" ? "5px solid" : "1px solid"}
                      borderRadius={15}
                      borderColor={alg === "SHEARSHORT" ? "teal" : "black"}
                      p="10px"
                      position="relative"
                      onClick={() => {
                        change_box("SHEARSHORT");
                      }}
                      cursor={alg === "SHEARSHORT" ? null : "pointer"}
                    >
                      <div className="text">
                        <p>{t("Shearsort algorithm")}</p>
                      </div>
                      <div>
                        <div>
                          <ChakraProvider
                            theme={extendTheme({
                              styles: {
                                global: { body: { bg: "gray.100" } },
                              },
                            })}
                          >
                            <CSSReset />
                            <Box p={4} maxW="md" mx="auto">
                              <Select
                                placeholder={t("Enter mesh dimensions")}
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
                            width="180px"
                            height="38px"
                            isDisabled={
                              alg === "SNOR_SHAMMIR" ||
                              selectedValue_shear === null
                            }
                            colorScheme={
                              random_or_own_shear === "random" ? "teal" : "gray"
                            }
                            onClick={() => random_mesh()}
                          >
                            {t("Random array")}
                          </Button>

                          <Button
                            size="lg"
                            width="180px"
                            height="38px"
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
                            {t("Own")}
                          </Button>

                          <div>
                            <Button
                              colorScheme="red"
                              size="sm"
                              isDisabled={
                                alg === "SNOR_SHAMMIR" ||
                                selectedValue_shear === null
                              }
                              onClick={
                                alg === "SNOR_SHAMMIR"
                                  ? null
                                  : () => collectNcreate(alg)
                              }
                            >
                              {t("Show array")}
                            </Button>
                          </div>
                        </div>

                        <div className="text-display-container">
                          <p className="main-text">{t("shear text")}</p>
                        </div>
                        <div className="box_mesh">
                          {random_or_own === "random" &&
                            isMobile &&
                            alg !== "SNOR_SHAMMIR" && (
                              <MeshComponent grid={array} />
                            )}
                          {random_or_own === "own" &&
                            input_size !== null &&
                            isMobile &&
                            alg !== "SNOR_SHAMMIR" && (
                              <CanvasMesh
                                onPrintValues={set_grid_ready}
                                size={input_size}
                              />
                            )}
                        </div>
                        <div>
                          <Button
                            size="md"
                            width="100px"
                            height="40px"
                            margin="5px"
                            colorScheme={sortstate_shear ? "gray" : "teal"}
                            isDisabled={
                              sortstate_shear || alg === "SNOR_SHAMMIR"
                            }
                            onClick={go_sort}
                          >
                            {t("Sort")}
                          </Button>
                        </div>
                      </div>
                    </Box>
                  </div>
                  <div id="box2">
                    <Box
                      //------------------------------------------------------------------------------------------------------SS BLOCK---------------------------------------------

                      border={
                        alg === "SNOR_SHAMMIR" ? "5px solid" : "1px solid"
                      }
                      borderRadius={15}
                      borderColor={alg === "SNOR_SHAMMIR" ? "teal" : "black"}
                      marginTop="10px"
                      p="10px"
                      position="relative"
                      onClick={() => {
                        change_box("SNOR_SHAMMIR");
                      }}
                      cursor={alg === "SNOR_SHAMMIR" ? null : "pointer"}
                    >
                      <div className="text">
                        <p>Schnorr Shamir algorithm</p>
                      </div>
                      <div>
                        <div>
                          <ChakraProvider
                            theme={extendTheme({
                              styles: {
                                global: { body: { bg: "gray.100" } },
                              },
                            })}
                          >
                            <CSSReset />
                            <Box p={4} maxW="md" mx="auto">
                              <Select
                                placeholder={t("Enter mesh dimensions")}
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
                            width="180px"
                            height="38px"
                            isDisabled={
                              alg === "SHEARSHORT" || selectedValue_ss === null
                            }
                            colorScheme={
                              random_or_own_ss === "random" ? "teal" : "gray"
                            }
                            onClick={() => random_mesh()}
                          >
                            {t("Random array")}
                          </Button>

                          <Button
                            size="lg"
                            width="180px"
                            height="38px"
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
                            {t("Own")}
                          </Button>

                          <div>
                            <Button
                              colorScheme="red"
                              size="sm"
                              isDisabled={
                                alg === "SHEARSHORT" ||
                                selectedValue_ss === null
                              }
                              onClick={
                                alg === "SHEARSHORT"
                                  ? null
                                  : () => collectNcreate(alg)
                              }
                            >
                              {t("Show array")}
                            </Button>
                          </div>
                        </div>
                        <div className="text-display-container">
                          <p className="main-text">{t("ss text")}</p>
                        </div>
                        <div className="box_mesh">
                          {random_or_own === "random" &&
                            isMobile &&
                            alg !== "SHEARSHORT" && (
                              <MeshComponent grid={array} />
                            )}
                          {random_or_own === "own" &&
                            input_size !== null &&
                            isMobile &&
                            alg !== "SHEARSHORT" && (
                              <CanvasMesh
                                onPrintValues={set_grid_ready}
                                size={input_size}
                              />
                            )}
                        </div>
                        <div>
                          <Button
                            size="md"
                            width="100px"
                            height="40px"
                            margin="5px"
                            colorScheme={sortstate_ss ? "gray" : "teal"}
                            isDisabled={sortstate_ss || alg === "SHEARSHORT"}
                            onClick={go_sort}
                          >
                            {t("Sort")}
                          </Button>
                        </div>
                      </div>
                    </Box>
                  </div>
                </div>
              </div>

              <div className="right-div">
                {!isMobile && (
                  <div>
                    <div>
                      <Box
                        //------------------------------------------------------------------------------------------------------RIGHT DIV---------------------------------------------
                        mt={4}
                      >
                        <Text fontSize="md">
                          {array === null
                            ? t("no conf")
                            : alg === "SHEARSHORT" && array.length > 0
                            ? selectedValue + " X " + selectedValue
                            : alg === "SNOR_SHAMMIR" && array.length > 0
                            ? selectedValue + " X " + selectedValue
                            : t("no conf")}
                        </Text>
                      </Box>
                    </div>
                    <div>
                      {random_or_own === "random" && (
                        <MeshComponent grid={array} />
                      )}
                      {random_or_own === "own" && input_size !== null && (
                        <CanvasMesh
                          onPrintValues={set_grid_ready}
                          size={input_size}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        {showSecond && (
          <div>
            <div>
              <Paginator items={record} algorithm={alg} on_go_back={go_back} />
              {loadingbar && (
                <div id="bar">
                  <CircularProgress
                    size={isMobile ? "250px" : "420px"}
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
