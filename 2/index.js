import fs from "fs";

const lines = fs.readFileSync("./example.txt", "utf-8").trim().split("\n");
var ids = [];

let obj = {
  red: 0,
  blue: 0,
  green: 0,
};
const games = lines[0].split(": ");
const id = games[0].replaceAll(/\D/g, "");
let turns = games[1].split(";");
turns.forEach((turn) => {
  let colors = turn.trim().split(", ");
  colors.forEach((color) => {
    let balls = color.split(" ");
    obj[balls[1]] += Number(balls[0]);
  });
});
console.log(obj);
