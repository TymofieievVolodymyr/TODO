import {mediator, storage} from "../root";
import DOM from "../utilities/DOM";
import formatDate from "../utilities/formatDate";
import {nextDayDate} from "../utilities/formatDate";
import {compose} from "../utilities/compose";

const getToday = compose(formatDate);
const getTomorrow = compose(formatDate, nextDayDate);

export default class Model {
  constructor(view) {
    this.view = view;
    //this.todos = JSON.parse(storage.getItem('state')) ?? [];
    this.state = JSON.parse(storage.getItem('state')) ?? [];
    console.log(this.state);
    mediator.publish('fullList', this.todos);
  }

  attach(state) {
    storage.setItem(JSON.stringify(state));
  }

  addTodoItem(todoText) {
    const state = {
      todo: {
        id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
        text: todoText,
        creationDate: getToday(),
        expirationDate: getTomorrow(),
      },
      leftItems: null,
    }

    //this.todos.push(state.todo);
    this.todos.push(state);
    mediator.publish('showModal', state.todo);
    this.attach(state);
  }

  editTodoItem(toDoItem) {
    this.todos = this.todos.map((todo) => {
      return todo.id === toDoItem.id ? toDoItem : todo
    });
    mediator.publish('reRenderFullList', this, DOM.getElement(document, '.wrapper'), this.view);
    this.attach(this.todos);
  }

  toggleDone(toDoItem) {
    this.todos = this.todos.map((todo) => {
      return todo.id === toDoItem.id ? {...toDoItem, done: !toDoItem.done} : todo
    });

    mediator.publish('reRenderFullList', this, DOM.getElement(document, '.wrapper'), this.view);
    this.attach(this.todos);
  }

  deleteItem(toDoItem) {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== toDoItem.id;
    });

    mediator.publish('reRenderFullList', this, DOM.getElement(document, '.wrapper'), this.view);
    this.attach(this.todos);
  }

  saveLeftItems(toDoItem) {
    this.todos = this.todos.map((todo) => {
      return todo.id === toDoItem.id ? {...toDoItem, done: !toDoItem.done} : todo
    });
  }
}
