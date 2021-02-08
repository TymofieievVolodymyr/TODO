import ListItemView from "./listItemView";
import {formTpl} from "../Templates/formTpl";
import {mediator} from "../root";
import DOM from '../utilities/DOM'


export default class View {
  constructor() {
    this.app = DOM.getElement(document, '#root');
    this.template = DOM.createElement('div', 'wrapper');
  }

  renderListTodo(model, template, root) {

    if (root) {
      DOM.addContentStart(template, formTpl);
      DOM.append(root, template);
    }
    this.todoList = DOM.getElement(template, '.todo-list');

    while (this.todoList.firstChild) {
      DOM.removeNode(this.todoList.firstChild);
    }

    model.todos.forEach(todo => {
      const liItem = ListItemView.render(todo, template);
      DOM.append(this.todoList, liItem.liElement);
    });

    this.input = DOM.getElement(template, 'input');
    this.plusButton = DOM.getElement(template,'.add__item');

    this.plusButton.addEventListener('click', event => {
      event.preventDefault();
      if (this.input.value !== '') {
        //mediator.publish('showEmptyModal');
        mediator.publish('addInput', this.input.value);
        this.input.value = '';
      }
    });
  }

  renderItemTodo(todo) {
    this.todoList = DOM.getElement(this.template, '.todo-list');
    const liItem = ListItemView.render(todo, this.template);
    DOM.append(this.todoList, liItem.liElement);
  }

}
