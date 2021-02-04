class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) ?? [];
    mediator.publish('fullList', this.todos);
  }

  attach(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))

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
}
