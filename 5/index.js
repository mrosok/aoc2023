import fs from "fs";
let [
  seeds,
  seedsToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
] = fs.readFileSync("./input.txt", "utf-8").trim().split("\n\n");

//must be a way to do this cleaner
seeds = seeds
  .split(" ")
  .map(Number)
  .filter((n) => n);
seedsToSoil = seedsToSoil.split("\n").slice(1);
soilToFertilizer = soilToFertilizer.split("\n").slice(1);
fertilizerToWater = fertilizerToWater.split("\n").slice(1);
waterToLight = waterToLight.split("\n").slice(1);
lightToTemperature = lightToTemperature.split("\n");
lightToTemperature.shift();
temperatureToHumidity = temperatureToHumidity.split("\n");
temperatureToHumidity.shift();
humidityToLocation = humidityToLocation.split("\n");
humidityToLocation.shift();

function part1() {
  const locations = [];
  seeds.forEach((seed) => {
    const location = traverseMaps(seed);
    locations.push(location);
  });
  console.log(Math.min(...locations));
}

part1();

function part2() {
  //not working!
  const start = seeds.filter((el, i) => i % 2 == 0);
  const range = seeds.filter((el, i) => i % 2 != 0);
  let min;
  start.forEach((seed, index) => {
    //newSeedArray = arrayRange(seed, range[index] + seed - 1, 1);

    for (let i = seed; i < seed + range[index]; i++) {
      let location = traverseMaps(i);
      if (!min) min = location;
      if (location < min) min = location;
    }
  });
  console.log(min);
}

//part2();

function traverseMaps(seed) {
  const soil = travel(seedsToSoil, seed);
  const fertilizer = travel(soilToFertilizer, soil);
  const water = travel(fertilizerToWater, fertilizer);
  const light = travel(waterToLight, water);
  const temperature = travel(lightToTemperature, light);
  const humidity = travel(temperatureToHumidity, temperature);
  const location = travel(humidityToLocation, humidity);
  return location;
}

function travel(arr, source) {
  let destination;
  arr.forEach((line) => {
    const [destRange, startRange, length] = line.split(" ").map(Number);
    if (source >= startRange && source < startRange + length) {
      let i = source - startRange;
      destination = destRange + i;
    }
  });
  return destination ? destination : source;
}
