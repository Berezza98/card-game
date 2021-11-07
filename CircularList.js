const Player = require('./Player');
const { ATTACK, DEFENSE } = require('./consts');

class CircularList extends Array {
  constructor(...elements) {
    super(...elements);
    this._current = -1;
  }

  // for map, filter... methods which creates new arrays
  static get [Symbol.species]() {
    return this;
  }

  set current(value) {
    if (typeof value !== 'number') {
      return;
    }

    this.forEach((el, index) => {
      if (el instanceof Player) {
        el.active = index === value;
      }
    });

    this._current = value;
  }

  get current() {
    return this._current;
  }

  remove(indexCondition) {
    const index = this.findIndex(indexCondition);
    if (index !== -1) {
      this.splice(index, 1);
    }
  }

  next(cb) {
    if (this.current >= this.length - 1 || this.current < 0) {
      this.current = -1;
    }

    const next = this[++this.current];
    if (typeof cb === 'function') {
      cb(next, this.current);
    }

    return next;
  }

  prev(cb) {
    if (this.current <= 0 || this.current > this.length - 1) {
      this.current = this.length;
    }

    const prev = this[--this.current];
    if (typeof cb === 'function') {
      cb(prev, this.current);
    }

    return prev;
  }
}

module.exports = CircularList;