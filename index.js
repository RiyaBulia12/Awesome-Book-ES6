import Books from './modules/book.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

const tableSection = document.getElementById('table-section');
const listNav = document.getElementById('list');
const createNav = document.getElementById('create');
const contactNav = document.getElementById('contact');
const addForm = document.querySelector('.add-form');
const contactForm = document.getElementById('contact-form');
const dateSection = document.getElementById('date');
const successMsg = document.getElementById('success');
const emptyMsg = document.getElementById('empty');
const bookTable = document.getElementById('bookTable');
const addBookBtn = document.getElementById('add-book-btn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const hideSuccess = () => successMsg.classList.add('hidden');

const showEmptyMessage = () => {
  if (Books.isEmpty()) {
    tableSection.classList.add('none');
    emptyMsg.classList.remove('none');
  } else {
    tableSection.classList.remove('none');
  }
};

const createBookRow = (item) => {
  const bkRow = document.createElement('tr');
  const bookDetail = bkRow.appendChild(document.createElement('td'));
  const removeBtn = bkRow.appendChild(document.createElement('button'));

  bkRow.setAttribute('id', item.id);
  bookDetail.innerHTML = `"${item.title}" by ${item.author}`;
  removeBtn.innerHTML = 'Remove';
  removeBtn.setAttribute('class', 'removeBtn');
  removeBtn.setAttribute('id', item.id);
  removeBtn.classList.add('btn');
  bookTable.appendChild(bkRow);

  const removeBtns = document.querySelectorAll('.removeBtn');
  removeBtns.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      const bookObj = new Books();
      bookObj.removeBook(event);
      showEmptyMessage();
    });
  });
};

window.onload = () => {
  dateSection.innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_HUGE);
  Books.getBooksList();
  showEmptyMessage();
  if (!Books.isEmpty()) {
    Books.bookList.forEach((item) => {
      createBookRow(item);
    });
  }
};

addBookBtn.onclick = function () {
  Books.bookList = Books.fetchBooks() ? Books.fetchBooks() : [];

  let id = 0;
  if (Books.bookList && Books.bookList.length > 0) {
    id = Books.bookList[Books.bookList.length - 1].id + 1;
  }

  title.oninput = function () { hideSuccess(); };
  author.oninput = function () { hideSuccess(); };

  id += 1;
  if (title.value && author.value) {
    const book = { id, title: title.value, author: author.value };
    const bookObj = new Books();
    bookObj.addBook(book);
    createBookRow(book);
    title.value = '';
    author.value = '';
    successMsg.innerHTML = 'Book added successfully';
    successMsg.style.cssText = 'color:green';
  } else {
    successMsg.innerHTML = 'Empty fields not allowed';
    successMsg.style.cssText = 'color:red;';
  }
  successMsg.classList.remove('hidden');
};

listNav.addEventListener('click', () => {
  showEmptyMessage();
  addForm.classList.add('none');
  contactForm.classList.add('none');
});

createNav.addEventListener('click', () => {
  hideSuccess();
  emptyMsg.classList.add('none');
  tableSection.classList.add('none');
  addForm.classList.remove('none');
  contactForm.classList.add('none');
});

contactNav.addEventListener('click', () => {
  emptyMsg.classList.add('none');
  addForm.classList.add('none');
  tableSection.classList.add('none');
  contactForm.classList.remove('none');
});
