import {mediator} from "../../root";

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
    mediator.subscribe('filterCompletedItems', this.model.filterCompletedItems.bind(this.model));
    mediator.subscribe('deleteCompletedItems', this.model.deleteCompletedItems.bind(this.model));
    mediator.subscribe('showSortingBlock', view.sortView.renderSortBlock.bind(view.sortView));
    mediator.subscribe('sortAscending', this.model.sortAscending.bind(this.model));
    mediator.subscribe('sortDescending', this.model.sortDescending.bind(this.model));
    mediator.subscribe('sortAscendingDate', this.model.sortAscendingDate.bind(this.model));
    mediator.subscribe('sortDescendingDate', this.model.sortDescendingDate.bind(this.model));
    mediator.subscribe('filterText', this.model.filterText.bind(this.model));
    mediator.subscribe('filterStartDate', this.model.filterStartDate.bind(this.model));
    mediator.subscribe('filterExpirationDate', this.model.filterExpirationDate.bind(this.model));
  }
}


