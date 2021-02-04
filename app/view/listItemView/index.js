export default class ListItemView {
  constructor(toDoItem) {
    this.liElement = document.createElement('li');
    this.span = document.createElement('span');
    this.liElement.append(this.span);
    this.spanItemContent = this.liElement.querySelector('span');
    this.liElement.id = toDoItem.id;
    this.spanItemContent.textContent = toDoItem.text;
  }
}
