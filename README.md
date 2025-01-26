


Deployed URL : 


<img width="597" alt="Screenshot 2025-01-26 at 10 28 45 PM" src="https://github.com/user-attachments/assets/fef5bc06-aa0c-4455-94a5-5b57fbc05d4f" />

Low-Level Design (LLD)
Detailed Module Explanation:

Frontend (React.js):
UI: Displays book lists, admin panels.
Components: Borrow Book, Return Book, Add Book.

Backend (Node.js):
APIs:
/books (GET): Fetch all books.
/borrow (POST): Borrow a book.
/return (POST): Return a book.
/admin/add (POST): Add a book.

Authentication Middleware: For admin access.

Database (DynamoDB):
Tables:
Books: Stores book details.
BorrowedBooks: Tracks borrowed books.
Diagram: (Include an LLD diagram with API endpoints and database connections.)
