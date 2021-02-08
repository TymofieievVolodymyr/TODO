export const formTpl = `
  <h1>todos</h1>
  <form>
      <div class="form__group">
        <input type="text" class="form__input" id="name" placeholder="Add Item" name="todo"/>
        <label for="name" class="form__label">Add Item</label>
      </div>
  </form>
  <ul class="todo-list">
  </ul>
  <footer class="footer">
  <ul class="filter">
    <li><a class="all">All</a></li>
    <li><a class="active">Active</a></li>
    <li><a class="completed">Completed</a></li>
    <li><a class="clear-completed">Clear Completed</a></li>
  </ul>
  </footer>
`;


