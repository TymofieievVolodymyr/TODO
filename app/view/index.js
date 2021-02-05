import ListItemView from "./listItemView";
import {formTpl} from "./formTpl";
import {mediator} from "../root";
import DOM from '../utilities/DOM'


export default class View {
  constructor() {
    this.app = DOM.getElement( document, '#root');
    this.template = DOM.createElement('div', 'wrapper');
  }

  renderListTodo(model, template, root) {

    DOM.addContent(template, formTpl);

    this.todoList = DOM.getElement(template, '.todo-list');
    this.input = DOM.getElement(template, 'input');

    model.todos.forEach(todo => {
      const liItem = ListItemView.render(todo);
      DOM.append(this.todoList, liItem.liElement);
    });

    DOM.append(root, template);
    template.addEventListener('submit', event => {
      event.preventDefault();
      if (this.input.value !== '') {
        mediator.publish('addInput', this.input.value);
        this.input.value = '';
      }
    })
  }

  renderItemTodo(todo) {
    this.todoList = DOM.getElement(this.template, '.todo-list');
    const liItem = ListItemView.render(todo);
    DOM.append(this.todoList, liItem.liElement);
  }

}
