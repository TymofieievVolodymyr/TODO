class SortView {
  renderSortBlock(todosCollection, view) {
    this.queryElementAndAssignData(todosCollection, view);
    this.attachListenersAndFireEventFilter(view);
  }

  queryElementAndAssignData(todosCollection, view) {
    let existElementInDOM = DOM.getElement(view.template, '.sort');
    let wrapSort = DOM.getElement(view.template, '.wrap-sort');
    if (!existElementInDOM) {
      DOM.addContentEnd(wrapSort, sortBlockTpl);
    } else {
      DOM.removeNode(existElementInDOM);
    }
    this.filterText = DOM.getElement(view.template, '#filterText');
    this.startDate = DOM.getElement(view.template, '#startDate');
    this.expirationDate = DOM.getElement(view.template, '#expirationDate');
  }

  attachListenersAndFireEventFilter(view) {
    if (this.filterText) {
      this.filterText.addEventListener('keyup', () => {
        mediator.publish('filterText', this.filterText.value, view);
      }, false);
    }

    if (this.startDate) {
      this.startDate.addEventListener('change', () => {
        mediator.publish('filterStartDate', this.startDate.value, view);
      }, false);
    }

    if (this.expirationDate) {
      this.expirationDate.addEventListener('change', () => {
        mediator.publish('filterExpirationDate', this.expirationDate.value, view);
      }, false);
    }
  }
}
