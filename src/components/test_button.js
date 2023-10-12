import { Button } from "@chakra-ui/react";
import {
  generateUniqueArray,
  oddEvenSort2D,
} from "../algorithms/odd_even_sort";

import { oddEven_Blocks } from "../algorithms/snorr_shamir";

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
  }
  //----------------------------------------------------line-------------------------------------------------
  const gridSize = 16;
  const blockSize = 4;

  // Λειτουργία για δημιουργία ενός κενού ταξινομημένου πλέγματος.
  function createEmptySortedGrid() {
    const sortedGrid = new Array(gridSize)
      .fill(0)
      .map(() => new Array(gridSize).fill(0));
    return sortedGrid;
  }

  function sortAndPopulateBlocks(grid) {
    const blocks = [];

    for (let row = 0; row < gridSize; row += blockSize) {
      for (let col = 0; col < gridSize; col += blockSize) {
        let block = [];
        for (let i = 0; i < blockSize; i++) {
          const blockRow = [];
          for (let j = 0; j < blockSize; j++) {
            blockRow.push(grid[row + i][col + j]);
          }
          block.push(blockRow);
        }

        oddEven_Blocks(block);

        blocks.push(block);
        //console.log(blocks);
      }
    }

    return blocks;
  }

  // Λειτουργία για τον πλήρη υπολογισμό του ταξινομημένου πλέγματος.
  function createSortedGrid(blocks) {
    const sortedGrid = createEmptySortedGrid();
    let blockIndex = 0;

    for (let row = 0; row < gridSize; row += blockSize) {
      for (let col = 0; col < gridSize; col += blockSize) {
        const block = blocks[blockIndex++];
        for (let i = 0; i < blockSize; i++) {
          for (let j = 0; j < blockSize; j++) {
            sortedGrid[row + i][col + j] = block[i][j];
          }
        }
      }
    }

    return sortedGrid;
  }

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
          Sort the array
        </Button>
      </div>
      <div>
        <Button colorScheme="blue" onClick={generateArray}>
          Create BIG
        </Button>
        <Button colorScheme="green" onClick={sort_Second_Alg}>
          Sort the array
        </Button>
      </div>
    </div>
  );
}
