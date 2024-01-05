import { shearsort } from "../odd_even_sort/odd_even_sort";

let gridSize = 0;
let N = 0;
let blockSize = 0;

function calculate_vars(array) {
  gridSize = array.length;
  N = gridSize * gridSize;
  blockSize = Math.pow(N, 1 / 8);
  blockSize = Math.pow(blockSize, 3);
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

  if (gridSize === 16) {
    for (let row = 0; row < gridSize; row += blockSize * 2) {
      if (row >= blockSize * 2) {
        row = 0;
      }
      for (let col = 0; col < gridSize; col += blockSize) {
        //console.log(blockIndex);
        const block = blocks[blockIndex++];
        for (let i = 0; i < blockSize * 2; i++) {
          for (let j = 0; j < blockSize; j++) {
            sortedGrid[row + i][col + j] = block[i][j];
          }
        }
      }
    }
  } else {
    for (let row = 0; row < gridSize; row += blockSize * 2) {
      for (let col = 0; col < gridSize; col += blockSize) {
        //console.log(blockIndex, "BLOCKINDEX");
        if (col >= blockSize * 4) {
          col = 0;
          row = 128;
        }
        const block = blocks[blockIndex++];
        for (let i = 0; i < blockSize * 2; i++) {
          for (let j = 0; j < blockSize; j++) {
            sortedGrid[row + i][col + j] = block[i][j];
          }
        }
      }
    }
  }
  return sortedGrid;
}
//xorizetai to mesh se blocks kai ta sortarei ena ena me odd even
async function vertical_slices_sort(grid) {
  const blocks = [];

  if (gridSize === 16) {
    for (let row = 0; row < gridSize; row += blockSize * 2) {
      if (row >= blockSize * 2) {
        row = 0;
      }
      for (let col = 0; col < gridSize; col += blockSize) {
        let block = [];
        //console.log(col);

        for (let i = 0; i < blockSize * 2; i++) {
          //rows
          const blockRow = [];
          for (let j = 0; j < blockSize; j++) {
            blockRow.push(grid[row + i][col + j]);
          }

          block.push(blockRow);
        }

        let mid = await shearsort(block);

        blocks.push(mid);
        //console.log(blocks);
      }
    }
  } else {
    for (let row = 0; row < gridSize; row += blockSize * 2) {
      //console.log("ROW :" + row);
      for (let col = 0; col < gridSize; col += blockSize) {
        //console.log(col);
        if (col >= blockSize * 4) {
          col = 0;
          row = 128;
        }
        let block = [];

        for (let i = 0; i < blockSize * 2; i++) {
          //rows
          const blockRow = [];
          for (let j = 0; j < blockSize; j++) {
            blockRow.push(grid[row + i][col + j]);
          }
          block.push(blockRow);
        }

        let mid = await shearsort(block);

        blocks.push(mid);
        //console.log(mid);
      }
    }
  }

  return blocks;
}

async function vertical_slices_first(grid) {
  calculate_vars(grid);

  let blocks = await vertical_slices_sort(grid);
  let sorted = await assemble_slices(blocks);

  return sorted;
}

export { vertical_slices_first };
