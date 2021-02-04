class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
    mediator.pub('fullList', this.todos);
  }

  _commit(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))

  }


  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
    }

    this.todos.push(todo);
    mediator.pub('listChanges', todo)
    this._commit(this.todos);
  }
}
