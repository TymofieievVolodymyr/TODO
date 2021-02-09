import DOM from "../../utilities/DOM";
import {mediator} from "../../root";
import {itemTpl} from "../../templates/itemTpl"

export default class ListItemView {
  render(toDoItem, view) {
    this.queryElementAndAssignData(toDoItem, view.template);
    this.attachListenersAndCheckDone(toDoItem, view);

    return this;
  }

  queryElementAndAssignData(toDoItem, template) {
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

    this.deleteButton = DOM.getElement(this.liElement, '.delete');
  }

  attachListenersAndCheckDone(toDoItem, view) {
    console.log(view);

    this.deleteButton.addEventListener('click', () => {
      mediator.publish('delete', toDoItem, view)
    }, false);

    this.button = DOM.getElement(this.liElement, '.pencil');

    this.button.addEventListener('click', () => {
      mediator.publish('showModal', toDoItem, view);
    });

    this.checkbox = DOM.getElement(this.liElement, '.input__checkbox');

    if (toDoItem.done === true) {
      DOM.addClassToNode(this.liElement, 'done');
      this.checkbox.checked = true;
    }

    if (toDoItem.done === false) {
      DOM.removeClassFromNode(this.liElement, 'done');
      this.checkbox.checked = false;
    }

    this.checkbox.addEventListener('click', () => {
      mediator.publish('toggleComplete', toDoItem, view);
      DOM.addClassToNode(this.liElement, 'done');
    }, false);
  }
}
