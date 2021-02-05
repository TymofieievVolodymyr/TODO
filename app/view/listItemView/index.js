import DOM from "../../utilities/DOM";
import {mediator} from "../../root";

export default class ListItemView {
  static render(toDoItem) {
    this.liElement = DOM.createElement('li');
    this.span = DOM.createElement('span');
    DOM.append(this.liElement, this.span);
    this.button = DOM.createElement('button');
    this.button.textContent = '+'
    DOM.addClassToNode(this.button, 'plus');
    DOM.append(this.liElement, this.button);
    this.spanItemContent = DOM.getElement(this.liElement, 'span');
    this.liElement.id = toDoItem.id;
    this.spanItemContent.textContent = toDoItem.text;

    this.button.addEventListener('click', () => {
      mediator.publish('showModal');
    })

    return this;
  }
}
