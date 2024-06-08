import './styles/style.css';
import './components/index.js';
import notesApi from './data/remote/notes-app-api.js';

document.addEventListener('DOMContentLoaded', function () {
  const notesLists = document.getElementById('notesLists');

  function addNoteToLists(id, title, body) {
    const noteObject = {
      title: title,
      body: body,
    };

    const noteElement = document.createElement('div');
    noteElement.classList.add('notes');
    noteElement.innerHTML = `
      <h2>${title}</h2>
      <p>${body}</p>
      <button type="button" class="button-delete" id="${id}">Hapus</button>
    `;
    notesLists.appendChild(noteElement);
  }

  const formInput = document.querySelector('form-input');

  formInput.addEventListener('submit', function (event) {
    event.preventDefault();

    notesApi().loadingTimeLimit();

    notesApi()
      .createNote(event.detail.title, event.detail.body)
      .then(() => {
        return notesApi().getNotes();
      })
      .then((notes) => {
        notesLists.innerHTML = '';
        notes.forEach((note) => {
          addNoteToLists(note.id, note.title, note.body);
        });
      })
      .catch((error) => {
        console.log('Error creating note: ', error);
      });
  });

  notesApi()
    .getNotes()
    .then((notes) => {
      notes.forEach(function (note) {
        addNoteToLists(note.id, note.title, note.body);
      });
    });

  notesLists.addEventListener('click', function (event) {
    if (event.target.classList.contains('button-delete')) {
      const noteId = event.target.id;

      notesApi().loadingTimeLimit();

      notesApi()
        .removeNotes(noteId)
        .then(() => {
          return notesApi().getNotes();
        })
        .then((notes) => {
          notesLists.innerHTML = '';
          notes.forEach((note) => {
            addNoteToLists(note.id, note.title, note.body);
          });
        })
        .catch((error) => {
          console.log('Error deleting note: ', error);
        });
    }
  });
});
