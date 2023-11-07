// Function to generate a random 2D array with unique numbers
function generateUniqueArray(side) {
  const array = [];
  const uniqueNumbers = Array.from({ length: side * side }, (_, i) => i + 1);

  for (let i = 0; i < side; i++) {
    const row = [];
    for (let j = 0; j < side; j++) {
      const randomIndex = Math.floor(Math.random() * uniqueNumbers.length);
      const randomValue = uniqueNumbers.splice(randomIndex, 1)[0];
      row.push(randomValue);
    }
    array.push(row);
  }

  return array;
}

function generateLeema(side) {
  const random2DArray = [];

  for (let i = 0; i < side; i++) {
    const row = [];
    for (let j = 0; j < side; j++) {
      const randomValue = Math.random() < 0.65 ? 0 : 1; // pithanotita katanomis 1-0
      row.push(randomValue);
    }
    random2DArray.push(row);
  }

  return random2DArray;
}

export { generateUniqueArray, generateLeema };
