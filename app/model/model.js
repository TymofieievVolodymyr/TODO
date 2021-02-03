class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
    console.log(this.todos);
    mediator.pub('listChanges', this.todos);
  }

  attach(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
    mediator.pub('listChanges', todos )
  }

  addTodoItem(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
    }

    this.todos.push(todo);

    this.attach(this.todos);
  }
}
