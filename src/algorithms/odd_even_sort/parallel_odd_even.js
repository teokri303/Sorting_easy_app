const workerPath = new URL("worker.js", import.meta.url).toString();

function oddEvenSortParallel(matrix) {
  const promises = matrix.map((row) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath);

      worker.onmessage = function (event) {
        worker.terminate();
        resolve(event.data);
      };

      worker.postMessage(row);
    });
  });

  return Promise.all(promises).then((sortedRows) => {
    const sortedMatrix = sortedRows.map((row) => row.slice());
    return sortedMatrix;
  });
}

export { oddEvenSortParallel };
