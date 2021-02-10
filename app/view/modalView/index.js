import DOM from "../../utilities/DOM";
import {modalTpl} from "../../templates/modalTpl"
import inputVerifier from "../../utilities/inputVerifier";
import {mediator} from "../../root";

export default class ModalView {
  constructor(view) {
    this.body = DOM.getElement(document, 'body');
    this.view = view;
  }

  renderPopUp(toDoItem) {
    this.queryElementAndAssignData(toDoItem);
    this.attachListenersAndFireEvent(toDoItem, this.view);
  }

  queryElementAndAssignData(toDoItem) {
    DOM.addContentStart(this.body, modalTpl);
    this.modal = DOM.getElement(this.body, '.modal');

    this.inputText = DOM.getElement(this.body, '.modal__input');
    this.inputText.value = toDoItem.text;

    this.successButton = DOM.getElement(this.body, '.success');
    this.rejectButton = DOM.getElement(this.body, '.reject');

    this.currentDate = DOM.getElement(this.body, '.creation');
    this.currentDate.value = toDoItem.creationDate;
    this.expirationDate = DOM.getElement(this.body, '.expiration');
    this.expirationDate.value = toDoItem.expirationDate;
  }

  attachListenersAndFireEvent(toDoItem, view) {
    this.inputText.addEventListener('keydown', () => {
      DOM.removeClassFromNode(this.inputText, 'invalid_input');
    }, false);

    this.rejectButton.addEventListener('click', () => {
      DOM.removeNode(this.modal);
    }, false);

    this.successButton.addEventListener('click', () => {
      let characterVerifier = inputVerifier(this.inputText.value);
      if (characterVerifier) {
        toDoItem.text = this.inputText.value;
        toDoItem.creationDate = this.currentDate.value;
        toDoItem.expirationDate = this.expirationDate.value;

        mediator.publish('editInput', toDoItem, view);

        DOM.removeNode(this.modal);
      } else {
        DOM.addClassToNode(this.inputText, 'invalid_input');
      }
    }, false);
  }
}
