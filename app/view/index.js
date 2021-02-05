import ListItemView from "./listItemView";
import {formTpl} from "./formTpl";
import {mediator} from "../root";

export default class View {
  constructor() {
    this.app = this.getElement('#root')
    this.template = this.createElement('div', 'wrapper');
  }

  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)

    return element
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element
  }


  renderListTodo(model, template, root) {
    template.innerHTML = formTpl
    this.todoList = template.querySelector('.todo-list');
    this.input = template.querySelector('input');

    model.todos.forEach(todo => {
      const listItemInstance = new ListItemView();
      const liItem = listItemInstance.render(todo);
      //const liItem = new ListItemView(todo);
      this.todoList.append(liItem.liElement);
    });

    root.append(template);

    template.addEventListener('submit', event => {
      event.preventDefault();
      if (this.input.value !== '') {
        mediator.publish('addInput', this.input.value);
        this.input.value = ''
      }
    })
  }

  renderItemTodo(todo) {
    this.todoList = this.template.querySelector('.todo-list');
    const listItemInstance = new ListItemView();
    const liItem = listItemInstance.render(todo);

    //const liItem = new ListItemView(todo);
    this.todoList.append(liItem.liElement);
  }

}
