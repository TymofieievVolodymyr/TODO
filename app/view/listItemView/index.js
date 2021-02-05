import DOM from "../../utilities/DOM";

export default class ListItemView {
  render(toDoItem) {
    this.liElement = DOM.createElement('li');
    this.span = DOM.createElement('span');
    DOM.append(this.liElement, this.span);
    this.spanItemContent = DOM.getElement(this.liElement, 'span');
    this.liElement.id = toDoItem.id;
    this.spanItemContent.textContent = toDoItem.text;

    return this;
  }
}
