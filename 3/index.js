import fs from "fs";
import { clearScreenDown } from "readline";

const GRID = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((x) => x.split(""));
const ROWS = GRID.length;
const COLUMNS = GRID[0].length;

function part1() {
  let numbers = [];
  const re = /[^0-9\.]/;
  let found;
  for (let x in GRID) {
    for (let y in GRID[x]) {
      found = GRID[x][y].match(re);
      if (found) {
        const hits = searchProximity(x, y);
        numbers = numbers.concat(hits);
      }
    }
  }
  //console.log(numbers);
  console.log(numbers.reduce((s, v) => s + v));
}

part1();

function searchProximity(x, y) {
  x = Number(x);
  y = Number(y);
  const re = /[0-9]/;
  let found;
  let hits = [];
  let current = "";
  //console.log(`found symbol at ${x}, ${y}`);
  if (x > 0 && y > 0) {
    //look up-left
    current = GRID[x - 1][y - 1];
    //console.log(`looking up-left: ${current}`);
    found = current.match(re);
  }
  if (found) hits.push(findNumber(x - 1, y - 1));

  if (x > 0) {
    //look up
    current = GRID[x - 1][y];
    //console.log(`looking up: ${current}`);
    found = current.match(re);
  }
  if (found) hits.push(findNumber(x - 1, y));

  if (x > 0 && y < COLUMNS - 1) {
    //look up-right
    current = GRID[x - 1][y + 1];
    //console.log(`looking up-right: ${current}`);
    found = current.match(re);
  }
  if (found) hits.push(findNumber(x - 1, y + 1));

  if (y > 0) {
    //look left
    current = GRID[x][y - 1];
    //console.log(`looking left: ${current}`);
    found = current.match(re);
  }
  if (found) hits.push(findNumber(x, y - 1));

  if (y < COLUMNS - 1) {
    //look right
    current = GRID[x][y + 1];
    //console.log(`looking right: ${current}`);
    found = current.match(re);
  }
  if (found) hits.push(findNumber(x, y + 1));

  if (x < ROWS - 1 && y > 0) {
    //look down-left
    current = GRID[x + 1][y - 1];
    //console.log(`looking down-left: ${current}`);
    found = current.match(re);
  }
  if (found) hits.push(findNumber(x + 1, y - 1));

  if (x < ROWS - 1) {
    //look down
    current = GRID[x + 1][y];
    //console.log(`looking down: ${current}`);
    found = current.match(re);
  }
  if (found) hits.push(findNumber(x + 1, y));

  if (x < ROWS - 1 && y < COLUMNS - 1) {
    //look down-right
    current = GRID[x + 1][y + 1];
    //console.log(`looking down-right: ${current}`);
    found = current.match(re);
  }
  if (found) hits.push(findNumber(x + 1, y + 1));

  return hits;
}

function findNumber(x, y) {
  x = Number(x);
  y = Number(y);
  let startIndex = y;
  let endIndex = y;
  let numArr = [];
  const re = /[0-9]/;
  let found;

  while (y >= 0 && (found = GRID[x][y].match(re)) != null) {
    //console.log(found, y);
    y--;
  }
  startIndex = y + 1;
  y = startIndex;
  while (y < COLUMNS && (found = GRID[x][y].match(re)) != null) {
    //console.log(found, y);
    y++;
  }
  endIndex = y;
  //console.log(startIndex, endIndex);
  for (let i = startIndex; i < endIndex; i++) {
    numArr.push(GRID[x][i]);
    GRID[x][i] = ".";
  }
  //console.log(numArr);
  return Number(numArr.join(""));
}
