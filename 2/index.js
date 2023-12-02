import fs from "fs";

const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");
var ids = new Set();
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
