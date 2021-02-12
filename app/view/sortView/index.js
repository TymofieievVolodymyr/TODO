import DOM from "../../utilities/DOM";
import {mediator} from "../../root";
import {sortBlockTpl} from "../../templates/sortBlockTpl";


export default class SortView {
  renderSortBlock(todosCollection, view) {
    this.queryElementAndAssignData(todosCollection, view);
    this.attachListenersAndFireEventSort(todosCollection, view);
    this.attachListenersAndFireEventFilter(view);
  }

  queryElementAndAssignData(todosCollection, view) {
    let existElementInDOM = DOM.getElement(view.template, '.sort');
    if (!existElementInDOM) {
      DOM.addContentEnd(view.template, sortBlockTpl);
    }
    this.sortByTextAscend = DOM.getElement(view.template, '.sortByTextAscend');
    this.sortByDateCreatedAscend = DOM.getElement(view.template, '.sortByDateCreatedAscend');
    this.sortByExpirationAscend = DOM.getElement(view.template, '.sortByExpirationAscend');
    this.sortByTextDescent = DOM.getElement(view.template, '.sortByTextDescent');
    this.sortByDateCreatedDescent = DOM.getElement(view.template, '.sortByDateCreatedDescent');
    this.sortByDateExpirationDescent = DOM.getElement(view.template, '.sortByDateExpirationDescent');
    this.filterText = DOM.getElement(view.template, '#filterText');
    this.startDate = DOM.getElement(view.template, '#startDate');
    this.expirationDate = DOM.getElement(view.template, '#expirationDate');
  }

  attachListenersAndFireEventSort(todosCollection, view) {
    this.sortByTextAscend.addEventListener('click', () => {
      mediator.publish('sortAscending', todosCollection, view);
    }, false);

    this.sortByDateCreatedAscend.addEventListener('click', () => {
      mediator.publish('sortAscendingDate', todosCollection, view);
    }, false);

    this.sortByExpirationAscend.addEventListener('click', () => {
      mediator.publish('sortAscendingDate', todosCollection, view);
    }, false);

    this.sortByTextDescent.addEventListener('click', () => {
      mediator.publish('sortDescending', todosCollection, view);
    }, false);

    this.sortByDateCreatedDescent.addEventListener('click', () => {
      mediator.publish('sortDescendingDate', todosCollection, view);
    }, false);

    this.sortByDateExpirationDescent.addEventListener('click', () => {
      mediator.publish('sortDescendingDate', todosCollection, view);
    }, false);
  }

  attachListenersAndFireEventFilter(view) {
    this.filterText.addEventListener('keyup', () => {
      mediator.publish('filterText', this.filterText.value, view);
    }, false);

    this.startDate.addEventListener('change', () => {
      mediator.publish('filterStartDate', this.startDate.value, view);
    }, false);

    this.expirationDate.addEventListener('change', () => {
      mediator.publish('filterExpirationDate', this.expirationDate.value, view);
    }, false);
  }
}
