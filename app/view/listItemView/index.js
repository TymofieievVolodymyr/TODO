import DOM from "../../utilities/DOM";
import {mediator} from "../../root";
import {itemTpl} from "../itemTpl"

export default class ListItemView {
   render(toDoItem, template) {
    this.ulElement = DOM.getElement(template, '.todo-list');
    DOM.addContentEnd(this.ulElement, itemTpl);

    this.liElement = DOM.lastChild(this.ulElement);
    this.liElement.id = toDoItem.id;

    this.spanItemContent = DOM.getElement(this.liElement, '.text');
    this.spanItemContent.textContent = toDoItem.text;

    this.spanItemCurrentDay = DOM.getElement(this.liElement, '.currentDay');
    this.spanItemCurrentDay.textContent = toDoItem.creationDate;

    this.spanItemNextDay = DOM.getElement(this.liElement, '.tomorrow');
    this.spanItemNextDay.textContent = toDoItem.expirationDate;

    this.button = DOM.getElement(this.liElement, '.plus');
    this.button.addEventListener('click', () => {
      mediator.publish('showModal', toDoItem);
    })

    this.checkbox = DOM.getElement(this.liElement, '.input__checkbox');
    this.checkbox.addEventListener('click', () => {
      console.log(this.liElement.id);
      DOM.addClassToNode(this.liElement, 'done');
    }, false);

    return this;
  }
}
