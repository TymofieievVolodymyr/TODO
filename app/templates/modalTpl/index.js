export const modalTpl = `
<div class="modal">  
  <input type="text" class="modal__input">
  <label for="date">Creation date</label>
  <input id="creation" type="date" class="modal__input creation">
  <label for="date">Expiration date</label>
  <input id="expiration" type="date" class="modal__input expiration">
  <div class="options">
    <button class="btn success">Save</button>
    <button class="btn reject">Cancel</button>
  </div>
</div>
`;

