const workerPath = new URL("worker.js", import.meta.url).toString();

let numWorkers = 4;

function oddEvenSort_Rows_Parallel(grid, index) {
  const numRows = grid.length;
  if (numRows < 50) {
    numWorkers = 2;
  } else if (numRows < 25) {
    numWorkers = 1;
  }
  const chunkSize = Math.ceil(numRows / numWorkers);
  console.log("Gia  " + grid.length + "  exo  " + chunkSize);

  const promises = [];

  for (let workerIndex = 0; workerIndex < numWorkers; workerIndex++) {
    const start = workerIndex * chunkSize;
    const end = Math.min((workerIndex + 1) * chunkSize, numRows);

    const rowsChunk = grid.slice(start, end);

    promises.push(
      new Promise((resolve) => {
        const worker = new Worker(workerPath);

        worker.onmessage = function (event) {
          worker.terminate();
          resolve(event.data);
        };

        const message = {
          chunk: rowsChunk,
          direction: index,
          phase: 0,
        };

        worker.postMessage(message);
      })
    );
    index = index + rowsChunk.length;
  }

  return Promise.all(promises).then((sortedChunks) => {
    const sortedRows = [];

    for (let i = 0; i < numWorkers; i++) {
      sortedRows.push(...sortedChunks[i]);
    }

    const sortedGrid = sortedRows;

    numWorkers = 4;

    return sortedGrid;
  });
}

function oddEvenSort_Columns_Parallel(grid) {
  const numColumns = grid[0].length;
  const chunkSize = Math.ceil(numColumns / numWorkers);
  const promises = [];

  for (let workerIndex = 0; workerIndex < numWorkers; workerIndex++) {
    const start = workerIndex * chunkSize;
    const end = Math.min((workerIndex + 1) * chunkSize, numColumns);

    const columnsChunk = grid.map((row) => row.slice(start, end));

    //console.log(columnsChunk);

    promises.push(
      new Promise((resolve) => {
        const worker = new Worker(workerPath);

        worker.onmessage = function (event) {
          worker.terminate();
          resolve(event.data);
        };

        const message = {
          chunk: columnsChunk,
          direction: 1,
          phase: 1,
        };

        worker.postMessage(message);
      })
    );
  }
  //console.log("COLUMNS");

  return Promise.all(promises).then((sortedChunks) => {
    //console.log(sortedChunks);

    // Χρησιμοποιούμε το reduce για να συνδυάσουμε δυναμικά τα arrays
    const sortedGrid = sortedChunks.reduce((accumulator, currentArray) => {
      // Εάν το accumulator είναι κενό, απλά επιστρέφουμε το currentArray
      if (accumulator.length === 0) {
        return currentArray;
      }

      // Διαφορετικά, συνδυάζουμε τα arrays
      return accumulator.map((row, rowIndex) =>
        row.concat(currentArray[rowIndex])
      );
    }, []);

    //console.log(sortedGrid);

    return sortedGrid;
  });
}

export { oddEvenSort_Rows_Parallel, oddEvenSort_Columns_Parallel };
