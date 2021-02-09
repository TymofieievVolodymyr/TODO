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
    console.log(this);
    console.log(view);
    this.todoList = DOM.getElement(view.template, '.todo-list');

    while (this.todoList.firstChild) {
      DOM.removeNode(this.todoList.firstChild);
    }

    this.todos.forEach(todo => {
      const liItemInstance = new ListItemView();
      const liItem = liItemInstance.render(todo, view);
      DOM.append(this.todoList, liItem.liElement);
      view.renderActiveItems(this, view, todo);
    });

  }

//  renderListTodo(model, template, view) {
  renderListTodo(view) {
    // console.log(this);
    // console.log(view);
    DOM.addContentStart(view.template, formTpl);
    DOM.append(view.app, view.template);
    const foundElementsSet = view.queryElement(view.template);

    // DOM.addContentStart(template, formTpl);
    // DOM.append(view.app, template);
    // const foundElementsSet = view.queryElement(template);

    this.todos.forEach(todo => {
      const liItemInstance = new ListItemView();
      const liItem = liItemInstance.render(todo, view);
      DOM.append(foundElementsSet.todoList, liItem.liElement);
      view.renderActiveItems(this, view, todo);
    });
    // model.todos.forEach(todo => {
    //   const liItemInstance = new ListItemView();
    //   const liItem = liItemInstance.render(todo, template);
    //   DOM.append(foundElementsSet.todoList, liItem.liElement);
    //   view.renderActiveItems(model, template, view, todo);
    // });

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
      console.log('all');
    });

    active.addEventListener('click', event => {
      event.preventDefault();
      console.log('active');
    });

    completed.addEventListener('click', event => {
      event.preventDefault();
      console.log('completed');
    });

    clear_completed.addEventListener('click', event => {
      event.preventDefault();
      console.log('clear_completed');
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
