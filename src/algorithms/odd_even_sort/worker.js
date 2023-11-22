function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

function oddEvenSort(row, direction) {
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
  //console.log(direction);
  if (direction % 2 !== 0) {
    row.reverse();
  }
  return row;
}

// Λαμβάνει τα δεδομένα από τον κύριο (main) thread
onmessage = function (event) {
  let chunk = event.data.chunk;
  let index = event.data.direction;
  let phase = event.data.phase;

  if (phase === 0) {
    for (let i = 0; i < chunk.length; i++) {
      oddEvenSort(chunk[i], index);
      index++;
    }
  } else {
    const numColumns = chunk[0].length;

    for (let col = 0; col < numColumns; col++) {
      const columnData = chunk.map((row) => row[col]);
      const sortedColumn = oddEvenSort(columnData, 0);

      // Αντικατάσταση των στοιχείων της στήλης με ταξινομημένα
      for (let row = 0; row < chunk.length; row++) {
        chunk[row][col] = sortedColumn[row];
      }
    }
  }

  // Στέλνει τα ταξινομημένα δεδομένα πίσω στον κύριο (main) thread
  postMessage(chunk);
};
