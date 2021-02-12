import {mediator, storage} from "../root";
import formatDate from "../utilities/formatDate";
import {nextDayDate} from "../utilities/formatDate";
import {compose} from "../utilities/compose";
import {parseString} from "../utilities/parseString";


const getTodayString = compose(formatDate);
const getTomorrowString = compose(formatDate, nextDayDate);
const getTodayParsedString = compose(parseString, getTodayString);
const getTomorrowParsedString = compose(parseString, getTomorrowString);


export default class Model {
  constructor() {
    this.todos = JSON.parse(storage.getItem('todos')) ?? [];
    this.todo = {
      id: null,
      text: null,
      creationDate: null,
      expirationDate: null,
      startDate: new Date(getTodayParsedString()),
      endDate: new Date(getTomorrowParsedString()),
      done: false,
      leftItems: null,
    }
    mediator.publish('fullList', this.todos);
  }

  attach(todos) {
    storage.setItem(JSON.stringify(todos));
  }

  addTodoItem(toDoItem) {
    toDoItem.id = this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1;
    toDoItem.creationDate = getTodayString();
    toDoItem.expirationDate = getTomorrowString();
    this.todos.push(toDoItem);
    mediator.publish('showModal', toDoItem);
  }

  editTodoItem(toDoItem, view) {
    this.todos = this.todos.map(todo => {
      return todo.id === toDoItem.id ? toDoItem : todo
    });

    mediator.publish('reRenderFullList', view);
    this.attach(this.todos);
  }

  toggleDone(toDoItem, view) {
    this.todos = this.todos.map(todo => {
      return todo.id === toDoItem.id ? {...toDoItem, done: !toDoItem.done} : todo
    });

    mediator.publish('reRenderFullList', view);
    this.attach(this.todos);
  }

  deleteItem(toDoItem, view) {
    this.todos = this.todos.filter(todo => {
      return todo.id !== toDoItem.id;
    });

    mediator.publish('reRenderFullList', view);
    this.attach(this.todos);
    if (this.todos.length === 0) {
      mediator.publish('noItems', 'No items', view);
    }
  }

  saveLeftItems(itemsLeft, toDoItem) {
    this.todos = this.todos.map(todo => {
      return todo.id === toDoItem.id ? {...toDoItem, leftItems: itemsLeft} : todo
    });
  }

  filterActiveItems(todosCollection, view) {
    const activeItemsCollection = todosCollection.filter((todo) => {
      return !todo.done;
    });
    mediator.publish('reRenderFullList', view, activeItemsCollection);
  }

  filterCompletedItems(todosCollection, view) {
    const completedItemsCollection = todosCollection.filter((todo) => {
      return todo.done;
    });
    mediator.publish('reRenderFullList', view, completedItemsCollection);
  }

  deleteCompletedItems(view) {
    this.todos = this.todos.filter(todo => {
      return !todo.done;
    });
    mediator.publish('reRenderFullList', view);
    this.attach(this.todos);
  }

  sortAscending(todosCollection, view) {
    const sortAscending = todosCollection.sort((firstTodoItem, secondTodoItem) => {
      return firstTodoItem.text === secondTodoItem.text ? 0 : firstTodoItem.text > secondTodoItem.text ? 1 : -1;
    })
    mediator.publish('reRenderFullList', view, sortAscending);
  }

  sortDescending(todosCollection, view) {
    const descending = todosCollection.sort((firstTodoItem, secondTodoItem) => {
      return firstTodoItem.text === secondTodoItem.text ? 0 : firstTodoItem.text < secondTodoItem.text ? 1 : -1;
    })
    mediator.publish('reRenderFullList', view, descending);
  }

  sortAscendingDate(todosCollection, view) {
    const sortAscendingDate = todosCollection.sort((firstTodoItem, secondTodoItem) => {
      return firstTodoItem.text === secondTodoItem.startDate ? 0 : firstTodoItem.startDate > secondTodoItem.startDate ? 1 : -1;
    });
    mediator.publish('reRenderFullList', view, sortAscendingDate);
  }

  sortDescendingDate(todosCollection, view) {
    const sortDescendingDate = todosCollection.sort((firstTodoItem, secondTodoItem) => {
      return firstTodoItem.text === secondTodoItem.startDate ? 0 : firstTodoItem.startDate < secondTodoItem.startDate ? 1 : -1;
    });
    mediator.publish('reRenderFullList', view, sortDescendingDate);
  }

  filterText(inputData, view) {
    const filteredCollection = this.todos.filter(todo => {
      return todo.text.toLowerCase().includes(inputData.trim().toLowerCase());
    });
    mediator.publish('reRenderFullList', view, filteredCollection);
  }

  filterStartDate(inputData, view) {
    const filteredCollection = this.todos.filter(todo => {
      return todo.creationDate === inputData;
    });
    mediator.publish('reRenderFullList', view, filteredCollection);
  }

  filterExpirationDate(inputData, view) {
    const filteredCollection = this.todos.filter(todo => {
      return todo.expirationDate === inputData;
    });
    mediator.publish('reRenderFullList', view, filteredCollection);
  }
}
