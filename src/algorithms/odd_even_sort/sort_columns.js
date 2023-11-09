// Function to perform one iteration of odd-even transposition sort on a column
function odd_even_cols(grid, columnIndex) {
  var numRows = grid.length;
  let steps = 0;
  var swapped = false;

  while (steps < grid.length) {
    steps++;
    for (let i = 0; i < numRows - 1; i += 2) {
      if (grid[i][columnIndex] > grid[i + 1][columnIndex]) {
        // Swap adjacent rows if they are out of order
        var temp = grid[i][columnIndex];
        grid[i][columnIndex] = grid[i + 1][columnIndex];
        grid[i + 1][columnIndex] = temp;
        swapped = true;
      }
    }

    steps++;
    for (let i = 1; i < numRows - 1; i += 2) {
      if (grid[i][columnIndex] > grid[i + 1][columnIndex]) {
        // Swap adjacent rows if they are out of order
        let temp = grid[i][columnIndex];
        grid[i][columnIndex] = grid[i + 1][columnIndex];
        grid[i + 1][columnIndex] = temp;
        swapped = true;
      }
    }
  }

  return swapped;
}

function createEmptySortedGrid(grid) {
  const sortedGrid = new Array(grid.length)
    .fill(0)
    .map(() => new Array(grid.length).fill(0));
  return sortedGrid;
}

// Function to sort all columns of the mesh using odd-even transposition sort
function sortColumns(array) {
  let mesh = array.map((row) => [...row]);

  var numColumns = mesh[0].length;

  var sorted = false;

  while (!sorted) {
    sorted = true;
    for (var columnIndex = 0; columnIndex < numColumns; columnIndex++) {
      sorted = !odd_even_cols(mesh, columnIndex) && sorted;
    }
  }

  return mesh; // Return the sorted mesh
}

export { sortColumns };
