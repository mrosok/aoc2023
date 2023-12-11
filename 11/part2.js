import fs from "fs";
import a2d from "array2d";
let grid = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((n) => n.split(""));
const emptyLinesX = getEmptyLines(grid);
grid = a2d.rrotate(grid);
const emptyLinesY = getEmptyLines(grid);
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
    let multiplier = 1000000;
    let d = 0;
    for (let r of emptyLinesX) {
      if ((x < r && r < currentX) || (currentX < r && r < x))
        d += multiplier - 1;
    }
    for (let c of emptyLinesY) {
      if ((y < c && c < currentY) || (currentY < c && c < y))
        d += multiplier - 1;
    }
    d += x - currentX + Math.abs(y - currentY);
    distances.push(d);
  }
  j++;
}
console.log(distances.reduce((s, v) => s + v));

function getEmptyLines(g) {
  let emptyRows = [];
  g.forEach((row, index) => {
    if (row.every((c) => c === row[0])) {
      emptyRows.push(index);
    }
  });
  return emptyRows;
}
