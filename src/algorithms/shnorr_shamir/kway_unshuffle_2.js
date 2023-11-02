function kWayUnshuffle2D(mesh) {
  // Get the dimensions of the mesh
  const n = mesh.length;
  const m = mesh[0].length;
  const old_pos = [];
  const new_pos = [];
  // Calculate n^1/4
  const t = Math.pow(n, 1 / 4);

  // Create a new mesh to store the unshuffled result
  const unshuffledMesh = new Array(n);

  // Iterate through the rows of the mesh
  for (let i = 0; i < n; i++) {
    old_pos[i] = i;
    unshuffledMesh[i] = new Array(m);
    for (let j = 0; j < m; j++) {
      // Calculate the new column index using the formula
      const newJ = (j % t) * (n / t) + Math.floor(j / t);
      unshuffledMesh[i][newJ] = mesh[i][j];
      new_pos[j] = newJ;
    }
  }
  /*
  console.log("Columns potitions shuffles: ");
  for (let i = 0; i < old_pos.length; i++) {
    console.log(old_pos[i] + " ---> " + new_pos[i]);
  }*/
  return unshuffledMesh;
}

export { kWayUnshuffle2D };
