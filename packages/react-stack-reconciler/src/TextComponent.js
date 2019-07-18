export default class TextComponent {
  constructor(element) {
    this.type = Symbol.for('TextComponent');
    this.currentElement = element;
  }

  mount() {
    let node = this.currentElement;
    return node;
  }

  receive() {}

  unmount() {}
}
