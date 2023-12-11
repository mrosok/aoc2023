import fs from "fs";
import a2d from "array2d";
let grid = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((n) => n.split(""));

grid = doubleLines(grid);
grid = a2d.rrotate(grid);
grid = doubleLines(grid);
grid = a2d.lrotate(grid);

let map = {};
let counter = 1;
for (let r in grid) {
  for (let c in grid[0]) {
    if (grid[r][c] == "#") {
      grid[r][c] = counter;
      map[counter] = [r, c];
      counter++;
    }
  }
}
let distances = [];
let j = 1;
while (j < counter) {
  let [currentX, currentY] = map[j];
  for (let i = j + 1; i < counter; i++) {
    let [x, y] = map[i];
    distances.push(x - currentX + Math.abs(y - currentY));
  }
  j++;
}
console.log(distances.reduce((s, v) => s + v));

function doubleLines(g) {
  let emptyRows = [];
  g.forEach((row, index) => {
    if (row.every((c) => c === row[0])) {
      emptyRows.push(index);
    }
  });

  let shift = 0;
  for (let i of emptyRows) {
    g.splice(i + shift, 0, g[i + shift]);
    shift++;
  }
  return g;
}
