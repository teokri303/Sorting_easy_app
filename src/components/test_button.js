import { Button } from '@chakra-ui/react'
import {odd_Even_Sort ,Reverse_odd_Even_Sort,sortColumns, isEven} from '../algorithms/odd_even_sort';


export default function Test() {

let array = []

    // Function to generate a random 5x5 2D array with unique numbers
function generateUniqueArray() {
  const array = [];
  const uniqueNumbers = Array.from({ length: 25 }, (_, i) => i + 1);

  for (let i = 0; i < 4; i++) {
    const row = [];
    for (let j = 0; j < 4; j++) {
      const randomIndex = Math.floor(Math.random() * uniqueNumbers.length);
      const randomValue = uniqueNumbers.splice(randomIndex, 1)[0];
      row.push(randomValue);
    }
    array.push(row);
  }

  return array;
}

// Function to print the 2D array to the console
function print() {
    let randomArray = generateUniqueArray();
    array = randomArray
    
    console.log("Random 5x5 array:");

    for (const row of randomArray) {
        console.log(row.join("\t"));
    }
   
}








function oddEvenSort2D(mesh) {
    //here will be the sorting
  let numRows = mesh.length   
  console.log("Sorting..... " +numRows +' Rows')
  
  for (let i =0 ; i < numRows; i++) {
    if (isEven(i)) {
      odd_Even_Sort(mesh[i])
     
    } else {
      Reverse_odd_Even_Sort(mesh[i])
      
    }

  }

  return mesh;
}

function printsorted(){
    var sortedMesh = oddEvenSort2D(array);
    console.log("SORTED 5x5 array:");

    for (const row of sortedMesh) {
        console.log(row.join("\t"));
   }

   console.log("SORTED COLUMN:");

   sortedMesh = sortColumns(array);

   for (const row of sortedMesh) {
    console.log(row.join("\t"));
}

   

}


    return(
        <div>
        <Button colorScheme='blue' onClick={print}>Button</Button>
        <Button colorScheme='green' onClick={printsorted} >Sort the array</Button>
        </div>
        
    )
}