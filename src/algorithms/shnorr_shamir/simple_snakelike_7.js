function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

function odd_Even_Sort(nums) {
  let flag = false;
  while (!flag) {
    flag = true;
    for (let i = 1; i < nums.length - 1; i += 2) {
      if (nums[i] > nums[i + 1]) {
        swap(nums, i, i + 1);
        flag = false;
      }
    }
    for (let i = 0; i < nums.length - 1; i += 2) {
      if (nums[i] > nums[i + 1]) {
        swap(nums, i, i + 1);
        flag = false;
      }
    }
  }
  return nums;
}

//let oddPhases = Math.log(numRows) / Math.log(2) + 1; //rows
//let evenPhases = Math.log(numRows) / Math.log(2); //columns

function Reverse_odd_Even_Sort(nums) {
  let flag = false;
  while (!flag) {
    flag = true;
    for (let i = 1; i < nums.length - 1; i += 2) {
      if (nums[i] < nums[i + 1]) {
        swap(nums, i, i + 1);
        flag = false;
      }
    }
    for (let i = 0; i < nums.length - 1; i += 2) {
      if (nums[i] < nums[i + 1]) {
        swap(nums, i, i + 1);
        flag = false;
      }
    }
  }
  return nums;
}

function isEven(number) {
  return number % 2 === 0;
}

function simple_snakelike(mesh) {
  //here will be the sorting

  for (let i = 0; i < mesh.length; i++) {
    if (isEven(i)) {
      odd_Even_Sort(mesh[i]);
    } else {
      Reverse_odd_Even_Sort(mesh[i]);
    }
  }

  return mesh;
}

export { simple_snakelike };
