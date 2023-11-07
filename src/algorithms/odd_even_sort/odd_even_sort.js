function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

function odd_Even_Sort(nums) {
  let steps = 0;
  while (steps < nums.length) {
    steps++;
    for (let i = 0; i < nums.length - 1; i += 2) {
      if (nums[i] > nums[i + 1]) {
        swap(nums, i, i + 1);
      }
    }

    steps++;
    for (let i = 1; i < nums.length - 1; i += 2) {
      if (nums[i] > nums[i + 1]) {
        swap(nums, i, i + 1);
      }
    }
  }

  //console.log("steeeeeeps R " + steps);
  return nums;
}

function Reverse_odd_Even_Sort(nums) {
  let steps = 0;

  while (steps < nums.length) {
    steps++;
    for (let i = 0; i < nums.length - 1; i += 2) {
      if (nums[i] < nums[i + 1]) {
        swap(nums, i, i + 1);
      }
    }
    steps++;
    for (let i = 1; i < nums.length - 1; i += 2) {
      if (nums[i] < nums[i + 1]) {
        swap(nums, i, i + 1);
      }
    }
  }
  //console.log("steeeeeeps L " + steps);
  return nums;
}

function isEven(number) {
  return number % 2 === 0;
}

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

// Function to sort all columns of the mesh using odd-even transposition sort
function sortColumns(mesh) {
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

function oddEvenSort2D(mesh) {
  //here will be the sorting
  let numRows = mesh.length;
  let oddPhases = Math.log(numRows) / Math.log(2) + 1; //rows
  let evenPhases = Math.log(numRows) / Math.log(2); //columns
  let Phases = oddPhases + evenPhases;
  console.log(
    "Sorting.....with " +
      oddPhases +
      " oddPhases and " +
      evenPhases +
      " evenPhases"
  );

  for (let i = 0; i < Phases; i++) {
    if (isEven(i)) {
      for (let i = 0; i < numRows; i++) {
        if (isEven(i)) {
          odd_Even_Sort(mesh[i]);
        } else {
          Reverse_odd_Even_Sort(mesh[i]);
        }
      }
      /*
      console.log("PHASE " + [i + 1] + " rows snakelike");
      for (const row of mesh) {
        console.log(row.join("\t"));
      }*/
    } else {
      sortColumns(mesh);
      /*
      console.log("PHASE " + [i + 1] + " columns sort");
      for (const row of mesh) {
        console.log(row.join("\t"));
      }
      */
    }
  }

  return mesh;
}

export {
  odd_Even_Sort,
  Reverse_odd_Even_Sort,
  sortColumns,
  swap,
  isEven,
  oddEvenSort2D,
};
