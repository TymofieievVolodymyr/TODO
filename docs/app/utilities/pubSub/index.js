class  PubSub {

  constructor() {
    this._events = {};
    if (PubSub.exists) {
      return PubSub.instance
    }
    PubSub.instance = this
    PubSub.exists = true
  }

  subscribe(eventName, callback) {
    if (!this._events.hasOwnProperty(eventName)) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(callback);
  };

  publish(eventName, ...args) {
    if (this._events.hasOwnProperty(eventName)) {
      this._events[eventName].forEach(callback => callback(...args));
    }
  };
}
