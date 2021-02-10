import ListItemView from "./listItemView";
import {formTpl} from "../templates/formTpl";
import {mediator} from "../root";
import DOM from '../utilities/DOM'
import ModalView from "./modalView";
import SortView from "./sortView"

export default class View {
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
    view.attachListener(foundElementsSet, this, view);
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

  attachListener({plusButton, input, all, active, completed, clear_completed, sortingButton}, model, view) {
    plusButton.addEventListener('click', event => {
      event.preventDefault();
      if (input.value !== '') {
        mediator.publish('addInput', input.value);
        input.value = '';
      }
    });

    sortingButton.addEventListener('click', event => {
      event.preventDefault();
      mediator.publish('showSortingBlock', model.todos, view);
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

    return {todoList, plusButton, input, leftItems, all, active, completed, clear_completed, sortingButton}
  }

}
