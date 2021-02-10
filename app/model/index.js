import {mediator, storage} from "../root";
import formatDate from "../utilities/formatDate";
import {nextDayDate} from "../utilities/formatDate";
import {compose} from "../utilities/compose";

const getToday = compose(formatDate);
const getTomorrow = compose(formatDate, nextDayDate);

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
      creationDate: getToday(),
      expirationDate: getTomorrow(),
      done: false,
      leftItems: null,
    }

    this.todos.push(todo);
    mediator.publish('showModal', todo);
    this.attach(this.todos);
  }

  editTodoItem(toDoItem, view) {
    this.todos = this.todos.map((todo) => {
      return todo.id === toDoItem.id ? toDoItem : todo
    });

    mediator.publish('reRenderFullList', view);
    this.attach(this.todos);
  }

  toggleDone(toDoItem, view) {
    this.todos = this.todos.map((todo) => {
      return todo.id === toDoItem.id ? {...toDoItem, done: !toDoItem.done} : todo
    });

    mediator.publish('reRenderFullList', view);
    this.attach(this.todos);
  }

  deleteItem(toDoItem, view) {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== toDoItem.id;
    });

    mediator.publish('reRenderFullList', view);
    this.attach(this.todos);
    if (this.todos.length === 0) {
      mediator.publish('noItems', 'No items', view);
    }
  }

  saveLeftItems(itemsLeft, toDoItem) {
    this.todos = this.todos.map((todo) => {
      return todo.id === toDoItem.id ? {...toDoItem, leftItems: itemsLeft} : todo
    });
  }

  filterActiveItems(todosCollection, view) {
    const activeItemsCollection = todosCollection.filter((todo) => {
      return todo.done === false;
    });
    mediator.publish('reRenderFullList', view, activeItemsCollection);
  }
}
