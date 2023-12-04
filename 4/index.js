import fs from "fs";

function part1() {
  const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");
  let sumPoints = [];
  lines.forEach((line) => {
    line = line.split(": ");
    line.shift();
    line = line.toString();
    const numbers = line.split(" | ");
    let winningNumbers = numbers[0].split(" ").filter((n) => n).map(Number);
    let userNumbers = numbers[1].split(" ").filter((n) => n).map(Number);
    let hits = 0;
    for (let i in userNumbers) {
      if (winningNumbers.includes(userNumbers[i])) {
        hits++;
      }
    }
    if (hits) {
      sumPoints.push(2 ** (hits - 1));
    }
  });
  console.log(sumPoints.reduce((s, v) => s + v));
}

part1();
