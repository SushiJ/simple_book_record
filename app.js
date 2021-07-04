// book constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// Constructor
function UI() {}

// add books to localStorage
UI.prototype.addBooks = (book) => {
  let books;

  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  books.push(book);
  // adding books to LS
  localStorage.setItem("books", JSON.stringify(books));
};

// Add book to list
UI.prototype.addBookToList = (book) => {
  // Getting book list
  const list = document.getElementById("book-list");
  // Creating tr element
  const row = document.createElement("tr");
  // Insert columns
  row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;

  list.appendChild(row);
};

// Display books
UI.prototype.displayBooks = () => {
  let books;

  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  books.forEach((book) => {
    const list = document.getElementById("book-list");
    // Creating tr element
    const row = document.createElement("tr");
    // Insert columns
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
  });
};

UI.prototype.showAlert = (message, className) => {
  // Constructing div
  const div = document.createElement("div");

  div.className = `alert ${className}`;

  console.log(div.className);

  div.appendChild(document.createTextNode(message));

  const container = document.querySelector(".container");

  const form = document.querySelector("#book-form");

  container.insertBefore(div, form);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.removeFromLocalStorage = (isbn) => {
  let books;

  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  books.forEach((book, index) => {
    if ((book.isbn = isbn)) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem("books", JSON.stringify(books));
};

// Delete Book
UI.prototype.deleteBook = (target) => {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// clearing fields
UI.prototype.clearFields = () => {
  (document.getElementById("title").value = ""),
    (document.getElementById("author").value = ""),
    (document.getElementById("isbn").value = "");
};

// Dom load event
document.addEventListener("DOMContentLoaded", UI.prototype.displayBooks);

// Event listeners
document.getElementById("book-form").addEventListener("submit", (e) => {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Creating book object from Book constructor
  const book = new Book(title, author, isbn);

  // creating ui object from UI constructor
  const ui = new UI();

  // Validation
  if (title === "" || author === "" || isbn === "") {
    // Error alerts
    ui.showAlert("Please fill all fields", "error");
  } else {
    // adding book to the table
    ui.addBookToList(book);

    // Adding books to local storage
    ui.addBooks(book);

    //Success Alerts
    ui.showAlert("Book added", "success");

    // clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Delete these books
document.getElementById("book-list").addEventListener("click", (e) => {
  // creating ui object from UI constructor
  const ui = new UI();

  ui.deleteBook(e.target);

  ui.removeFromLocalStorage(
    e.target.parentElement.previousElementSibling.textContent
  );

  ui.showAlert("Book removed", "success");

  e.preventDefault();
});
