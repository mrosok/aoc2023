import fs from "fs";

function part1() {
  const lines = fs
    .readFileSync("./input.txt", "utf-8")
    .trim().split("\n");
  let sumPoints = [];
  lines.forEach((line) => {
    line = line.split(": ");
    line.shift();
    line = line.toString();
    const numbers = line.split(" | ");
    let winningNumbers = numbers[0].split(" ").filter(n => n).map(Number);
    let userNumbers = numbers[1].split(" ").filter(n => n).map(Number);
    let hits = 0;
    for (let i in userNumbers) {
      if (winningNumbers.includes(userNumbers[i])) {
        hits++;
      }
    }
    sumPoints.push(calculatePoints(hits));
  });
  console.log(sumPoints.reduce((s, v) => s+ v));
}

part1();

function calculatePoints(hits) {
  let points = 0
  for (let i=0; i<hits; i++) {
    points = (i == 0) ? 1 : points * 2;
  }
    return points;
}