import fs from "fs";
let [times, records] = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n");

function part1() {
  times = times.split(": ")[1].trim().split(/\s+/).map(Number);
  records = records.split(": ")[1].trim().split(/\s+/).map(Number);
  let wins = [];
  times.forEach((time, index) => {
    let distances = [];
    for (let i = 1; i < time; i++) {
      distances.push(i * (time - i));
    }
    wins.push(distances.filter((n) => n > records[index]).length);
  });
  console.log(wins.reduce((p, f) => p * f));
}

//part1();

function part2() {
  const time = Number(times.replace(/[^0-9]/g, ""));
  const record = Number(records.replace(/[^0-9]/g, ""));
  let wins = [];
  let distances = [];
  for (let i = 1; i < time; i++) {
    distances.push(i * (time - i));
  }
  wins.push(distances.filter((n) => n > record).length);
  console.log(wins.reduce((p, f) => p * f));
}

part2();
