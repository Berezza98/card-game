// МАСТІ КАРТ
const SPADES = 'SPADES'; // ПІКА
const HEARTS = 'HEARTS'; // ЧІРВА
const DIAMONDS = 'DIAMONDS'; // БУБНА
const CLUBS = 'CLUBS'; // ХРЕСТА

const cardSuits = [SPADES, HEARTS, DIAMONDS, CLUBS];

// ЗНАЧЕННЯ КАРТ
const SIX = '6';
const SEVEN = '7';
const EIGHT = '8';
const NINE = '9';
const TEN = '10';
const JACK = 'JACK'; // ВАЛЕТ
const QEEN = 'QEEN'; // ДАМА
const KING = 'KING'; // КОРОЛЬ
const ACE = 'ACE'; // ТУЗ

const cardValues = [SIX, SEVEN, EIGHT, NINE, TEN, JACK, QEEN, KING, ACE];

const priorities = {
  [SIX]: 6,
  [SEVEN]: 7,
  [EIGHT]: 8,
  [NINE]: 9,
  [TEN]: 10,
  [JACK]: 11,
  [QEEN]: 12,
  [KING]: 13,
  [ACE]: 14
};

const MAX_CARD_COUNT_IN_ONE_HANDS = 6;
// Статуси гри
const PENDING_STATUS = 'PENDING_STATUS';
const STARTED_STATUS = 'STARTED_STATUS';

// TRUMP - КОЗИРЬ

module.exports = {
  cardSuits,
  cardValues,
  priorities,
  MAX_CARD_COUNT_IN_ONE_HANDS,
  PENDING_STATUS,
  STARTED_STATUS,
}