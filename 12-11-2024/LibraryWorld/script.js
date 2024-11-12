// using object literal
const Library = {
  books: [],
  addBook: function (book) {
    this.books.push(book);
    saveData();
    updateBookLists();
  },
  listAvailableBooks: function () {
    return this.books.filter((book) => !book.isBorrowed);
  },
  listBorrowedBooks: function () {
    return this.books.filter((book) => book.isBorrowed);
  },
};

// Book factory function
function createBook(title, author) {
  return {
    title,
    author,
    isBorrowed: false,
  };
}

// User constructor function
function User(name) {
  this.name = name;
  this.borrowedBooks = [];
}

// Methods added to User prototype
User.prototype.borrowBook = function (book) {
  if (!book.isBorrowed) {
    book.isBorrowed = true;
    this.borrowedBooks.push(book);
    saveData();
    updateBookLists();
  } else {
    showAlert("This book is already borrowed!");
  }
};

User.prototype.returnBook = function (book) {
  const index = this.borrowedBooks.indexOf(book);
  if (index !== -1) {
    book.isBorrowed = false;
    this.borrowedBooks.splice(index, 1);
    saveData();
    updateBookLists();
  } else {
    showAlert("You haven't borrowed this book!");
  }
};

// LibraryMember inherits from User
function LibraryMember(name, membershipId) {
  User.call(this, name);
  this.membershipId = membershipId;
}

// Inherit User's prototype
LibraryMember.prototype = Object.create(User.prototype);
LibraryMember.prototype.constructor = LibraryMember;

// console.log(LibraryMember.prototype.constructor);

// Store all users
let users = [];

// Store data in localStorage
function saveData() {
  localStorage.setItem("library", JSON.stringify(Library.books));
  localStorage.setItem("users", JSON.stringify(users));
}

// Load data from localStorage
function loadData() {
  const savedBooks = JSON.parse(localStorage.getItem("library"));
  const savedUsers = JSON.parse(localStorage.getItem("users"));

  if (savedBooks) {
    Library.books = savedBooks;
  }
  if (savedUsers) {
    users = savedUsers;
  }
  updateBookLists();
  updateAllUsersList();
}

// Show custom alert
function showAlert(message) {
  const alertDiv = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("alert-message");
  alertMessage.textContent = message;
  alertDiv.style.display = "block";
  setTimeout(() => {
    alertDiv.style.display = "none";
  }, 2000);
}

// Populate dropdowns for books and users
function populateDropdowns() {
  const borrowUserDropdown = document.getElementById("borrow-user-dropdown");
  const returnUserDropdown = document.getElementById("return-user-dropdown");
  const borrowBookDropdown = document.getElementById("borrow-book-dropdown");
  const returnBookDropdown = document.getElementById("return-book-dropdown");

  const currentSelectedUser = returnUserDropdown.value;

  borrowUserDropdown.innerHTML = "";
  returnUserDropdown.innerHTML = "";
  borrowBookDropdown.innerHTML = "";
  returnBookDropdown.innerHTML = "";

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.name;
    option.textContent = user.name;
    borrowUserDropdown.appendChild(option);
    returnUserDropdown.appendChild(option.cloneNode(true));
  });

  returnUserDropdown.value = currentSelectedUser;

  Library.listAvailableBooks().forEach((book) => {
    const option = document.createElement("option");
    option.value = book.title;
    option.textContent = book.title;
    borrowBookDropdown.appendChild(option);
  });

  const selectedUserName = returnUserDropdown.value;
  const selectedUser = users.find((user) => user.name === selectedUserName);
  if (selectedUser) {
    returnBookDropdown.innerHTML = "";

    selectedUser.borrowedBooks.forEach((book) => {
      const option = document.createElement("option");
      option.value = book.title;
      option.textContent = book.title;
      returnBookDropdown.appendChild(option);
    });
  }
}

// Create user/member
function createUser() {
  const userName = document.getElementById("create-user-name").value;
  const memberId = document.getElementById("create-member-id").value;

  if (userName) {
    const newUser = new LibraryMember(userName, memberId || null);
    users.push(newUser);
    saveData();
    populateDropdowns();
    updateAllUsersList();

    document.getElementById("create-user-name").value = "";
    document.getElementById("create-member-id").value = "";
  } else {
    showAlert("Please enter a valid user name!");
  }
}

// Add book to library
function addBook() {
  const bookName = document.getElementById("book-name").value;
  const bookAuthor = document.getElementById("book-author").value;

  if (bookName && bookAuthor) {
    const newBook = createBook(bookName, bookAuthor);
    Library.addBook(newBook);
    showAlert("Book added successfully!");
    populateDropdowns();

    document.getElementById("book-name").value = "";
    document.getElementById("book-author").value = "";
  } else {
    showAlert("Please enter valid book details!");
  }
}

// Borrow book
function borrowBook() {
  const userName = document.getElementById("borrow-user-dropdown").value;
  const bookTitle = document.getElementById("borrow-book-dropdown").value;

  const selectedUser = users.find((user) => user.name === userName);
  const selectedBook = Library.books.find((book) => book.title === bookTitle);

  if (selectedUser && selectedBook) {
    selectedUser.borrowBook(selectedBook);
    populateDropdowns();
    showAlert(`${selectedUser.name} borrowed "${selectedBook.title}"`);
  }
}

// Return book
function returnBook() {
  const userName = document.getElementById("return-user-dropdown").value;
  const bookTitle = document.getElementById("return-book-dropdown").value;

  const selectedUser = users.find((user) => user.name === userName);
  const selectedBook = selectedUser.borrowedBooks.find(
    (book) => book.title === bookTitle
  );

  if (selectedUser && selectedBook) {
    selectedUser.returnBook(selectedBook);
    populateDropdowns();
    showAlert(`${selectedUser.name} returned "${selectedBook.title}"`);
  }
}

// Update UI to show available and borrowed books
function updateBookLists() {
  const availableBooksList = document.getElementById("available-books-list");
  const borrowedBooksList = document.getElementById("borrowed-books-list");

  availableBooksList.innerHTML = "";
  borrowedBooksList.innerHTML = "";

  Library.listAvailableBooks().forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.title} by ${book.author}`;
    availableBooksList.appendChild(li);
  });

  Library.listBorrowedBooks().forEach((book) => {
    const li = document.createElement("li");
    const user = users.find((user) => user.borrowedBooks.includes(book));
    li.textContent = `${user.name} borrowed "${book.title}" by ${book.author}`;
    borrowedBooksList.appendChild(li);
  });
}

// Update the UI to show all users
function updateAllUsersList() {
  const activeUsersList = document.getElementById("active-users-list");

  activeUsersList.innerHTML = "";

  if (users.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No users available";
    activeUsersList.appendChild(li);
  } else {
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.name} ${
        user?.membershipId ? `[ ${user?.membershipId}  ]` : ``
      }`;
      activeUsersList.appendChild(li);
    });
  }
}

document
  .getElementById("return-user-dropdown")
  .addEventListener("change", populateDropdowns);

loadData();
populateDropdowns();
