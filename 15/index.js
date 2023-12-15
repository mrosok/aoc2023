import fs from "fs";
const steps = fs.readFileSync("./input.txt", "utf-8").trim().split(",");
let sum = [];
steps.forEach((step) => {
    let value = 0;
    for (let i in step) {
        value += step.charCodeAt(i);
        value *= 17;
        value =  value % 256;
    }
    sum.push(value);
});
console.log(sum.reduce((s,v) => s+v ));
