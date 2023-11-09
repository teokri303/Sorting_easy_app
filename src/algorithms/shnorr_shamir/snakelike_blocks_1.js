import {
  isEven,
  odd_Even_Sort,
  Reverse_odd_Even_Sort,
  sortColumns,
} from "../odd_even_sort/odd_even_sort";

let gridSize = 0;
let N = 0;
let blocks_Sum = 0;
let elemenets_in_blocks = 0;
let blockSize = 0;

function calculate_vars(array) {
  gridSize = array.length;
  N = gridSize * gridSize;
  blocks_Sum = Math.pow(N, 1 / 4);
  elemenets_in_blocks = Math.pow(blocks_Sum, 3);
  blockSize = Math.pow(N, 1 / 8);
  blockSize = Math.pow(blockSize, 3);

  console.log("N = ", +N);
  console.log("NUMBER OF BLOCKS = ", +blocks_Sum);
  console.log("BLOCK-SIDE = ", +blockSize);
  console.log("ELEMENTS BLOCKS = ", +elemenets_in_blocks);
}

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

  //console.log(sortedGrid);

  return sortedGrid;
}

export { snakelikeBlocks, calculate_vars };
