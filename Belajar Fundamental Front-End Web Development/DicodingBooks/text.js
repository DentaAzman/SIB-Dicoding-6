const removeBook = (bookId) => {
  fetch(`${baseUrl}/delete/${bookId}`, {
    method: 'DELETE',
    headers: {
      'X-Auth-Token': '12345'
    }
  }).then(response => {
    return response.json();
  }).then(responseJson => {
    showResponseMessage(responseJson.message);
    getBook();
  }).catch(error => {
    showResponseMessage(error);
  });
 
  // .....
};