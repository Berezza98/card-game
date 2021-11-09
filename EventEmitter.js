class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, handler) {
    this.events[eventName] = this.events[eventName] ? [...this.events[eventName], handler] : [handler];
  }

  off(eventName, handler) {
    const events = this.events[eventName];
    if (events && events.indexOf(handler) >= 0) {
      this.events[eventName].splice(events.indexOf(handler), 1);
    }
  }

  emit(eventName, data) {
    const events = this.events[eventName];
    if (events && events.length > 0) {
      events.forEach(event => event(data));
    }
  }
}

module.exports = EventEmitter;