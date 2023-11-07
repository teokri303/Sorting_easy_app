let counter = 0;
let side = 0;

function reshapeArray(inputArray) {
  const gridsize = inputArray.length;
  side = gridsize;
  let correct_gridSize = 0;

  //console.log(inputArray);

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
        counter++;
      }
    }
  }

  console.log("OPTIMAL STATE ACHIEVED : ");
  console.log(outputArray);
  console.log(
    "We added : ",
    counter,
    " aces to bring it to an optimal state. "
  );
  return outputArray;
}

function removeAces(matrix) {
  let numberOfAcesToRemove = counter;
  // Βρίσκουμε τις διαστάσεις του πίνακα
  const gridSize = matrix.length;

  // Προσδιορίζουμε την αρχική θέση για αφαίρεση (κάτω αριστερά)
  let rowIndex = gridSize - 1;
  let colIndex = 0;
  console.log(numberOfAcesToRemove);
  while (numberOfAcesToRemove > 0) {
    // Εάν έχουμε φτάσει στο τέλος της γραμμής, πηγαίνουμε στην επόμενη γραμμή από πάνω
    if (colIndex === gridSize) {
      rowIndex--;
      colIndex = 0;
    }

    // Εάν έχουμε φτάσει στην πρώτη γραμμή, σταματάμε
    if (rowIndex < 0) {
      break;
    }

    // Εάν το στοιχείο είναι άσσος, το αφαιρούμε και μειώνουμε τον αριθμό των αφαιρεμένων άσσων
    if (matrix[rowIndex][colIndex] === 1) {
      matrix[rowIndex].splice(colIndex, 1);
      numberOfAcesToRemove--;
      //console.log("DELETED");
    } else {
      // Διαφορετικά, πηγαίνουμε στο επόμενο στοιχείο στην ίδια γραμμή
      colIndex++;
    }
  }
  numberOfAcesToRemove = 0;
  counter = 0;
  return matrix;
}

function flattenTo2DArray(arr) {
  const filtered = arr.filter((row) => row.length > 0);
  let direction_array = [];

  for (let i = 0; i < filtered.length; i++) {
    if (i % 2 === 0) {
      direction_array.push(filtered[i]);
    } else {
      direction_array.push(filtered[i].reverse());
    }
  }

  direction_array = direction_array.flat();

  const result = [];

  for (let i = 0; i < side; i++) {
    if (i % 2 === 0) {
      //βλεπουμε αν ειναι odd-even για να τα βαλουμε με την σωστη κατευθυνση

      result.push(direction_array.slice(i * side, (i + 1) * side));
    } else {
      result.push(direction_array.slice(i * side, (i + 1) * side).reverse());
    }
  }

  return result;
}

function reshape_to_given(sorted) {
  let removed_aces_array = removeAces(sorted);
  let final = flattenTo2DArray(removed_aces_array);

  return final;
}

export { reshapeArray, reshape_to_given };
