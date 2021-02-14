class ModalView {
  constructor(view) {
    this.body = DOM.getElement(document, 'body');
    this.view = view;
  }

  renderPopUp(toDoItem) {
    this.queryElementAndAssignData(toDoItem, this.view);
    this.attachListenersAndFireEvent(toDoItem, this.view);
  }

  queryElementAndAssignData(toDoItem, view) {
    DOM.addContentStart(view.template, modalTpl);

    DOM.addClassToNode(this.body, 'backdrop');
    this.modal = DOM.getElement(view.template, '.modal');

    this.inputText = DOM.getElement(view.template, '.modal__input');
    this.inputText.value = toDoItem.text;

    this.successButton = DOM.getElement(view.template, '.success');
    this.rejectButton = DOM.getElement(view.template, '.reject');

    this.currentDate = DOM.getElement(view.template, '.creation');
    this.currentDate.value = toDoItem.creationDate;
    this.expirationDate = DOM.getElement(view.template, '.expiration');
    this.expirationDate.value = toDoItem.expirationDate;
  }

  attachListenersAndFireEvent(toDoItem, view) {
    this.inputText.addEventListener('keydown', () => {
      DOM.removeClassFromNode(this.inputText, 'invalid_input');
    }, false);

    this.rejectButton.addEventListener('click', () => {
      DOM.removeNode(this.modal);
      DOM.removeClassFromNode(this.body, 'backdrop');
    }, false);

    this.successButton.addEventListener('click', () => {
      let characterVerifier = inputVerifier(this.inputText.value);
      if (characterVerifier) {
        toDoItem.text = this.inputText.value;
        toDoItem.creationDate = this.currentDate.value;
        toDoItem.expirationDate = this.expirationDate.value;
        toDoItem.startDate = convertDate(this.currentDate.value);
        toDoItem.endDate = convertDate(this.expirationDate.value);
        mediator.publish('editInput', toDoItem, view);
        DOM.removeNode(this.modal);
        DOM.removeClassFromNode(this.body, 'backdrop');
      } else {
        DOM.addClassToNode(this.inputText, 'invalid_input');
      }
    }, false);
  }
}
