import DOM from "../../utilities/DOM";
import {modalTpl} from "../modalTpl"
import {mediator} from "../../root";
import inputVerifier from "../../utilities/inputVerifier";


export default class ModalView {
  constructor() {
    this.body = DOM.getElement(document, 'body');
  }

  renderPopUp(toDoItem) {
    DOM.addContentStart(this.body, modalTpl);
    this.modal = DOM.getElement(this.body, '.modal');

    this.inputText = DOM.getElement(this.body, '.modal__input');
    this.inputText.value = toDoItem.text;

    this.successButton = DOM.getElement(this.body, '.success');
    this.rejectButton = DOM.getElement(this.body, '.reject');

    this.currentDate = DOM.getElement(this.body, '.creation');
    this.expirationDate = DOM.getElement(this.body, '.expiration');

    this.inputText.addEventListener('keydown', () => {
      DOM.removeClassFromNode(this.inputText, 'invalid_input');
    }, false);

    this.successButton.addEventListener('click', () => {
      let characterVerifier = inputVerifier(this.inputText.value);
      if (characterVerifier) {
        toDoItem.text = this.inputText.value;
        toDoItem.creationDate = this.currentDate.value;
        toDoItem.expirationDate = this.expirationDate.value;

        mediator.publish('editInput', toDoItem);
        DOM.removeNode(this.modal);
      } else {
        DOM.addClassToNode(this.inputText, 'invalid_input');
      }
    }, false);

    this.rejectButton.addEventListener('click', () => {
      DOM.removeNode(this.modal);
    }, false);
  }
}
