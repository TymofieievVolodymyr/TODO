class View {
  constructor() {
    this.app = this.getElement('#root')

    this.template = this.createElement('div', 'wrapper');

    this.template.innerHTML = formTpl;
    this.todoList = this.template.querySelector('.todo-list');
    this.input = this.template.querySelector('input');

    this.app.append(this.template);

    this.template.addEventListener('submit', event => {
      event.preventDefault();
      if (this.todoItemText) {
        mediator.pub('addInput', this.todoItemText);
        this.clearInput();
      }
    })

  }

  get todoItemText() {
    return this.input.value
  }

  clearInput() {
    this.input.value = ''
  }

  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)

    return element
  }


  getElement(selector) {
    const element = document.querySelector(selector)

    return element
  }


  displayTodos(todos) {

    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild)
    }

    todos.forEach(todo => {
      const li = this.createElement('li')
      li.id = todo.id
      const span = this.createElement('span')
      span.textContent = todo.text
      li.append(span)
      this.todoList.append(li)
    })

  }

}
