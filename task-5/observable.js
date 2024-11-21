class Observable {
  constructor(initialValue = null) {
    this._value = initialValue;
    this.subscribersQueue = {};
  }

  subscribe(listener) {
    const listenerId = Math.floor(Math.random() * 9999999);
    this.subscribersQueue[listenerId] = listener;
    return () => delete this.subscribersQueue[listenerId];
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
    this.notifySubscribers();
  }

  notifySubscribers() {
    for (const listenerId in this.subscribersQueue) {
      const listener = this.subscribersQueue[listenerId];
      listener(this._value);
    }
  }
}
