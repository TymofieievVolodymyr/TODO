//export
const sortBlockTpl = `
<div class="sort">
  <div class ="row">
  <button class="sortByTextAscend">Text ⬆️</button>
  <button class="sortByDateCreatedAscend">Created date ⬆️</button>
  <button class="sortByExpirationAscend">Expiration date ⬆️</button>
  </div>
  <div class ="row">
    <button class="sortByTextDescent">Text ⬇️</button>
    <button class="sortByDateCreatedDescent">Created date ⬇️</button>
    <button class="sortByDateExpirationDescent">Expiration date ⬇️</button>
  </div>
  <div class="container">
    <form>
      <ul class="flex-outer">
        <li>
          <label for="filterText">Filter By Text</label>
          <input type="text" id="filterText" placeholder="Enter your text">
        </li>
        <li>
          <label for="startDate">Filter By Starting Date</label>
          <input type="date" id="startDate" placeholder="Enter Start date">
        </li>
        <li>
          <label for="expirationDate">Filter By Expiration Date</label>
          <input type="date" id="expirationDate" placeholder="Enter End date">
        </li>
      </ul>
    </form>
  </div>
</div>
`;


