class PubSub {

  constructor() {
    this._events = {};
  }

  sub(eventName, callback) {
    if (!this._events.hasOwnProperty(eventName)) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(callback);
  };

  pub(eventName, ...args) {
    if (this._events.hasOwnProperty(eventName)) {
      this._events[eventName].forEach(function (callback) {
        callback(...args);
      });
    }
  };


}
