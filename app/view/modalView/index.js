import DOM from "../../utilities/DOM";
import {modalTpl} from "../modalTpl"


export default class ModalView {
  constructor() {
    this.body = DOM.getElement(document, 'body');
  }

  renderPopUp() {
    DOM.addContentStart(this.body, modalTpl);
    // 🥚 https://coub.com/view/1bqqd0
  }
}
