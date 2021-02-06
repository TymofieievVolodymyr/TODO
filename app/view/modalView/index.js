import DOM from "../../utilities/DOM";
import {modalTpl} from "../modalTpl"


export default class ModalView {
  constructor() {
    this.body = DOM.getElement(document, 'body');
  }

  renderPopUp(toDoItem) {
    DOM.addContentStart(this.body, modalTpl);
    this.inputText = DOM.getElement(this.body, '.modal__input');
    this.inputText.value = toDoItem.text;
  }
}
