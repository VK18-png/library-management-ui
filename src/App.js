document.addEventListener("DOMContentLoaded", function () {
  let books = [
    { title: "Book A", copies: 3 },
    { title: "Book B", copies: 2 },
  ];
  let users = [];
  let currentUser = null;
  let borrowedBooks = {};

  function updateBooksList() {
    const booksList = document.getElementById("books-list");
    booksList.innerHTML = "";
    books.forEach((book) => {
      const li = document.createElement("li");
      li.innerHTML = `${book.title} - Copies: ${book.copies}`;
      if (currentUser && currentUser.role === "user" && book.copies > 0) {
        const borrowBtn = document.createElement("button");
        borrowBtn.innerText = "Borrow";
        borrowBtn.onclick = () => borrowBook(book.title);
        li.appendChild(borrowBtn);
      }
      booksList.appendChild(li);
    });
  }

  function updateBorrowedBooks() {
    const borrowedList = document.getElementById("borrowed-books-list");
    borrowedList.innerHTML = "";
    if (currentUser && borrowedBooks[currentUser.username]) {
      borrowedBooks[currentUser.username].forEach((book) => {
        const li = document.createElement("li");
        li.innerHTML = `${book.title} - Copies Borrowed: ${book.count}`;
        const returnBtn = document.createElement("button");
        returnBtn.innerText = "Return";
        returnBtn.onclick = () => returnBook(book.title);
        li.appendChild(returnBtn);
        borrowedList.appendChild(li);
      });
    }
  }

  function borrowBook(title) {
    if (!currentUser) return alert("Please log in first.");
    const book = books.find((b) => b.title === title);
    if (book && book.copies > 0) {
      const userBooks = borrowedBooks[currentUser.username] || [];
      const borrowedBook = userBooks.find((b) => b.title === title);
      if (userBooks.reduce((acc, b) => acc + b.count, 0) < 2) {
        book.copies -= 1;
        if (borrowedBook) {
          borrowedBook.count += 1;
        } else {
          userBooks.push({ title, count: 1 });
        }
        borrowedBooks[currentUser.username] = userBooks;
        updateBooksList();
        updateBorrowedBooks();
      } else {
        alert("Cannot borrow more than 2 books at a time.");
      }
    } else {
      alert("This book is not available.");
    }
  }

  function returnBook(title) {
    if (!currentUser) return alert("Please log in first.");
    const userBooks = borrowedBooks[currentUser.username] || [];
    const bookIndex = userBooks.findIndex((b) => b.title === title);
    if (bookIndex !== -1) {
      const borrowedBook = userBooks[bookIndex];
      books.find((b) => b.title === title).copies += 1;
      if (borrowedBook.count > 1) {
        borrowedBook.count -= 1;
      } else {
        userBooks.splice(bookIndex, 1);
      }
      borrowedBooks[currentUser.username] = userBooks;
      updateBooksList();
      updateBorrowedBooks();
    }
  }

  document.getElementById("login-btn").addEventListener("click", function () {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      currentUser = user;
      document.getElementById("current-user").innerText = `Welcome, ${user.username} (${user.role})`;
    } else {
      alert("Invalid credentials.");
    }
  });

  document.getElementById("register-btn").addEventListener("click", function () {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const role = document.getElementById("register-role").value;
    if (!users.find((u) => u.username === username)) {
      users.push({ username, password, role });
      alert("Registration successful!");
    } else {
      alert("Username already exists.");
    }
  });

  document.getElementById("add-book-btn").addEventListener("click", function () {
    if (!currentUser || currentUser.role !== "admin") {
      return alert("Only admins can add books.");
    }
    const title = document.getElementById("new-book-title").value;
    const copies = Number(document.getElementById("new-book-copies").value);
    if (title && copies > 0) {
      books.push({ title, copies });
      updateBooksList();
    } else {
      alert("Invalid book details.");
    }
  });

  updateBooksList();
});
