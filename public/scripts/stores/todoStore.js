import EventEmitter from 'events';

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.items = [];
  }

  getAll() {
    return this.items;
  }

  addItem(text) {
    this.items.push(text);
    this.change();
  }

  change() {
    this.emit('change');
  }

  addListener(name, callback) {
    this.on(name, callback);
  }

  removeListener(name, callback) {
    this.removeListener(name, callback);
  }
}

export default new TodoStore();
