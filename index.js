const Deck = require('./Deck');
const Card = require('./Card');
const CircularList = require('./CircularList');
const Game = require('./Game');
const { cardSuits, cardValues } = require('./consts');

// const trump = cardSuits[0];

// const deck = new Deck();
// deck.generate();
// console.log(deck.cards);
// ------------------------------------
// const cardOne = new Card(cardSuits[1], cardValues[8], trump);
// const cardTwo = new Card(cardSuits[0], cardValues[2], trump);
// console.log(cardOne);
// console.log(cardTwo);
// console.log(cardOne.canBeat(cardTwo));
// ------------------------------------
// const list = new CircularList([1,2,3,4,5]);

// for (let i = 0; i < 33; i++) {
//   const el = list.prev();
//   console.log(el);
// }

// for (let i = 0; i < 34; i++) {
//   const el = list.next();
//   console.log(el);
// }
// ------------------------------------
const game = new Game();
game.addPlayer({ name: 'Roman', id: 1 });
game.addPlayer({ name: 'Polina', id: 2 });
game.start();
console.log(game);