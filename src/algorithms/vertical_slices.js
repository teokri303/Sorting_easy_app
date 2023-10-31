import {
  isEven,
  odd_Even_Sort,
  Reverse_odd_Even_Sort,
  sortColumns,
} from "../algorithms/odd_even_sort";

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
}

function show(arr) {
  for (const row of arr) {
    console.log(row.join("\t"));
  }
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
  const empty_ar = new Array(gridSize)
    .fill(0)
    .map(() => new Array(gridSize).fill(0));
  return empty_ar;
}

// Λειτουργία για τον πλήρη υπολογισμό του ταξινομημένου πλέγματος.
function assemble_slices(blocks) {
  const sortedGrid = createEmptySortedGrid();

  let blockIndex = 0;

  for (let row = 0; row < gridSize; row += blockSize * 2) {
    if (row >= blockSize * 2) {
      row = 0;
    }
    for (let col = 0; col < gridSize; col += blockSize) {
      console.log(blockIndex);
      const block = blocks[blockIndex++];
      for (let i = 0; i < blockSize * 2; i++) {
        for (let j = 0; j < blockSize; j++) {
          sortedGrid[row + i][col + j] = block[i][j];
        }
      }
    }
  }
  return sortedGrid;
}
//xorizetai to mesh se blocks kai ta sortarei ena ena me odd even
function vertical_slices_sort(grid) {
  const blocks = [];

  console.log("INSIDE VERTICALLLLLLL ------ΩΩΩΩΩΩΩΩΩΩΩΩ");

  console.log(grid);

  for (let row = 0; row < gridSize; row += blockSize * 2) {
    if (row >= blockSize * 2) {
      row = 0;
    }
    for (let col = 0; col < gridSize; col += blockSize) {
      let block = [];
      for (let i = 0; i < blockSize * 2; i++) {
        //rows
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
  /*
  for (let i = 0; i < blocks.length; i++) {
    console.log(
      "------------   ------------------------------ " +
        i +
        "o BLOCK -------------------------------------------------------------"
    );
    for (const row of blocks[i]) {
      console.log(row.join("\t"));
    }
  }*/

  return blocks;
}

function vertical_slices(grid) {
  calculate_vars(grid);

  let blocks = vertical_slices_sort(grid);
  //let sorted = assemble_slices(blocks);

  //console.log(sorted.length);

  //return sorted;
}

export { vertical_slices };
