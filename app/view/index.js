import ListItemView from "./listItemView";
import {formTpl} from "../templates/formTpl";
import {mediator} from "../root";
import DOM from '../utilities/DOM'
import ModalView from "./modalView";

export default class View {
  constructor() {
    this.app = DOM.getElement(document, '#root');
    this.template = DOM.createElement('div', 'wrapper');
    this.modalView = new ModalView(this);
  }

  reRenderTodo(view) {
    const foundElementsSet = view.queryElement(view.template);

    while (foundElementsSet.todoList.firstChild) {
      DOM.removeNode(foundElementsSet.todoList.firstChild);
    }

    view.todosIteration(this, foundElementsSet, view);
  }

  renderListTodo(view) {
    DOM.addContentStart(view.template, formTpl);
    DOM.append(view.app, view.template);
    const foundElementsSet = view.queryElement(view.template);

    view.todosIteration(this, foundElementsSet, view);
    view.attachListener(foundElementsSet);
  }

  renderActiveItems(model, view, todo) {
    const foundElementsSet = view.queryElement(view.template);

    if (foundElementsSet.leftItems.firstChild) {
      DOM.removeNode(foundElementsSet.leftItems.firstChild);
    }
    const itemsLeft = view.getActiveItemsData(model.todos);
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
    todosCollection.todos.forEach(todo => {
      const liItemInstance = new ListItemView();
      const liItem = liItemInstance.render(todo, view);
      DOM.append(foundElementsSet.todoList, liItem.liElement);
      view.renderActiveItems(todosCollection, view, todo);
    });
  }

  attachListener({plusButton, input, all, active, completed, clear_completed}) {
    plusButton.addEventListener('click', event => {
      event.preventDefault();
      if (input.value !== '') {
        mediator.publish('addInput', input.value);
        input.value = '';
      }
    });

    all.addEventListener('click', event => {
      event.preventDefault();
    });

    active.addEventListener('click', event => {
      event.preventDefault();
      //
    });

    completed.addEventListener('click', event => {
      event.preventDefault();
    });

    clear_completed.addEventListener('click', event => {
      event.preventDefault();
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

    return {todoList, plusButton, input, leftItems, all, active, completed, clear_completed}
  }

}
