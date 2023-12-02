import fs from "fs";

const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");
let sum = 0;

function part1() {
  lines.forEach((line) => {
    line = line.replace(/\D/g, "");
    const digit = Number(line[0] + line[line.length - 1]);
    sum += digit;
  });
  console.log(sum);
}

function part2() {
  lines.forEach((line) => {
    const result = match(line);
    const digit = Number(result[0] + result[result.length - 1]);
    sum += digit;
  });
  console.log(sum);
}

function convert(string) {
  string = string.replaceAll("one", "1");
  string = string.replaceAll("two", "2");
  string = string.replaceAll("three", "3");
  string = string.replaceAll("four", "4");
  string = string.replaceAll("five", "5");
  string = string.replaceAll("six", "6");
  string = string.replaceAll("seven", "7");
  string = string.replaceAll("eight", "8");
  string = string.replaceAll("nine", "9");
  return string;
}

function match(string) {
  const regexp = /one|two|three|four|five|six|seven|eight|nine|\d/g;
  let matches = [];
  let found;
  let previousIndex = 0;
  while ((found = regexp.exec(string))) {
    if (found[0]) {
      matches.push(convert(found[0]));
    }
    if (found[0].length > 1) {
      regexp.lastIndex -= 1;
    }
    previousIndex = regexp.lastIndex;
  }
  return matches;
}
part2();
