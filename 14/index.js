import fs from "fs";
import a2d from "array2d";
let grid = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((n) => n.split(""));

console.log(grid[0][0] == "O");
for (let x in grid) {
  for (let y in grid[x]) {
    if (grid[x][y] == "O") {
      moveNorth(x, y);
    }
  }
}
const gridReversed = grid.reverse();
let sum = 0;
for (let i in gridReversed) {
  for (let ch of gridReversed[i]) {
    if (ch == "O") sum += Number(i) + 1;
  }
}
console.log(sum);

function moveNorth(x, y) {
  if (x > 0) {
    if (grid[x - 1][y] == "O" || grid[x - 1][y] == "#") {
      return null;
    } else {
      grid[x - 1][y] = grid[x][y];
      grid[x][y] = ".";
      moveNorth(x - 1, y);
    }
  }
}
