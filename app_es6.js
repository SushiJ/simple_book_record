class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // Creating tr element
    const row = document.createElement("tr");
    // Insert columns
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    (document.getElementById("title").value = ""),
      (document.getElementById("author").value = ""),
      (document.getElementById("isbn").value = "");
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks(book) {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();

      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if ((book.isbn = isbn)) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Dom load event

document.addEventListener("DOMContentLoaded", Store.displayBooks);

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

    //add to localstore
    Store.addBook(book);

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

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Alert
  ui.showAlert("Book removed", "success");

  e.preventDefault();
});
