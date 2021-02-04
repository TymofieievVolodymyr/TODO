class Controller {
  constructor(model, view) {

    this.model = model;
    this.view = view;

    mediator.sub('fullList', this.view.renderListTodo.bind(this.model.todos));
    mediator.pub('fullList', this.model, this.view.template, this.view.app);
    mediator.sub('addInput', this.model.addTodo.bind(this.model));
    mediator.sub('listChanges', this.view.renderItemTodo.bind(this.view));

  }

}


