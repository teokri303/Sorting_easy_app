function reshapeArray(inputArray) {
  const gridsize = inputArray.length;
  let correct_gridSize = 0;

  console.log(inputArray);

  if (gridsize === 16 || gridsize === 256) {
    // Το inputArray έχει ήδη τις επιθυμητές διαστάσεις, επιστροφή ως είναι.
    return inputArray;
  }

  //psaxnoume poia einai i idaniki katastash
  if (gridsize < 16) {
    correct_gridSize = 16;
  } else if (gridsize < 256 && gridsize > 16) {
    correct_gridSize = 256;
  }

  const outputArray = [];

  for (let i = 0; i < correct_gridSize; i++) {
    outputArray[i] = [];
    for (let j = 0; j < correct_gridSize; j++) {
      if (i < gridsize && j < gridsize) {
        outputArray[i][j] = inputArray[i][j];
      } else {
        // Αν ξεπερνάμε τα όρια του inputArray, προσθέτουμε έναν ασσό.
        outputArray[i][j] = 1;
      }
    }
  }

  console.log("array changed: ");
  console.log(outputArray);
  return outputArray;
}

export { reshapeArray };
