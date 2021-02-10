import DOM from "../../utilities/DOM";
import {mediator} from "../../root";
import {sortBlockTpl} from "../../templates/sortBlockTpl";


export default class SortView {

  renderSortBlock(todosCollection, view) {
    this.queryElementAndAssignData(todosCollection, view);
    //this.attachListenersAndFireEvent(toDoItem, this.view);
    this.attachListenersAndFireEvent(todosCollection, view);
  }

  queryElementAndAssignData(todosCollection, view) {
    let existElementInDOM = DOM.getElement(view.template, '.sort');
    if (!existElementInDOM) {
      DOM.addContentEnd(view.template, sortBlockTpl);
    }
    this.sortByTextAscend = DOM.getElement(view.template, '.sortByTextAscend');
    this.sortByDescent = DOM.getElement(view.template, '.sortByDescent');
    this.sortByDateCreated = DOM.getElement(view.template, '.sortByDateCreated');
    this.sortByDateExpired = DOM.getElement(view.template, '.sortByDateExpired');
  }

  attachListenersAndFireEvent(todosCollection, view) {
    this.sortByTextAscend.addEventListener('click', () => {
      mediator.publish('sortAscending', todosCollection, view);
    }, false);

    this.sortByDescent.addEventListener('click', () => {
      mediator.publish('sortDescending', todosCollection, view);
    }, false);

    this.sortByDateCreated.addEventListener('click', () => {
      mediator.publish('sortAscendingDate', todosCollection, view);
    }, false);

    this.sortByDateExpired.addEventListener('click', () => {
      mediator.publish('sortDescendingDate', todosCollection, view);
    }, false);
  }
}
