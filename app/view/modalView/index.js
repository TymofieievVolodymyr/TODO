import DOM from "../../utilities/DOM";
import {modalTpl} from "../modalTpl"
import {mediator} from "../../root";


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

    function inputVerifier(event) {
      const regex = new RegExp("^[a-zA-Z0-9]+$");
      let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      return regex.test(key);
    }

    const saveListener = (character) => {
      this.successButton.addEventListener('click', () => {
        console.log(character);
        if (character) {
          toDoItem.text = this.inputText.value;
          mediator.publish('editInput', toDoItem);
          DOM.removeNode(this.modal);
        } else {
          DOM.addClassToNode(this.inputText, 'invalid_input');
        }

      }, false);
    }

    this.inputText.addEventListener('keypress', event => {
      let characterVerifier = inputVerifier(event);
      console.log(characterVerifier);
      saveListener(characterVerifier)
    }, false);

    // this.successButton.addEventListener('click', () => {
    //   if (characterVerifier) {
    //     toDoItem.text = this.inputText.value;
    //     mediator.publish('editInput', toDoItem);
    //     DOM.removeNode(this.modal);
    //   } else {
    //     DOM.addClassToNode(this.inputText, 'invalid_input');
    //   }
    //
    // }, false);

    this.rejectButton.addEventListener('click', () => {
      DOM.removeNode(this.modal);
    }, false);
  }
}
