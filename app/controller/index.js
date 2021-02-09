import {mediator} from "../root";

export default class Controller {
  constructor(model, view, modalWindow) {

    this.model = model;
    this.view = view;
    this.modalWindow = modalWindow;

    //mediator.subscribe('fullList', this.view.renderListTodo.bind(this.model.todos));
    mediator.subscribe('fullList', this.view.renderListTodo.bind(this.model.state));
    mediator.publish('fullList', this.model, this.view.template, this.view);
    //mediator.subscribe('reRenderFullList', this.view.reRenderTodo.bind(this.model.todos));
    mediator.subscribe('reRenderFullList', this.view.reRenderTodo.bind(this.model.state));
    mediator.subscribe('addInput', this.model.addTodoItem.bind(this.model));
    mediator.subscribe('editInput', this.model.editTodoItem.bind(this.model));
    mediator.subscribe('showModal', this.modalWindow.renderPopUp.bind(this.modalWindow));
    mediator.subscribe('toggleComplete', this.model.toggleDone.bind(this.model));
    mediator.subscribe('delete', this.model.deleteItem.bind(this.model));
    mediator.subscribe('saveLeftItems', this.model.saveLeftItems.bind(this.model));
  }
}


