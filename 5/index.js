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
seedsToSoil = seedsToSoil.split("\n");
seedsToSoil.shift();
soilToFertilizer = soilToFertilizer.split("\n");
soilToFertilizer.shift();
fertilizerToWater = fertilizerToWater.split("\n");
fertilizerToWater.shift();
waterToLight = waterToLight.split("\n");
waterToLight.shift();
lightToTemperature = lightToTemperature.split("\n");
lightToTemperature.shift();
temperatureToHumidity = temperatureToHumidity.split("\n");
temperatureToHumidity.shift();
humidityToLocation = humidityToLocation.split("\n");
humidityToLocation.shift();

function part1() {
  const locations = [];
  seeds.forEach((seed) => {
    const soil = travel(seedsToSoil, seed);
    const fertilizer = travel(soilToFertilizer, soil);
    const water = travel(fertilizerToWater, fertilizer);
    const light = travel(waterToLight, water);
    const temperature = travel(lightToTemperature, light);
    const humidity = travel(temperatureToHumidity, temperature);
    const location = travel(humidityToLocation, humidity);
    locations.push(location);
  });
  console.log(Math.min(...locations));
}

part1();

function travel(arr, source) {
  let destination;
  arr.forEach((line) => {
    const [destRange, startRange, length] = line.split(" ").map(Number);
    if (source >= startRange && source <= startRange + length) {
      let i = source - startRange;
      destination = destRange + i;
    }
  });
  return destination ? destination : source;
}
