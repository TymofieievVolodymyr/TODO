import {mediator, storage} from "../root";
import DOM from "../utilities/DOM";

export default class Model {
  constructor() {
    this.todos = JSON.parse(storage.getItem('todos')) ?? [];
    mediator.publish('fullList', this.todos);
  }

  attach(todos) {
    storage.setItem(JSON.stringify(todos));
  }

  addTodoItem(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
    }

    this.todos.push(todo);
    mediator.publish('listChanges', todo)
    this.attach(this.todos);
  }


  editTodoItem(toDoItem) {
    this.todos = this.todos.map((todo) => {
      return todo.id === toDoItem.id ? toDoItem : todo
    })

    mediator.publish('fullList', this, DOM.getElement(document, '.wrapper'), DOM.getElement(document, '#root'));
    this.attach(this.todos);
  }
}
