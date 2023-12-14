import fs from "fs";
import a2d from "array2d";
let grid = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((n) => n.split(""));

function part1() {
  move();
  console.log(flatten(grid));
  console.log(score());
}

function part2() {
  let target = 10 ** 9;
  let t = 0;
  let map = new Map();
  while (t < target) {
    cycle();
    const hash = flatten(grid);
    if (map.has(hash)) {
      const start = map.get(hash);
      const length = t - start;
      const remain = target - 1 - t;
      const mod = remain % length;
      for (let i = 0; i < mod; i++) {
        cycle();
      }
      console.log(score());
      break;
    } else {
      map.set(hash, t);
      t++;
    }
  }
}

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
function move() {
  for (let x in grid) {
    for (let y in grid[x]) {
      if (grid[x][y] == "O") {
        moveNorth(x, y);
      }
    }
  }
}
function cycle() {
  for (let i = 0; i < 4; i++) {
    move();
    grid = a2d.rrotate(grid);
  }
}
function score() {
  let sum = 0;
  for (let i in grid) {
    for (let ch of grid[i]) {
      if (ch == "O") sum += grid.length - i;
    }
  }
  return sum;
}

function flatten(grid) {
  return grid.map((line) => line.join("")).join("\n");
}

part2();
