class CircularList {
  constructor(arr = []) {
    this.arr = arr;
    this._current = -1;
  }

  set current(value) {
    if (typeof value !== 'number') {
      return;
    }

    this._current = value;
  }

  get current() {
    return this._current;
  }

  get length() {
    return this.arr.length;
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

  next() {
    if (this.current >= this.arr.length - 1 || this.current < 0) {
      this.current = -1;
    }

    return this.arr[++this.current];
  }

  prev() {
    if (this.current <= 0 || this.current > this.arr.length - 1) {
      this.current = this.arr.length;
    }

    return this.arr[--this.current];
  }
}

module.exports = CircularList;