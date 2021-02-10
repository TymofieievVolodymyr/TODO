import {mediator, storage} from "../root";
import formatDate from "../utilities/formatDate";
import {nextDayDate} from "../utilities/formatDate";
import {compose} from "../utilities/compose";
import {pareString} from "../utilities/parseString";

const getTodayString = compose(formatDate);
const getTomorrowString = compose(formatDate, nextDayDate);
const getTodayParsedString = compose(pareString, getTodayString);
const getTomorrowParsedString = compose(pareString, getTomorrowString);


export default class Model {
  constructor() {
    this.todos = JSON.parse(storage.getItem('todos')) ?? [];
    this.todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: null,
      creationDate: getTodayString(),
      expirationDate: getTomorrowString(),
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
    // const todo = {
    //   id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
    //   text: todoText,
    //   creationDate: getTodayString(),
    //   expirationDate: getTomorrowString(),
    //   startDate: new Date(getTodayParsedString()),
    //   endDate: new Date(getTomorrowParsedString()),
    //   done: false,
    //   leftItems: null,
    // }

    // this.todos = this.todos.map((todo) => {
    //   return todo.id === toDoItem.id ? toDoItem : todo
    // });

    this.todos.push(toDoItem);
    mediator.publish('showModal', toDoItem);
    //this.attach(this.todos);
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
    this.todos = this.todos.filter((todo) => {
      return !todo.done;
    });
    mediator.publish('reRenderFullList', view);
    this.attach(this.todos);
  }

  sortAscending(todosCollection, view) {
    const sortAscending = todosCollection.sort((firstTodoItem, secondTodoItem) => {
      if (firstTodoItem.text < secondTodoItem.text) {
        return -1;
      }
      if (firstTodoItem.text > secondTodoItem.text) {
        return 1;
      }
      return 0;
    });
    mediator.publish('reRenderFullList', view, sortAscending);
  }

  sortDescending(todosCollection, view) {
    const descending = todosCollection.sort((firstTodoItem, secondTodoItem) => {
      if (firstTodoItem.text > secondTodoItem.text) {
        return -1;
      }
      if (firstTodoItem.text < secondTodoItem.text) {
        return 1;
      }
      return 0;
    });
    mediator.publish('reRenderFullList', view, descending);
  }

  sortAscendingDate(todosCollection, view) {
    console.log(todosCollection);
    // const sortAscending = todosCollection.sort((firstTodoItem, secondTodoItem) => {
    //   if (firstTodoItem.startDate < secondTodoItem.text) {
    //     return -1;
    //   }
    //   if (firstTodoItem.text > secondTodoItem.text) {
    //     return 1;
    //   }
    //   return 0;
    // });


    const sortAscendingDate = todosCollection.sort((firstTodoItem, secondTodoItem) => {
      return firstTodoItem.startDate - secondTodoItem.startDate;
    });
    console.log(sortAscendingDate);
    //mediator.publish('reRenderFullList', view, sortAscendingDate);
  }

  sortDescendingDate(todosCollection, view) {
    console.log('sortDescendingDate');
    // const sortAscending = todosCollection.sort((firstTodoItem, secondTodoItem) => {
    //   if (firstTodoItem.text < secondTodoItem.text) {
    //     return -1;
    //   }
    //   if (firstTodoItem.text > secondTodoItem.text) {
    //     return 1;
    //   }
    //   return 0;
    // });

    const sortDescendingDate = todosCollection.sort((firstTodoItem, secondTodoItem) => {
      return firstTodoItem.endDate - secondTodoItem.endDate;
    });
    mediator.publish('reRenderFullList', view, sortDescendingDate);
  }
}
