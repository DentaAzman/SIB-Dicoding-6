function notesApi() {
  const baseUrl = 'https://notes-api.dicoding.dev/v2';

  function displayLoading() {
    const loader = document.querySelector('loading-indicator');
    if (loader) {
      loader.style.display = 'flex';
    }
  }

  function hideLoading() {
    const loader = document.querySelector('loading-indicator');
    if (loader) {
      loader.style.display = 'none';
    }
  }

  function getNotes() {
    displayLoading();

    return fetch(`${baseUrl}/notes`)
      .then((response) => {
        hideLoading();
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson.data);
        return responseJson.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function loadingTimeLimit() {
    displayLoading();
    setTimeout(() => {
      hideLoading();
    }, 5000);
  }

  const createNote = (title, body) => {
    return fetch(`${baseUrl}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeNotes = (notesId) => {
    return fetch(`${baseUrl}/notes/${notesId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    getNotes: getNotes,
    createNote: createNote,
    removeNotes: removeNotes,
    loadingTimeLimit: loadingTimeLimit,
  };
}

export default notesApi;
