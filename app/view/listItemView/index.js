import DOM from "../../utilities/DOM";
import {mediator} from "../../root";
import {itemTpl} from "../itemTpl"

export default class ListItemView {
  static render(toDoItem, template) {
    this.ulElement = DOM.getElement(template, '.todo-list');
    DOM.addContentEnd(this.ulElement, itemTpl);
    this.liElement = DOM.lastChild(this.ulElement);
    this.liElement.id = toDoItem.id;
    this.spanItemContent = DOM.getElement(this.liElement, 'span');
    this.spanItemContent.textContent = toDoItem.text;
    this.button = DOM.getElement(this.liElement, '.plus');
    this.button.addEventListener('click', () => {
      mediator.publish('showModal', toDoItem);
    })

    return this;
  }
}
