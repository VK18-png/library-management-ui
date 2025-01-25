import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", copies: 0 });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const dummyBooks = [
      { title: "Book A", copies: 3 },
      { title: "Book B", copies: 2 },
    ];
    setBooks(dummyBooks);
  };

  const borrowBook = (title) => {
    const book = books.find((b) => b.title === title);
    if (book && book.copies > 0 && borrowedBooks.length < 2) {
      setBorrowedBooks([...borrowedBooks, { title }]);
      setBooks(
        books.map((b) =>
          b.title === title ? { ...b, copies: b.copies - 1 } : b
        )
      );
    } else {
      alert("Cannot borrow this book. Check your limit or availability.");
    }
  };

  const returnBook = (title) => {
    if (borrowedBooks.find((b) => b.title === title)) {
      setBorrowedBooks(borrowedBooks.filter((b) => b.title !== title));
      setBooks(
        books.map((b) =>
          b.title === title ? { ...b, copies: b.copies + 1 } : b
        )
      );
    }
  };

  const addBook = () => {
    if (isAdmin && newBook.title && newBook.copies > 0) {
      setBooks([...books, newBook]);
      setNewBook({ title: "", copies: 0 });
    } else {
      alert("Only admins can add books or check the input.");
    }
  };

  return (
    <div className="App bg-library">
      <header className="header">
        <h1 className="title">Library Management System</h1>
        <button className="toggle-button" onClick={() => setIsAdmin(!isAdmin)}>
          {isAdmin ? "Switch to User" : "Switch to Admin"}
        </button>
      </header>

      <section className="books-section">
        <h2 className="section-title">Available Books</h2>
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.title} className="book-item">
              <span className="book-title">{book.title}</span> - Copies: {book.copies}
              {!isAdmin && book.copies > 0 && (
                <button
                  className="borrow-button"
                  onClick={() => borrowBook(book.title)}
                >
                  Borrow
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      {!isAdmin && (
        <section className="borrowed-section">
          <h2 className="section-title">Your Borrowed Books</h2>
          <ul className="borrowed-list">
            {borrowedBooks.map((book) => (
              <li key={book.title} className="borrowed-item">
                <span className="borrowed-title">{book.title}</span>
                <button
                  className="return-button"
                  onClick={() => returnBook(book.title)}
                >
                  Return
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {isAdmin && (
        <section className="admin-panel">
          <h2 className="section-title">Admin Panel</h2>
          <div className="add-book-form">
            <input
              type="text"
              placeholder="Book Title"
              value={newBook.title}
              className="input"
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Copies"
              value={newBook.copies}
              className="input"
              onChange={(e) =>
                setNewBook({ ...newBook, copies: parseInt(e.target.value, 10) })
              }
            />
            <button className="add-button" onClick={addBook}>
              Add Book
            </button>
          </div>
          <h3 className="section-title">Borrowed Book Details</h3>
          <ul className="borrowed-list">
            {borrowedBooks.map((book) => (
              <li key={book.title} className="borrowed-item">
                {book.title}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default App;