import fs from "fs";

function part1() {
  const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");
  let ids = new Set();
  const limits = {
    red: 12,
    blue: 14,
    green: 13,
  };

  lines.forEach((line) => {
    const games = line.split(": ");
    const id = games[0].replaceAll(/\D/g, "");
    const turns = games[1].split(";");
    let abort = false;
    for (let i in turns) {
      let colors = turns[i].trim().split(", ");
      for (let i in colors) {
        let balls = colors[i].split(" ");
        if (balls[0] > limits[balls[1]]) {
          abort = true;
        }
      }
    }
    if (!abort) {
      ids.add(Number(id));
    }
  });
  console.log([...ids].reduce((s, v) => s + v));
}
//part1();

function part2() {
  const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");
  let result = [];
  lines.forEach((line) => {
    const games = line.split(": ");
    const id = games[0].replaceAll(/\D/g, "");
    let minValues = {
      red: 0,
      blue: 0,
      green: 0,
    };
    const turns = games[1].split(";");
    for (let i in turns) {
      let colors = turns[i].trim().split(", ");
      for (let i in colors) {
        let balls = colors[i].split(" ");
        if (Number(balls[0]) > minValues[balls[1]]) {
          minValues[balls[1]] = Number(balls[0]);
        }
      }
    }
    let powers = Object.values(minValues);
    result.push(powers.reduce((p, v) => p * v));
  });
  console.log(result.reduce((s, v) => s + v));
}

part2();
