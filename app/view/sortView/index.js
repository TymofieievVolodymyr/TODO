import DOM from "../../utilities/DOM";
import {mediator} from "../../root";
import {sortBlockTpl} from "../../templates/sortBlockTpl";


export default class SortView {

  renderSortBlock(todosCollection, view) {
    this.queryElementAndAssignData(todosCollection, view);
    //this.attachListenersAndFireEvent(toDoItem, this.view);
  }

  queryElementAndAssignData(todosCollection, view) {
    DOM.addContentEnd(view.template, sortBlockTpl);
  }

  attachListenersAndFireEvent(toDoItem, view) {
  }
}
