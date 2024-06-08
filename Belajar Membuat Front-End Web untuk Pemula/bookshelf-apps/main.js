const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-bookshelf';
const STORAGE_KEY = 'BOOKSHELF_APPS';

function generateId() {
  return +new Date();
}

function generateBookListObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  }
}

function findBook(bookId) {
  for (const bookList of books) {
    if (bookList.id === bookId) {
      return bookList;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser Anda tidak mendukung local storage.');
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const bookList of data) {
      books.push(bookList);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBookList(bookListObject) {
  const textTitle = document.createElement('h3');
  textTitle.innerText = bookListObject.title;

  const textAuthor = document.createElement('p');
  textAuthor.innerText = `Penulis: ${bookListObject.author}`;

  const textYear = document.createElement('p');
  textYear.innerText = `Tahun: ${bookListObject.year}`;

  const textContainer = document.createElement('article');
  textContainer.classList.add('book_item');
  textContainer.append(textTitle, textAuthor, textYear);

  if (textContainer.appendChild(textTitle),
  textContainer.appendChild(textAuthor),
  textContainer.appendChild(textYear),
  bookListObject.isComplete) {
    const addToCompleteButton = document.createElement('button');
    addToCompleteButton.classList.add('green');
    addToCompleteButton.innerText = 'Belum selesai dibaca';

    addToCompleteButton.addEventListener('click', function () {
      undoBookFromCompleteShelf(bookListObject.id);
    });

    const removeButton = document.createElement('button');
    removeButton.classList.add('red');
    removeButton.innerText = 'Hapus buku';

    removeButton.addEventListener('click', function () {
      removeBookFromShelf(bookListObject.id);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action');
    buttonContainer.append(addToCompleteButton, removeButton);

    textContainer.append(buttonContainer);

    return textContainer;
  } else {
    const addToCompleteButton = document.createElement('button');
    addToCompleteButton.classList.add('green');
    addToCompleteButton.innerText = 'Selesai dibaca';

    addToCompleteButton.addEventListener('click', function () {
      addBookToCompleteShelf(bookListObject.id);
    });

    const removeButton = document.createElement('button');
    removeButton.classList.add('red');
    removeButton.innerText = 'Hapus buku';

    removeButton.addEventListener('click', function () {
      removeBookFromShelf(bookListObject.id);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action');
    buttonContainer.append(addToCompleteButton, removeButton);

    textContainer.append(buttonContainer);

    return textContainer;
  }
}

function addBook() {
  const bookTitle = document.getElementById('inputBookTitle').value;
  const bookAuthor = document.getElementById('inputBookAuthor').value;
  const parseBookYear = document.getElementById('inputBookYear').value;
  const bookYear = parseInt(parseBookYear);
  
  const bookIsComplete = document.getElementById('inputBookIsComplete').checked;

  const generatedID = generateId();
  const bookListObject = generateBookListObject(generatedID, bookTitle, bookAuthor, bookYear, bookIsComplete);
  books.push(bookListObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function addBookToCompleteShelf (bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeBookFromShelf(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoBookFromCompleteShelf(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function filterBooks(query) {
  const incompleteBooks = document.querySelectorAll('#incompleteBookshelfList .book_item');
  const completeBooks = document.querySelectorAll('#completeBookshelfList .book_item');

  filterBookList(incompleteBooks, query);
  filterBookList(completeBooks, query);
}

function filterBookList(bookList, query) {
  bookList.forEach(function (book) {
    const title = book.querySelector('h3').innerText.toLowerCase();

    if (title.includes(query)) {
      book.style.display = 'block';
    } else {
      book.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });

  const searchBook = document.getElementById('searchBook');
  const searchTitle = document.getElementById('searchBookTitle');
  searchBook.addEventListener('submit', function (event) {
    event.preventDefault();

    const query = searchTitle.value.toLowerCase();

    filterBooks(query);
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, function () {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerText = 'Data telah tersimpan!';

  document.body.appendChild(toast);

  setTimeout(function () {
    toast.remove();
  }, 2000);
});

document.addEventListener(RENDER_EVENT, function () {
  const incompleteBOOKShelfList = document.getElementById('incompleteBookshelfList');
  incompleteBOOKShelfList.innerHTML = '';

  const completeBOOKShelfList = document.getElementById('completeBookshelfList');
  completeBOOKShelfList.innerHTML = '';

  for (const bookList of books) {
    const bookListElement = makeBookList(bookList);
    if (!bookList.isComplete) {
      incompleteBOOKShelfList.append(bookListElement);
    } else {
      completeBOOKShelfList.append(bookListElement);
    }
  }
});