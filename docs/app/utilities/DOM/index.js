export default class DOM {
  static document = document;

  static createElement(tag, className) {
    this.element = this.document.createElement(tag);
    if (className) {
      this.element.classList.add(className);
      return this.element;
    }
    return this.element;
  }

  static getElement(node, selector) {
    return node.querySelector(selector);
  }

  static append(node, element) {
    return node.append(element);
  }

  static addClassToNode(node, className) {
    node.classList.add(className);
  }

  static removeClassFromNode(node, className) {
    node.classList.remove(className);
  }

  static lastChild(node) {
    return node.lastElementChild
  }

  static addContentStart(targetElement, containerEl) {
    return targetElement.insertAdjacentHTML('afterbegin', containerEl);
  }

  static addContentEnd(targetElement, containerEl) {
    return targetElement.insertAdjacentHTML('beforeend', containerEl);
  }

  static removeNode(node) {
    node.remove();
  }

}
