
Library Management System 

Overview

This is a RESTful API for managing a library system, where users can borrow and return books, and administrators can manage the library inventory. The application is built using Spring Boot and integrates with a DynamoDB database.

 Why DynamoDB choosen?
  Well, It costs only $3 - $5 cost per month where as MySql costs $750/month. Here we can consider the cost-cutting as well

Features

Users:

View available books.

Borrow books (up to 2 books per user, 1 copy per book).

Return borrowed books.

Admins:

Add new books to the library.

View and update book stock.

Access all user permissions.

Database Integration:

Persistent data storage using DynamoDB.

Tech Stack

Backend: Spring Boot

Database: DynamoDB

Build Tool: Gradle

Architectural Decisions and Assumptions

1. Separation of Concerns

The application follows a layered architecture:

Controller Layer: Handles HTTP requests and responses.

Service Layer: Encapsulates business logic.

Repository Layer: Manages database interactions.

2. User Roles

Two roles are defined: User and Admin.

Admins have elevated privileges to manage inventory.

Users are limited to borrowing and returning books.

3. Database Design

Books table stores information about books, including title and available copies.

Users table stores user details, including role and borrowed books.

Relationships:

One-to-Many: A user can borrow multiple books (up to 2).

Inheritance: Admins inherit from the User entity.

4. Concurrency Handling

Borrowing and returning books are synchronized to ensure consistent updates to the inventory.

The copies field in the Book entity is atomically updated to prevent race conditions.

5. Error Handling

Descriptive error messages for common scenarios (e.g., invalid token, book not available).

HTTP status codes are used appropriately:

400: Bad Request (e.g., invalid parameters).

401: Unauthorized (e.g., invalid token).

403: Forbidden (e.g., insufficient permissions).

6. Security

Token-based authentication ensures only authorized users can access the API.

Admin actions require an admin-specific token.

7. Assumptions

The application is designed for a single library and does not handle multiple branches.

A book's title is unique in the inventory.

Users can borrow only one copy of a book at a time.

Borrowing limits are enforced at the user level.





Deployed URL : https://library-managmentsystem.netlify.app

Please play around the provided URL, let me know if there is something if i miss it, happy to integrate it. 

Backend part : Written the code for the generation of token and api are written. That is piece of code not integrated with frontend



<img width="597" alt="Screenshot 2025-01-26 at 10 28 45 PM" src="https://github.com/user-attachments/assets/fef5bc06-aa0c-4455-94a5-5b57fbc05d4f" />

Low-Level Design (LLD)
Detailed Module Explanation:

Frontend (React.js):
UI: Displays book lists, admin panels.
Components: Borrow Book, Return Book, Add Book.

Backend (Java):
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
