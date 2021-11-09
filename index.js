const Deck = require('./Deck');
const Card = require('./Card');
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
game.addPlayer({ name: 'Vadik', id: 3 });
game.start();
console.log('Trump: ', game.deck.trump);
const me = game.getPlayerById(1);
const polina = game.getPlayerById(2);
const vadik = game.getPlayerById(3);

for (let i = 0; i < 50; i++) {
  const activePlayer = game.players.activePlayer;
  const defencePlayer = game.players.defencePlayer;
  const afterDefencePlayer = game.players.getNext(game.players.defencePlayer);
  activePlayer.throwCardOnField(activePlayer.cards[0]);
  const ok1 = defencePlayer.beatCard(game.gameField.gameStacks[0], defencePlayer.cards[0]);
  if (ok1) {
    activePlayer.finishMove();
    afterDefencePlayer.finishMove();
  } else {
    console.log('Can not beat');
    afterDefencePlayer.throwCardOnField(afterDefencePlayer.cards[0]);
    defencePlayer.unableToBeatCards();
    activePlayer.finishMove();
    afterDefencePlayer.finishMove();
  }
}
// БАЗОВА ЛОГІКА ГОТОВА, треба логіку обробки того, що у юзера закінчились карти(тобто, що він виграв)
console.log();