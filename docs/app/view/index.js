class View {
  constructor() {
    this.app = DOM.getElement(document, '#root');
    this.template = DOM.createElement('div', 'wrapper');
    this.modalView = new ModalView(this);
    this.sortView = new SortView();
  }

  reRenderTodo(view, filteredCollection) {
    const foundElementsSet = view.queryElement(view.template);

    while (foundElementsSet.todoList.firstChild) {
      DOM.removeNode(foundElementsSet.todoList.firstChild);
    }

    if (filteredCollection) {
      view.todosIteration(filteredCollection, foundElementsSet, view);
    } else {
      view.todosIteration(this.todos, foundElementsSet, view);
    }
  }

  renderListTodo(view) {
    DOM.addContentStart(view.template, formTpl);
    DOM.append(view.app, view.template);
    const foundElementsSet = view.queryElement(view.template);

    view.todosIteration(this.todos, foundElementsSet, view);
    view.attachListener(foundElementsSet, this, view, this.todos);
  }

  renderRemainItems(model, view, todo) {
    const foundElementsSet = view.queryElement(view.template);

    if (foundElementsSet.leftItems.firstChild) {
      DOM.removeNode(foundElementsSet.leftItems.firstChild);
    }
    const itemsLeft = view.getActiveItemsData(model);
    mediator.publish('saveLeftItems', itemsLeft, todo);
    DOM.addContentStart(foundElementsSet.leftItems, itemsLeft);
  }

  renderNoItems(text, view) {
    const itemsLeftElement = DOM.getElement(view.template, '.left');
    if (itemsLeftElement.firstChild) {
      DOM.removeNode(itemsLeftElement.firstChild);
    }
    DOM.addContentStart(itemsLeftElement, text);
  }

  todosIteration(todosCollection, foundElementsSet, view) {
    todosCollection.forEach(todo => {
      const liItemInstance = new ListItemView();
      const liItem = liItemInstance.render(todo, view);
      DOM.append(foundElementsSet.todoList, liItem.liElement);
      view.renderRemainItems(todosCollection, view, todo);
    });
  }

  attachListener({
                   plusButton, input, all,
                   active, completed, clear_completed,
                   sortingButton, form, sortByTextAscDesc,
                   sortByDateCreatedAscDesc, sortByExpirationAscDesc,
                   text, create, expiration
                 },
                 model, view, todosCollection) {
    plusButton.addEventListener('click', event => {
      event.preventDefault();
      if (input.value !== '') {
        model.todo.text = input.value.trim();
        mediator.publish('addInput', model.todo);
        input.value = '';
      }
    });

    sortingButton.addEventListener('click', event => {
      event.preventDefault();
      mediator.publish('showSortingBlock', model.todos, view);
    });

    sortByTextAscDesc.addEventListener('click', () => {
      let existUp = DOM.containsClass(text, 'up');
      if (existUp) {
        mediator.publish('sortAscending', todosCollection, view);
      } else {
        mediator.publish('sortDescending', todosCollection, view);
      }

      DOM.toggleClass(text, 'up');
      DOM.toggleClass(text, 'down');
    });

    sortByDateCreatedAscDesc.addEventListener('click', () => {
      let existUp = DOM.containsClass(create, 'up');
      if (existUp) {
        mediator.publish('sortAscendingDate', todosCollection, view);
      } else {
        mediator.publish('sortDescendingDate', todosCollection, view);
      }
      DOM.toggleClass(create, 'up');
      DOM.toggleClass(create, 'down');
    });

    sortByExpirationAscDesc.addEventListener('click', () => {
      let existUp = DOM.containsClass(expiration, 'up');
      if (existUp) {
        mediator.publish('sortAscendingDate', todosCollection, view);
      } else {
        mediator.publish('sortDescendingDate', todosCollection, view);
      }

      DOM.toggleClass(expiration, 'up');
      DOM.toggleClass(expiration, 'down');
    });

    form.addEventListener('keydown', event => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });

    all.addEventListener('click', event => {
      event.preventDefault();
      mediator.publish('reRenderFullList', view);
    });

    active.addEventListener('click', event => {
      event.preventDefault();
      mediator.publish('filterActiveItems', model.todos, view);
    });

    completed.addEventListener('click', event => {
      event.preventDefault();
      mediator.publish('filterCompletedItems', model.todos, view);
    });

    clear_completed.addEventListener('click', event => {
      event.preventDefault();
      mediator.publish('deleteCompletedItems', view);
    });
  }

  getActiveItemsData(todoList) {
    return `${todoList.length} item${todoList.length !== 1 ? 's' : ''} left`;
  }

  queryElement(template) {
    let todoList = DOM.getElement(template, '.todo-list');
    let plusButton = DOM.getElement(template, '.add__item');
    let input = DOM.getElement(template, 'input');
    let leftItems = DOM.getElement(template, '.left');
    let all = DOM.getElement(template, '.all');
    let active = DOM.getElement(template, '.active');
    let completed = DOM.getElement(template, '.completed');
    let clear_completed = DOM.getElement(template, '.clear_completed');
    let sortingButton = DOM.getElement(template, '.sorting');
    let form = DOM.getElement(template, 'form');
    let sortByTextAscDesc = DOM.getElement(template, '.sortByTextAscDesc');
    let sortByDateCreatedAscDesc = DOM.getElement(template, '.sortByDateCreatedAscDesc');
    let sortByExpirationAscDesc = DOM.getElement(template, '.sortByExpirationAscDesc');
    let text = DOM.getElement(template, '.text');
    let create = DOM.getElement(template, '.create');
    let expiration = DOM.getElement(template, '.expiration');

    return {
      todoList,
      plusButton,
      input,
      leftItems,
      all,
      active,
      completed,
      clear_completed,
      sortingButton,
      form,
      sortByTextAscDesc,
      sortByDateCreatedAscDesc,
      sortByExpirationAscDesc,
      text,
      create,
      expiration
    }
  }

}
