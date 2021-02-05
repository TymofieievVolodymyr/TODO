class DOM {
  static document = document;

  static createElement(tag, className) {
    this.element = this.document.createElement(tag);
    if (className) {
      this.element.classList.add(className);
      return this.element
    }
    return this.element;
  }

  static getElement(selector) {
    return this.document.querySelector(selector);
  }

  static append(element) {
    return this.document.body.append(element);
  }

  static addContent(targetElement, containerEl) {
    return targetElement.insertAdjacentHTML('afterbegin', containerEl);
  }

}
