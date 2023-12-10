import fs from "fs";

class Node {
  constructor(value) {
    this._value = value;
  }
  _start = false;
  _valid = true;

  get value() {
    return this._value;
  }
  get start() {
    return this._start;
  }
  get valid() {
    return this._valid;
  }
  set value(value) {
    this._value = value;
  }
  set start(value) {
    this._start = value;
  }
  mark() {
    this._valid = false;
  }
}

const GRID = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((x) => x.split(""));
const ROWS = GRID.length;
const COLUMNS = GRID[0].length;
let startX;
let startY;

for (let x in GRID) {
  for (let y in GRID[x]) {
    GRID[x][y] = new Node(GRID[x][y]);
    if (GRID[x][y].value == "S") {
      GRID[x][y].start = true;
      startX = Number(x);
      startY = Number(y);
    }
  }
}

const snew = {
  S: ["L", "|", "J", "S"],
  N: ["|", "7", "F", "S"],
  E: ["-", "J", "7", "S"],
  W: ["-", "L", "F", "S"],
};
const dir = {
  "|": ["S", "N"],
  "-": ["E", "W"],
  L: ["N", "E"],
  J: ["N", "W"],
  7: ["S", "W"],
  F: ["S", "E"],
};

function part1() {
  transformS();
  let x = startX;
  let y = startY;
  let current = GRID[x][y];
  let steps = 0;
  while (!current.start || steps == 0) {
    GRID[x][y].mark();
    grid: for (let d of dir[current.value]) {
      switch (d) {
        case "N":
          if (GRID[x - 1][y].valid || GRID[x - 1][y].start) {
            //move north
            x--;
            steps++;
            break grid;
          }
          break;
        case "E":
          if (GRID[x][y + 1].valid || GRID[x][y + 1].start) {
            //move east
            y++;
            steps++;
            break grid;
          }
          break;
        case "S":
          if (GRID[x + 1][y].valid || GRID[x + 1][y].start) {
            //move south
            x++;
            steps++;
            break grid;
          }
          break;
        case "W":
          if (GRID[x][y - 1].valid || GRID[x][y - 1].start) {
            //move west
            y--;
            steps++;
            break grid;
          }
          break;
      }
    }
    current = GRID[x][y];
  }
  console.log(steps / 2);
}

part1();

function transformS() {
  const map = {
    NS: "|",
    EW: "-",
    NE: "L",
    NW: "J",
    SW: "7",
    ES: "F",
  };

  let node;
  let startNode = "";
  if (startX > 0) {
    //look north
    node = GRID[startX - 1][startY];
    if (snew["N"].indexOf(node.value) != -1) {
      startNode += "N";
    }
  }

  if (startY < COLUMNS - 1) {
    //look east
    node = GRID[startX][startY + 1];
    if (snew["E"].indexOf(node.value) != -1) {
      startNode += "E";
    }
  }

  if (startX < ROWS - 1) {
    //look south
    node = GRID[startX + 1][startY];
    if (snew["S"].indexOf(node.value) != -1) {
      startNode += "S";
    }
  }

  if (startY > 0) {
    //look west
    node = GRID[startX][startY - 1];
    if (snew["W"].indexOf(node.value) != -1) {
      startNode += "W";
    }
  }
  console.log(startNode);
  GRID[startX][startY].value = map[startNode];
}

//for debugging
function printGrid() {
  for (let x in GRID) {
    let arr = [];
    for (let y in GRID[0]) {
      if (GRID[x][y].valid) {
        arr.push(GRID[x][y].value);
      } else {
        arr.push("X");
      }
    }
    console.log(arr);
  }
}
