export default class Books {
  constructor() {
    this.bookList = [];
  }

   static fetchBooks = () => {
     const getBooks = localStorage.getItem('books');
     return getBooks ? JSON.parse(getBooks) : [];
   }

   static updateBooks = (books) => localStorage.setItem('books', JSON.stringify(books));

   static getBooksList = () => {
     if (Books.fetchBooks()) {
       this.bookList = Books.fetchBooks();
     }
   }

   addBook = (book) => {
     this.bookList = Books.fetchBooks();
     this.bookList.push(book);
     Books.updateBooks(this.bookList);
   }

   removeBook = (event) => {
     const id = parseInt(event.target.id, 10);
     this.bookList = Books.fetchBooks();
     this.bookList = this.bookList.filter((i) => i.id !== id);
     event.target.parentElement.remove();
     Books.updateBooks(this.bookList);
   }

   static isEmpty = () => {
     if (JSON.parse(localStorage.getItem('books'))) {
       return JSON.parse(localStorage.getItem('books')).length === 0;
     }
     return (localStorage.getItem('books') === null
         || localStorage.getItem('books').value === undefined);
   }
}
