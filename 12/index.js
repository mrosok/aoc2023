// Not effective enough...............................................................

import fs from "fs";
const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");
let sums = [];
lines.forEach((line) => {
  let counter = 0;
  const [data, groups] = line.split(" ");
  const unknowns = findUnknowns(data);
  if (unknowns) {
    let perms = getPermutations(unknowns.length);
    for (let perm of perms) {
      let newLine = data.split("");
      for (let i in perm) {
        newLine[unknowns[i]] = perm[i];
      }
      newLine = newLine.join("");
      if (checkGroups(newLine) == groups) {
        counter++;
      }
    }
    sums.push(counter);
  }
});

console.log(sums.reduce((s, v) => s + v));

function findUnknowns(line) {
  let indexes = [];
  for (let i in line) {
    if (line[i] == "?") {
      indexes.push(i);
    }
  }
  return indexes;
}

function getPermutations(maxLen) {
  const list = ["#", "."];
  var perm = list.map(function (val) {
    return [val];
  });
  var generate = function (perm, maxLen, currLen) {
    if (currLen === maxLen) {
      return perm;
    }
    for (var i = 0, len = perm.length; i < len; i++) {
      var currPerm = perm.shift();
      for (var k = 0; k < list.length; k++) {
        perm.push(currPerm.concat(list[k]));
      }
    }
    return generate(perm, maxLen, currLen + 1);
  };
  return generate(perm, maxLen, 1);
}

function checkGroups(line) {
  let groups = [];
  let current = 1;
  for (let i = 0; i < line.length - 1; i++) {
    if (line[i] == "#") {
      if (line[i] == line[i + 1]) {
        current++;
      } else {
        groups.push(current);
        current = 1;
      }
    }
    if (i == line.length - 2 && line[i + 1] == "#") {
      groups.push(current);
    }
  }
  return groups.join(",");
}
