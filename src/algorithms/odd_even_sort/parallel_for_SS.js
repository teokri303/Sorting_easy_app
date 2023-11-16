import {
  oddEvenSort_Rows_Parallel,
  oddEvenSort_Columns_Parallel,
} from "./parallel_odd_even";

async function odd_even_parallel(array) {
  let numRows = array.length;
  let oddPhases = Math.log(numRows) / Math.log(2) + 1; //rows
  let evenPhases = Math.log(numRows) / Math.log(2); //columns
  let Phases = Math.round(oddPhases + evenPhases);

  let sortedPhase;
  let odd_phase;
  let even_phase = [...array];
  //setArray([...sortedMesh]);

  for (let i = 0; i < Phases; i++) {
    if (i % 2 == 0) {
      odd_phase = await oddEvenSort_Rows_Parallel(even_phase);
      sortedPhase = [...odd_phase];
    } else {
      even_phase = await oddEvenSort_Columns_Parallel(sortedPhase);
      sortedPhase = [...even_phase];
    }
  }

  return sortedPhase;
}

export { odd_even_parallel };
