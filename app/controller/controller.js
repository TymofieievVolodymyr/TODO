class Controller  {
  constructor(model, view) {

    this.model = model;
    this.view = view;

    mediator.sub('listChanges', this.view.displayTodos.bind(this.view));

    mediator.sub('addInput', this.model.addTodoItem.bind(this.model));
    this.onTodoListChanged(this.model.todos);
  }

  onTodoListChanged = (todos) => {
    this.view.displayTodos(todos)
  }

}


