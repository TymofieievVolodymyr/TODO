const formTpl = `
  <h1>Todos</h1>
  <form>
      <div class="form__group">
      <button class="sorting">' '</button>
        <input type="text" class="form__input" id="name" placeholder="Add Item" name="todo"/>
        <button class="add__item">+</button>        
      </div>
  </form>
  <div class="row">
    <span class="sortByTextAscDesc"><i class="arrow up text"></i> Text</span>
    <span class="sortByDateCreatedAscDesc"><i class="arrow up create"></i> Created date</span>
    <span class="sortByExpirationAscDesc"><i class="arrow up expiration"></i> Expiration date</span>
  </div>
  <div class="wrap-sort">
  </div>
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


