import fs from "fs";
const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");
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

let hands = [];
lines.forEach((line) => {
  const [cards, bid] = line.split(" ");
  let hand = {};
  hand.cards = cards;
  hand.sorted = [...cards].sort((a, b) => a.localeCompare(b)).join("");
  hand.score = giveScore(hand.sorted);
  hand.bid = Number(bid);
  hands.push(hand);
});

let sum = 0;
hands.sort(sortHands);
console.log(hands.reduce((acc, cur, i) => acc + cur.bid * (i + 1), sum));

function sortHands(a, b) {
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  if (a.score == b.score) {
    for (let i in a.cards) {
      if (values[a.cards[i]] < values[b.cards[i]]) return -1;
      if (values[a.cards[i]] > values[b.cards[i]]) return 1;
      continue;
    }
    return 0;
  }
}
function groupCards(hand) {
  const jokers = (hand.match(/J/g) || []).length;
  hand = hand.replaceAll("J", "");
  if (!hand) return 7; //all jokers

  let groups = [];
  let found;
  let re = /(.)\1*/g;

  while ((found = re.exec(hand))) {
    groups.push(found[0]);
  }
  //add jokers to largest group
  groups.sort((a, b) => b.length - a.length);
  for (let i = 0; i < jokers; i++) {
    groups[0] += groups[0][0];
  }
  return groups;
}

function giveScore(hand) {
  const groups = groupCards(hand);

  switch (groups.length) {
    case 1:
      return 7; //five of a kind
    case 2:
      if (groups[0].length == 4) {
        return 6; //four of a kind
      } else {
        return 5; //full house
      }
    case 3:
      if (groups[0].length == 3) {
        return 4; //three of a kind
      } else {
        return 3; //two pairs
      }
    case 4:
      return 2; //one pair
    case 5:
      return 1; //high card
    default:
      return -1;
  }
}
