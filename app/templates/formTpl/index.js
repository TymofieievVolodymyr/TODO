export const formTpl = `
  <h1>todos</h1>
  <form>
      <div class="form__group">
        <input type="text" class="form__input" id="name" placeholder="Add Item" name="todo"/>
        <button class="add__item">+</button>
        <button class="sorting">+</button>
      </div>
  </form>
  <ul class="todo-list">
  </ul>
  <footer class="footer">
  <ul class="filter">
    <li class="left">No items</li>
    <li><a class="all">all</a></li>
    <li><a class="active">Active</a></li>
    <li><a class="completed">Completed</a></li>
    <li><a class="clear_completed">Clear Completed</a></li>
  </ul>
  </footer>
`;


