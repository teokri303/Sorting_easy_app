const workerPath = new URL("worker.js", import.meta.url).toString();

let direction = 0;

function oddEvenSort_Rows_Parallel(grid) {
  let workers_counter = 0;
  const promises = grid.map((row) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath);
      workers_counter++;

      worker.onmessage = function (event) {
        worker.terminate();
        resolve(event.data);
        //console.log(event.data);
      };

      const message = {
        row: row,
        direction: direction,
      };

      worker.postMessage(message);
      direction++;
    });
  });
  direction = 0;
  return Promise.all(promises).then((sortedRows) => {
    const sortedGrid = sortedRows.map((row) => row.slice());
    console.log(workers_counter + " Workers summoned for this ROW sort. ");
    return sortedGrid;
  });
}

function oddEvenSort_Columns_Parallel(grid) {
  const promises = [];
  const numColumns = grid[0].length;

  for (let col = 0; col < numColumns; col++) {
    const columnData = grid.map((row) => row[col]);

    promises.push(
      new Promise((resolve) => {
        const worker = new Worker(workerPath);

        worker.onmessage = function (event) {
          worker.terminate();
          resolve(event.data);
        };

        const message = {
          row: columnData,
          direction: 0,
        };

        worker.postMessage(message);
      })
    );
  }

  return Promise.all(promises).then((sortedColumns) => {
    const sortedGrid = [];
    for (let row = 0; row < grid.length; row++) {
      sortedGrid[row] = [];
      for (let col = 0; col < numColumns; col++) {
        sortedGrid[row][col] = sortedColumns[col][row];
      }
    }

    return sortedGrid;
  });
}

export { oddEvenSort_Rows_Parallel, oddEvenSort_Columns_Parallel };
