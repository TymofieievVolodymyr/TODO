import {mediator} from "../root";

export default class Controller {
  constructor(model, view, modalWindow) {

    this.model = model;
    this.view = view;
    this.modalWindow = modalWindow;

    mediator.subscribe('fullList', this.view.renderListTodo.bind(this.model.todos));
    mediator.publish('fullList', this.model, this.view.template, this.view.app);
    mediator.subscribe('addInput', this.model.addTodoItem.bind(this.model));
    mediator.subscribe('listChanges', this.view.renderItemTodo.bind(this.view));
    mediator.subscribe('showModal', this.modalWindow.renderPopUp.bind(this.modalWindow));
  }

}


