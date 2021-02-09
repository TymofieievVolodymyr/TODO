import ListItemView from "./listItemView";
import {formTpl} from "../templates/formTpl";
import {mediator} from "../root";
import DOM from '../utilities/DOM'

export default class View {
  constructor() {
    this.app = DOM.getElement(document, '#root');
    this.template = DOM.createElement('div', 'wrapper');
  }

  reRenderTodo(model, template, view) {
    this.todoList = DOM.getElement(template, '.todo-list');

    while (this.todoList.firstChild) {
      DOM.removeNode(this.todoList.firstChild);
    }


    model.state.forEach(todo => {
      const liItemInstance = new ListItemView();
      const liItem = liItemInstance.render(todo, template);
      DOM.append(this.todoList, liItem.liElement);
    });

    view.renderActiveItems(model, template, view);

  }

  renderListTodo(model, template, view) {
    console.log(model);
    console.log(model.state.todo);
    DOM.addContentStart(template, formTpl);
    DOM.append(view.app, template);

    const foundElementsSet = view.queryElement(template);

    model.state.forEach(todo => {
      const liItemInstance = new ListItemView();
      const liItem = liItemInstance.render(todo, template);
      DOM.append(foundElementsSet.todoList, liItem.liElement);
    });

    view.attachListener(foundElementsSet);
  }

  renderActiveItems(model, template, view) {

    const foundElementsSet = view.queryElement(template);
    if (foundElementsSet.leftItems.firstChild) {
      DOM.removeNode(foundElementsSet.leftItems.firstChild);
    }
    const itemsLeft = view.getActiveItemsData(model.todos);
    DOM.addContentStart(foundElementsSet.leftItems, itemsLeft);
  }

  attachListener({plusButton, input, leftItems, all, active, completed, clear_completed}) {
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

    leftItems.addEventListener('click', event => {
      event.preventDefault();
      console.log('leftItems');
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
