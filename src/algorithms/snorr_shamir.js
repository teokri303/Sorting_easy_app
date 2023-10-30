import {
  isEven,
  odd_Even_Sort,
  Reverse_odd_Even_Sort,
  sortColumns,
} from "../algorithms/odd_even_sort";

import { kWayUnshuffle2D } from "../algorithms/kway_unshuffle";

let gridSize = 16;
let N = gridSize * gridSize;
let blocks_Sum = Math.pow(N, 1 / 4);
let elemenets_in_blocks = Math.pow(blocks_Sum, 3);
let blockSize = Math.pow(N, 1 / 8);
blockSize = Math.pow(blockSize, 3);

function oddEven_Blocks(mesh) {
  //here will be the sorting
  let numRows = mesh.length;
  let oddPhases = Math.round(Math.sqrt(numRows) + 1);
  let evenPhases = Math.round(Math.sqrt(numRows));
  let Phases = oddPhases + evenPhases;

  for (let i = 0; i < Phases; i++) {
    if (isEven(i)) {
      for (let i = 0; i < numRows; i++) {
        if (isEven(i)) {
          odd_Even_Sort(mesh[i]);
        } else {
          Reverse_odd_Even_Sort(mesh[i]);
        }
      }
    } else {
      sortColumns(mesh);
    }
  }

  return mesh;
}

// Λειτουργία για δημιουργία ενός κενού ταξινομημένου πλέγματος.
function createEmptySortedGrid() {
  const sortedGrid = new Array(gridSize)
    .fill(0)
    .map(() => new Array(gridSize).fill(0));
  return sortedGrid;
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
//xorizetai to mesh se blocks kai ta sortarei ena ena me odd even
function sortAndPopulateBlocks(grid) {
  const blocks = [];

  console.log("N = ", +N);
  console.log("NUMBER OF BLOCKS = ", +blocks_Sum);
  console.log("BLOCK-SIDE = ", +blockSize);
  console.log("ELEMENTS BLOCKS = ", +elemenets_in_blocks);

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

      //edo ginetai i taksinomisi tou kathe block
      oddEven_Blocks(block);

      blocks.push(block);
      //console.log(blocks);
    }
  }

  //console.log(blocks);
  return blocks;
}

function snakelikeBlocks(array) {
  var blocks = sortAndPopulateBlocks(array);
  var sortedGrid = createSortedGrid(blocks);

  return sortedGrid;
}

export { snakelikeBlocks };
