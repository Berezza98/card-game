const Player = require('./Player');

class CircularList {
  constructor(arr = []) {
    this.arr = arr;
    this._current = -1;
  }

  set current(value) {
    if (typeof value !== 'number') {
      return;
    }

    this.arr.forEach((el, index) => {
      if (el instanceof Player) {
        el.active = index === value;
      }
    });

    this._current = value;
  }

  get current() {
    return this._current;
  }

  get length() {
    return this.arr.length;
  }

  forEach(cb) {
    this.arr.forEach(cb);
  }

  find(cb) {
    return this.arr.find(cb);
  }

  getByIndex(index) {
    return this.arr[index];
  }

  push(el) {
    this.arr.push(el);
  }

  remove(indexCondition) {
    const index = this.arr.findIndex(indexCondition);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  next(cb) {
    if (this.current >= this.arr.length - 1 || this.current < 0) {
      this.current = -1;
    }

    const next = this.arr[++this.current];
    if (typeof cb === 'function') {
      cb(next, this.current);
    }

    return next;
  }

  prev(cb) {
    if (this.current <= 0 || this.current > this.arr.length - 1) {
      this.current = this.arr.length;
    }

    const prev = this.arr[--this.current];
    if (typeof cb === 'function') {
      cb(prev, this.current);
    }

    return prev;
  }
}

module.exports = CircularList;