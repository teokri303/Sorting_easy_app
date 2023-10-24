let gridSize = 16;
let N = gridSize * gridSize;
let K = Math.pow(N, 1 / 4);

function kWayUnshuffle2D(arr) {
  const numRows = arr.length;
  const numCols = arr[0].length;

  // Calculate the size of each partition
  const partitionSize = Math.floor(numCols / K);

  // Initialize the unshuffled array
  const unshuffledArray = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    unshuffledArray[i] = new Array(numCols);
  }

  // Unshuffle the columns
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const partition = Math.floor(j / partitionSize);
      const originalColumn = (j % K) * partitionSize + partition;
      unshuffledArray[i][originalColumn] = arr[i][j];
    }
  }

  return unshuffledArray;
}

export { kWayUnshuffle2D };
