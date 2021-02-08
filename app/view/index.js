import ListItemView from "./listItemView";
import {formTpl} from "../templates/formTpl";
import {mediator} from "../root";
import DOM from '../utilities/DOM'

export default class View {
  constructor() {
    this.app = DOM.getElement(document, '#root');
    this.template = DOM.createElement('div', 'wrapper');
  }

  renderListTodo(model, template, view) {
    if (view?.app) {
      DOM.addContentStart(template, formTpl);
      DOM.append(view.app, template);
    }
    this.todoList = DOM.getElement(template, '.todo-list');

    while (this.todoList.firstChild) {
      DOM.removeNode(this.todoList.firstChild);
    }

    model.todos.forEach(todo => {
      const liItemInstance = new ListItemView();
      const liItem = liItemInstance.render(todo, template);
      DOM.append(this.todoList, liItem.liElement);

    });

    this.plusButton = DOM.getElement(template, '.add__item');
    this.input = DOM.getElement(template, 'input');

    if (view?.app) {
      view.attachListener(this.plusButton, this.input);
    }

  }

  attachListener(button, input) {
    button.addEventListener('click', event => {
      event.preventDefault();
      if (input.value !== '') {
        mediator.publish('addInput', input.value);
        input.value = '';
      }
    });
  }

  renderItemTodo(todo) {
    this.todoList = DOM.getElement(this.template, '.todo-list');
    const liItemInstance = new ListItemView();
    const liItem = liItemInstance.render(todo, this.template);
    DOM.append(this.todoList, liItem.liElement);
  }

}
