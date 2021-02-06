import DOM from "../../utilities/DOM";
import {modalTpl} from "../modalTpl"


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

    this.successButton.addEventListener('click', ()=>{
      DOM.removeNode(this.modal);
    }, false)

    this.rejectButton.addEventListener('click', ()=>{
      DOM.removeNode(this.modal);
    }, false)

  }
}
