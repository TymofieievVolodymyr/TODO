import DOM from "../../utilities/DOM";
import {modalTpl} from "../modalTpl"


export default class ModalView {
  constructor() {
    this.body = DOM.getElement(document, 'body');
  }

  renderPopUp() {
    DOM.addContent(this.body, modalTpl);
  }

  // renderBackdrop() {
  //   DOM.addClassToNode(this.body, '.backdrop');
  // }
}
