import {mediator, storage} from "../root";
import DOM from "../utilities/DOM";
import formatDate from "../utilities/formatDate";
import {nextDayDate} from "../utilities/formatDate";
import {compose} from "../utilities/compose";

const thisDay = compose(formatDate);
const tomorrow = compose(formatDate, nextDayDate);

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
      creationDate: thisDay(new Date()),
      expirationDate: tomorrow(new Date()),
      done: false,
    }
    this.todos.push(todo);
    mediator.publish('listChanges', todo);
    this.attach(this.todos);
  }

  editTodoItem(toDoItem) {
    this.todos = this.todos.map((todo) => {
      return todo.id === toDoItem.id ? toDoItem : todo
    });
    mediator.publish('fullList', this, DOM.getElement(document, '.wrapper'));
    this.attach(this.todos);
  }

  toggleDone(toDoItem) {
    this.todos = this.todos.map((todo) => {
      return todo.id === toDoItem.id ? {...toDoItem, done: !toDoItem.done} : todo
    });
    mediator.publish('fullList', this, DOM.getElement(document, '.wrapper'));
    this.attach(this.todos);
  }

  deleteItem(toDoItem) {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== toDoItem.id;
    });
    mediator.publish('fullList', this, DOM.getElement(document, '.wrapper'));
    this.attach(this.todos);
  }
}
