import {
  oddEvenSort_Columns_Parallel,
  oddEvenSort_Rows_Parallel,
} from "../odd_even_sort/parallel_odd_even";

async function shearsort(array) {
  let numRows = array.length;
  let oddPhases = Math.log(numRows) / Math.log(2) + 1; //rows
  let evenPhases = Math.log(numRows) / Math.log(2); //columns
  let Phases = Math.round(oddPhases + evenPhases);

  let sortedPhase;
  let grid = array;
  let rows_phase;
  let columns_phase;

  for (let i = 0; i < Phases; i++) {
    if (i % 2 === 0) {
      // xrisimopoioume ta dirtyrows gia na epeksergazomaste kathe fora
      //tis grammes poy den einai sortarismenes
      const dirtyRows = grid.filter(
        (row) => row.includes(0) && row.includes(1)
      );

      const index = grid.indexOf(dirtyRows[0]);

      rows_phase = await oddEvenSort_Rows_Parallel(dirtyRows, index);
      sortedPhase = [...rows_phase];
    } else {
      columns_phase = await oddEvenSort_Columns_Parallel(sortedPhase);

      sortedPhase = [...columns_phase];
    }

    let dirtyIndex = 0;
    let resultGrid = [];
    for (let j = 0; j < grid.length; j++) {
      if (grid[j].includes(0) && grid[j].includes(1)) {
        // Αν η γραμμή είναι dirty, προσθέτει την ταξινομημένη dirty γραμμή
        resultGrid.push(sortedPhase[dirtyIndex]);
        dirtyIndex++;
      } else {
        // Αλλιώς, προσθέτει την clean γραμμή
        resultGrid.push([...grid[j]]);
      }
    }

    grid = [...resultGrid];

    if (sortedPhase.length <= 1) {
      //console.log("GRID IS SORTED ");
      break;
    }
  }

  return grid;
}

export { shearsort };
