import {mediator} from "../root";

export default class Controller {
  constructor(model, view) {

    this.model = model;
    this.view = view;

    mediator.subscribe('fullList', this.view.renderListTodo.bind(this.model));
    mediator.publish('fullList', this.view);
    mediator.subscribe('reRenderFullList', this.view.reRenderTodo.bind(this.model));
    mediator.subscribe('addInput', this.model.addTodoItem.bind(this.model));
    mediator.subscribe('editInput', this.model.editTodoItem.bind(this.model));
    mediator.subscribe('showModal', view.modalView.renderPopUp.bind(view.modalView));
    mediator.subscribe('toggleComplete', this.model.toggleDone.bind(this.model));
    mediator.subscribe('delete', this.model.deleteItem.bind(this.model));
    mediator.subscribe('saveLeftItems', this.model.saveLeftItems.bind(this.model));
    mediator.subscribe('noItems', this.view.renderNoItems.bind(this.model));
    mediator.subscribe('filterActiveItems', this.model.filterActiveItems.bind(this.model));
  }
}


