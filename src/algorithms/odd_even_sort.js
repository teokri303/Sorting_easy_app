function swap(nums, i, j) {
    const temp= nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }
  
  function odd_Even_Sort(nums) {
    let flag = false
    while (!flag) {
      flag = true
      for (let i = 1; i < nums.length - 1; i += 2) {
        if (nums[i] > nums[i + 1]) {
          swap(nums, i, i + 1)
          flag = false
        }
      }
      for (let i = 0; i < nums.length - 1; i += 2) {
        if (nums[i] > nums[i + 1]) {
          swap(nums, i, i + 1)
          flag = false
        }
      }
    }
    return nums
  }

  function Reverse_odd_Even_Sort(nums) {
    let flag = false
    while (!flag) {
      flag = true
      for (let i = 1; i < nums.length - 1; i += 2) {
        if (nums[i] < nums[i + 1]) {
          swap(nums, i, i + 1)
          flag = false
        }
      }
      for (let i = 0; i < nums.length - 1; i += 2) {
        if (nums[i] < nums[i + 1]) {
          swap(nums, i, i + 1)
          flag = false
        }
      }
    }
    return nums
  }

  function isEven(number) {
    return number % 2 === 0;
  }




// Function to perform one iteration of odd-even transposition sort on a column
function oddEvenTranspositionSortColumn(mesh, columnIndex) {
  var numRows = mesh.length;
  var swapped = false;

  for (let i = 0; i < numRows - 1; i += 2) {
    if (mesh[i][columnIndex] > mesh[i + 1][columnIndex]) {
      // Swap adjacent rows if they are out of order
      var temp = mesh[i][columnIndex];
      mesh[i][columnIndex] = mesh[i + 1][columnIndex];
      mesh[i + 1][columnIndex] = temp;
      swapped = true;
    }
  }

  for (let i = 1; i < numRows - 1; i += 2) {
    if (mesh[i][columnIndex] > mesh[i + 1][columnIndex]) {
      // Swap adjacent rows if they are out of order
      let temp = mesh[i][columnIndex];
      mesh[i][columnIndex] = mesh[i + 1][columnIndex];
      mesh[i + 1][columnIndex] = temp;
      swapped = true;
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
      sorted = !oddEvenTranspositionSortColumn(mesh, columnIndex) && sorted;
    }
  }

  return mesh; // Return the sorted mesh
}






  export {odd_Even_Sort,Reverse_odd_Even_Sort,sortColumns, swap ,isEven}