import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState({});
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newBook, setNewBook] = useState({ title: "", copies: 0 });
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", password: "", role: "user" });

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
    if (!currentUser) return alert("Please log in first.");
  
    const book = books.find((b) => b.title === title);
    if (book && book.copies > 0) {
      const userBooks = borrowedBooks[currentUser.username] || [];
      const borrowedBook = userBooks.find((b) => b.title === title);
  
      if (userBooks.reduce((acc, b) => acc + b.count, 0) < 2) {
        setBooks(
          books.map((b) => (b.title === title ? { ...b, copies: b.copies - 1 } : b))
        );
  
        if (borrowedBook) {
          borrowedBook.count += 1;
          setBorrowedBooks({
            ...borrowedBooks,
            [currentUser.username]: [...userBooks],
          });
        } else {
          setBorrowedBooks({
            ...borrowedBooks,
            [currentUser.username]: [...userBooks, { title, count: 1 }],
          });
        }
      } else {
        alert("Cannot borrow more than 2 books at a time.");
      }
    } else {
      alert("This book is not available.");
    }
  };
  

  const returnBook = (title) => {
    if (!currentUser) return alert("Please log in first.");
  
    const userBooks = borrowedBooks[currentUser.username] || [];
    const borrowedBookIndex = userBooks.findIndex((b) => b.title === title);
  
    if (borrowedBookIndex !== -1) {
      const borrowedBook = userBooks[borrowedBookIndex];
  
      setBooks(
        books.map((b) => (b.title === title ? { ...b, copies: b.copies + 1 } : b))
      );
  
      if (borrowedBook.count > 1) {
        userBooks[borrowedBookIndex].count -= 1;
        setBorrowedBooks({
          ...borrowedBooks,
          [currentUser.username]: [...userBooks],
        });
      } else {
        setBorrowedBooks({
          ...borrowedBooks,
          [currentUser.username]: userBooks.filter((b) => b.title !== title),
        });
      }
    }
  };
  

  const addBook = () => {
    if (!currentUser || currentUser.role !== "admin") {
      return alert("Only admins can add books.");
    }
    if (newBook.title.trim() !== "" && newBook.copies > 0) {
      setBooks((prevBooks) => [
        ...prevBooks,
        { title: newBook.title.trim(), copies: Number(newBook.copies) },
      ]);
      setNewBook({ title: "", copies: 0 }); // Reset input fields
    } else {
      alert("Invalid book details.");
    }
  };

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === loginData.username && u.password === loginData.password
    );
    if (user) {
      setCurrentUser(user);
    } else {
      alert("Invalid credentials.");
    }
  };

  const handleRegister = () => {
    if (!registerData.username || !registerData.password) {
      return alert("Username and password are required.");
    }
    if (users.find((u) => u.username === registerData.username)) {
      return alert("Username already exists.");
    }
    setUsers([...users, registerData]);
    alert("Registration successful! You can now log in.");
    setRegisterData({ username: "", password: "", role: "user" });
  };

  return (
    <div className="App bg-library">
      <header className="header">
        <h1 className="title">Library Management System</h1>
        {currentUser ? (
          <div>
            <p>Welcome, {currentUser.username} ({currentUser.role})</p>
            <button onClick={() => setCurrentUser(null)}>Logout</button>
          </div>
        ) : (
          <div>
            <h3>Login</h3>
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button onClick={handleLogin}>Login</button>

            <h3>Register</h3>
            <input
              type="text"
              placeholder="Username"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <select
              value={registerData.role}
              onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={handleRegister}>Register</button>
          </div>
        )}
      </header>

      <section className="books-section">
        <h2 className="section-title">Available Books</h2>
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.title} className="book-item">
              {book.title} - Copies: {book.copies}
              {currentUser && currentUser.role === "user" && book.copies > 0 && (
                <button onClick={() => borrowBook(book.title)}>Borrow</button>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Borrowed Books Section */}
      {currentUser && currentUser.role === "user" && (
        <section className="borrowed-books">
          <h2 className="section-title">Borrowed Books</h2>
          <ul className="book-list">
            {borrowedBooks[currentUser.username] && borrowedBooks[currentUser.username].length > 0 ? (
              borrowedBooks[currentUser.username].map((book, index) => (
                <li key={index} className="book-item">
                  {book.title} - Copies Borrowed: {book.count}
                  <button onClick={() => returnBook(book.title)}>Return</button>
                </li>
              ))
            ) : (
              <p>No books borrowed yet.</p>
            )}
          </ul>
        </section>
      )}

      {/* Admin Section for Adding Books */}
      {currentUser && currentUser.role === "admin" && (
        <section className="admin-panel">
          <h2 className="section-title">Admin Panel - Add Books</h2>
          <div className="add-book-form">
            <input
              type="text"
              placeholder="Book Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <input
              type="number"
              placeholder="Copies"
              value={newBook.copies}
              onChange={(e) =>
                setNewBook({ ...newBook, copies: Number(e.target.value) })
              }
            />
            <button onClick={addBook}>Add Book</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default App;
