import fs from "fs";
const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let hands = [];
const values = {
  J: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  Q: 12,
  K: 13,
  A: 14,
};

function sortHands(a, b) {
  if (a.score < b.score) {
    return -1;
  }
  if (a.score > b.score) return 1;

  if (a.score == b.score) {
    let aCards = a.cards.split("");
    let bCards = b.cards.split("");
    for (let i in aCards) {
      const aValue = values[aCards[i]];
      const bValue = values[bCards[i]];
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      continue;
    }
    return 0;
  }
}

function giveScore(hand) {
  let groups = [];
  let jokers = 0;
  let found;

  for (let i in hand) {
    if (hand[i] == "J") {
      jokers++;
    }
  }
  hand = hand.replaceAll("J", "");
  if (!hand) {
    return 7;
  }

  let re = /(.)\1*/g;

  while ((found = re.exec(hand))) {
    groups.push(found[0]);
  }

  groups.sort((a, b) => b.length - a.length);

  for (let i = 0; i < jokers; i++) {
    groups[0] = groups[0] + groups[0][0];
  }

  switch (groups.length) {
    case 1:
      return 7;
      break;
    case 2:
      if (groups[0].length == 4 || groups[1].length == 4) {
        return 6;
      } else {
        return 5;
      }
      break;
    case 3:
      if (
        groups[0].length == 3 ||
        groups[1].length == 3 ||
        groups[2].length == 3
      ) {
        return 4;
      } else {
        return 3;
      }
      break;
    case 4:
      return 2;
      break;
    case 5:
      return 1;
      break;
    default:
      return -1;
  }
}

lines.forEach((line) => {
  let sortString = (str) => {
    return [...str].sort((a, b) => a.localeCompare(b)).join("");
  };
  let hand = {};
  const [cards, bid] = line.split(" ");
  hand.cards = cards;
  hand.sorted = sortString(cards);
  hand.score = giveScore(hand.sorted);
  hand.bid = Number(bid);
  hands.push(hand);
});

let sum = 0;
hands.sort(sortHands);
hands.forEach((hand, index) => {
  sum += hand.bid * (index + 1);
});
console.log(sum);
