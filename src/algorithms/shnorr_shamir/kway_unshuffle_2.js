function kWayUnshuffle2D(mesh) {
  // Get the dimensions of the mesh
  const n = mesh.length;
  const m = mesh[0].length;
  const old_pos = [];
  const new_pos = [];
  // Calculate n^1/4
  const t = Math.pow(n, 1 / 4);

  const unshuffledMesh = new Array(n);

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

  return unshuffledMesh;
}

export { kWayUnshuffle2D };
