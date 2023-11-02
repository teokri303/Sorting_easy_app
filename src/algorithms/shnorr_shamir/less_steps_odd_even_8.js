// Function to generate a random 2D array with unique numbers
function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

function odd_Even_Sort(nums, steps) {
  let counter = 0;
  while (counter < steps) {
    counter++;
    for (let i = 0; i < nums.length - 1; i += 2) {
      if (nums[i] > nums[i + 1]) {
        swap(nums, i, i + 1);
      }
    }

    counter++;
    for (let i = 1; i < nums.length - 1; i += 2) {
      if (nums[i] > nums[i + 1]) {
        swap(nums, i, i + 1);
      }
    }
  }

  //console.log("steeeeeeps R " + counter);
  return nums;
}

function Reverse_odd_Even_Sort(nums, steps) {
  let counter = 0;

  while (counter < steps) {
    counter++;
    for (let i = 0; i < nums.length - 1; i += 2) {
      if (nums[i] < nums[i + 1]) {
        swap(nums, i, i + 1);
      }
    }
    counter++;
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
function odd_even_cols(grid, columnIndex, steps) {
  var numRows = grid.length;
  let counter = 0;
  var swapped = false;

  while (counter < steps) {
    counter++;
    for (let i = 0; i < numRows - 1; i += 2) {
      if (grid[i][columnIndex] > grid[i + 1][columnIndex]) {
        // Swap adjacent rows if they are out of order
        var temp = grid[i][columnIndex];
        grid[i][columnIndex] = grid[i + 1][columnIndex];
        grid[i + 1][columnIndex] = temp;
        swapped = true;
      }
    }

    counter++;
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
function sortColumns(mesh, steps) {
  var numColumns = mesh[0].length;

  var sorted = false;

  while (!sorted) {
    sorted = true;
    for (var columnIndex = 0; columnIndex < numColumns; columnIndex++) {
      sorted = !odd_even_cols(mesh, columnIndex, steps) && sorted;
    }
  }

  return mesh; // Return the sorted mesh
}

function final_oddEven_steps(mesh) {
  //here will be the sorting
  let numRows = mesh.length;
  let oddPhases = Math.log(numRows) / Math.log(2) + 1; //rows
  let evenPhases = Math.log(numRows) / Math.log(2); //columns
  let Phases = oddPhases + evenPhases;

  let N = numRows * numRows;
  let steps = Math.pow(N, 1 / 8);
  steps = Math.pow(steps, 3) * 2;

  console.log(
    "STEPS--------------------------------------------------" + steps
  );

  for (let i = 0; i < Phases; i++) {
    if (isEven(i)) {
      for (let i = 0; i < numRows; i++) {
        if (isEven(i)) {
          odd_Even_Sort(mesh[i], steps);
        } else {
          Reverse_odd_Even_Sort(mesh[i], steps);
        }
      }
    } else {
      sortColumns(mesh, steps);
    }
  }

  return mesh;
}

export { final_oddEven_steps };
