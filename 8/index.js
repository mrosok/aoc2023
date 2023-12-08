import fs from "fs";
let [steps, map] = fs.readFileSync("./input.txt", "utf-8").trim().split("\n\n");

const lines = map.split("\n");

map = {};
lines.forEach((line) => {
  let [a, b] = line.split("=");
  b = b.replaceAll(/\(|\)/g, "").trim();
  map[a.trim()] = b.split(", ");
});

steps = steps.split("");

function part1() {
  let currentLoc = "AAA";
  let counter = 0;
  let finished = false;

  while (!finished) {
    for (let i in steps) {
      if (steps[i] == "L") {
        currentLoc = map[currentLoc][0];
        counter++;
        if (currentLoc == "ZZZ") {
          finished = true;
          break;
        }
      }
      if (steps[i] == "R") {
        currentLoc = map[currentLoc][1];
        counter++;
        if (currentLoc == "ZZZ") {
          finished = true;
          break;
        }
      }
    }
  }
  console.log(counter);
}

part1();
