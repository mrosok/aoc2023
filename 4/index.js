import fs from "fs";
const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

function part1() {
  let sumPoints = [];
  lines.forEach((line) => {
    let [id, numbers] = line.split(": ");
    let [winningNumbers, userNumbers] = numbers.split(" | ");
    winningNumbers = winningNumbers
      .split(" ")
      .filter((n) => n)
      .map(Number);
    userNumbers = userNumbers
      .split(" ")
      .filter((n) => n)
      .map(Number);
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

function part2() {
  let cardCount = new Array(lines.length).fill(1);

  lines.forEach((line, index) => {
    let [id, numbers] = line.split(": ");
    let [winningNumbers, userNumbers] = numbers.split(" | ");
    winningNumbers = winningNumbers
      .split(" ")
      .filter((n) => n)
      .map(Number);
    userNumbers = userNumbers
      .split(" ")
      .filter((n) => n)
      .map(Number);
    let hits = 0;
    for (let i in userNumbers) {
      if (winningNumbers.includes(userNumbers[i])) {
        hits++;
      }
    }
    if (hits) {
      for (let i = index + 1; i < index + 1 + hits; i++) {
        if (cardCount[i]) {
          cardCount[i] += cardCount[index];
        }
      }
    }
  });
  console.log(cardCount.reduce((s, v) => s + v));
}

part2();

//testing comment
