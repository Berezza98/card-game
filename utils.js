function getRandomFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
};

module.exports = {
  getRandomFromArray,
  shuffle,
};