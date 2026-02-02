// eslint-disable-next-line no-unused-vars
type Listener = (...args: unknown[]) => void;

type Event = string;

type Listeners = {
  [event: string]: Listener[];
};

export class EventBus {
  listeners: Listeners;
  constructor() {
    this.listeners = {};
  }

  on(event: Event, callback: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: Event, callback: Listener) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: Event, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}
