function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

function oddEvenSort(row) {
  let steps = 0;
  while (steps < row.length) {
    steps++;
    for (let i = 0; i < row.length - 1; i += 2) {
      if (row[i] > row[i + 1]) {
        swap(row, i, i + 1);
      }
    }

    steps++;
    for (let i = 1; i < row.length - 1; i += 2) {
      if (row[i] > row[i + 1]) {
        swap(row, i, i + 1);
      }
    }
  }
  return row;
}

// Λαμβάνει τα δεδομένα από τον κύριο (main) thread
onmessage = function (event) {
  let row = event.data.row;
  //console.log(row);
  let direction = event.data.direction;

  const sortedRow = oddEvenSort(row);

  if (direction % 2 !== 0) {
    sortedRow.reverse();
  }
  // Στέλνει τα ταξινομημένα δεδομένα πίσω στον κύριο (main) thread
  postMessage(sortedRow);
};
