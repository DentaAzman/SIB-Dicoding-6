const data = {
  error: false,
  message: 'success',
  books: [
    {
      'id': 1,
      'title': 'Laskar Pelangi',
      'author': 'Andrea Hirata'
    },
    {
      'id': 2,
      'title': 'Filosofi Kopi',
      'author': 'Dewi Lestari'
    },
    {
      'id': 3,
      'title': 'Clean Code',
      'author': 'Robert C Martin'
    }
  ]
};
 
const jsonString = JSON.stringify(data);
console.log(jsonString);
 
/* Output:
{"error":false,"message":"success","books":[{"id":1,"title":"Laskar Pelangi","author":"Andrea Hirata"},{"id":2,"title":"Filosofi Kopi","author":"Dewi Lestari"},{"id":3,"title":"Clean Code","author":"Robert C Martin"}]}
*/