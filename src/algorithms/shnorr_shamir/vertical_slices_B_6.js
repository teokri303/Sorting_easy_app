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

  for (let row = 0; row < blockSize; row += blockSize) {
    for (let col = 0; col < gridSize; col += blockSize) {
      const block = blocks[blockIndex++];
      for (let i = 0; i < blockSize; i++) {
        for (let j = 0; j < blockSize; j++) {
          sortedGrid[row + i][col + j] = block[i][j];
        }
      }
    }
  }

  for (let row = blockSize; row < gridSize - blockSize; row += blockSize * 2) {
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

  for (let row = blockSize * 3; row < gridSize; row += blockSize) {
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
async function vertical_slices_sort(grid) {
  const blocks = [];

  for (let row = 0; row < blockSize; row += blockSize) {
    for (let col = 0; col < gridSize; col += blockSize) {
      let block = [];
      for (let i = 0; i < blockSize; i++) {
        const blockRow = [];
        for (let j = 0; j < blockSize; j++) {
          blockRow.push(grid[row + i][col + j]);
        }
        block.push(blockRow);
      }

      blocks.push(block);
      //console.log(blocks);
    }
  }

  for (let row = blockSize; row < gridSize - blockSize; row += blockSize * 2) {
    //console.log("ROW :" + row);
    for (let col = 0; col < gridSize; col += blockSize) {
      //console.log(col);
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
      //console.log(blocks);
    }
  }

  for (let row = blockSize * 3; row < gridSize; row += blockSize) {
    for (let col = 0; col < gridSize; col += blockSize) {
      let block = [];
      for (let i = 0; i < blockSize; i++) {
        const blockRow = [];
        for (let j = 0; j < blockSize; j++) {
          blockRow.push(grid[row + i][col + j]);
        }
        block.push(blockRow);
      }

      blocks.push(block);
      //console.log(blocks);
    }
  }
  //console.log(blocks);
  return blocks;
}

async function vertical_slices_second(grid) {
  calculate_vars(grid);

  if (gridSize === 16) {
    return grid;
  } else {
    let blocks = await vertical_slices_sort(grid);
    let sorted = await assemble_slices(blocks);

    //console.log(sorted);

    return sorted;
  }
}

export { vertical_slices_second };
