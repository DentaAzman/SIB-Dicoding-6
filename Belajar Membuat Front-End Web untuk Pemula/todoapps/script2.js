document.addEventListener('DOMContentLoaded', function() {
  const addBookForm = document.getElementById('add-book-form');
  const shelf1Books = document.getElementById('shelf1-books');
  const shelf2Books = document.getElementById('shelf2-books');

  addBookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('book-title').value;
    const shelfId = document.getElementById('book-shelf').value;
    const shelf = document.getElementById(shelfId + '-books');

    const bookItem = document.createElement('li');
    bookItem.textContent = title;
    bookItem.dataset.title = title;
    bookItem.dataset.shelf = shelfId;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      shelf.removeChild(bookItem);
    });

    bookItem.appendChild(deleteButton);
    shelf.appendChild(bookItem);
  });

  document.querySelectorAll('.shelf').forEach(function(shelf) {
    shelf.addEventListener('dragover', function(event) {
      event.preventDefault();
    });

    shelf.addEventListener('drop', function(event) {
      event.preventDefault();
      const title = event.dataTransfer.getData('text');
      const shelfId = shelf.id;
      const shelf = document.getElementById(shelfId + '-books');
      const bookItem = document.querySelector(`li[data-title="${title}"]`);

      if (bookItem.dataset.shelf !== shelfId) {
        shelf.appendChild(bookItem);
        bookItem.dataset.shelf = shelfId;
      }
    });
  });

  document.querySelectorAll('li').forEach(function(bookItem) {
    bookItem.addEventListener('dragstart', function(event) {
      event.dataTransfer.setData('text', event.target.dataset.title);
    });
  });
});