const Game = require('./Game');
const { STARTED_STATUS, PENDING_STATUS, MAX_CARD_COUNT_IN_ONE_HANDS } = require('./consts');

let game;

test('Game exists', () => {
  game = new Game();
  expect(game).toBeTruthy();
  expect(game.status).toBe(PENDING_STATUS);
});

test('Test count of Players', () => {
  game.addPlayer({ name: 'Roman', id: 1 });
  game.addPlayer({ name: 'Polina', id: 2 });
  game.addPlayer({ name: 'Vadik', id: 3 });
  expect(game.players.length).toBe(3);
});

test('Test start game', () => {
  game.start();
  expect(game.status).toBe(STARTED_STATUS);
});

test('Count of cards in each hands', () => {
  game.players.forEach((player) => {
    expect(player.cards.length).toBe(6);
  });
});

test('Unique cards', () => {
  let cards = {};
  game.players.forEach((player) => {
    player.cards.forEach(card => {
      cards[card.suit + '_' + card.value] = true;
    });
  });

  expect(Object.keys(cards).length).toBe(MAX_CARD_COUNT_IN_ONE_HANDS * game.players.length);
});

test('Count of all cards equal 36', () => {
  let cards = {};
  game.players.forEach((player) => {
    player.cards.forEach(card => {
      cards[card.suit + '_' + card.value] = true;
    });
  });

  game.deck.cards.forEach((card) => {
    cards[card.suit + '_' + card.value] = true;
  });

  expect(Object.keys(cards).length).toBe(36);
});