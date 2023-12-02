import fs from "fs";

const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");
var ids = [];

lines.forEach((line) => {
  let obj = {
    red: 0,
    blue: 0,
    green: 0,
    redLimit: 12,
    greenLimit: 13,
    blueLimit: 14,
  };
  const games = line.split(": ");
  const id = games[0].replaceAll(/\D/g, "");
  let turns = games[1].split(";");
  turns.forEach((turn) => {
    let colors = turn.trim().split(", ");
    colors.forEach((color) => {
      let balls = color.split(" ");
      obj[balls[1]] += Number(balls[0]);
    });
  });
  if (
    obj.red <= obj.redLimit &&
    obj.green <= obj.greenLimit &&
    obj.blue <= obj.blueLimit
  ) {
    console.log(id);
    ids.push(Number(id));
  }
});

console.log(ids.reduce((s, v) => s + v));
