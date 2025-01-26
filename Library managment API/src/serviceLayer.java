package com.library.management.service;

import com.library.management.model.Book;
import com.library.management.model.User;
import com.library.management.model.Admin;
import com.library.management.repository.BookRepository;
import com.library.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibraryService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    public LibraryService() {
        initializeLibrary();
    }

    public void initializeLibrary() {
        if (userRepository.findByToken("admin-token").isEmpty()) {
            Admin admin = new Admin("Admin", "admin-token");
            User user = new User("John Doe", "user-token");
            userRepository.save(admin);
            userRepository.save(user);
            addBook("Book A", 3, "admin-token");
            addBook("Book B", 2, "admin-token");
        }
    }

    public List<Book> getAvailableBooks() {
        return bookRepository.findAll();
    }

    public String borrowBook(String title, String token) {
        Optional<User> userOpt = userRepository.findByToken(token);
        if (userOpt.isEmpty()) return "Invalid token.";
        User user = userOpt.get();

        Optional<Book> bookOpt = bookRepository.findByTitle(title);
        if (bookOpt.isEmpty() || bookOpt.get().getCopies() <= 0) return "Book not available.";

        Book book = bookOpt.get();
        if (!user.canBorrow() || user.hasBorrowed(book)) {
            return "Borrowing limit reached or already borrowed this book.";
        }

        user.borrowBook(book);
        book.borrowCopy();
        userRepository.save(user);
        bookRepository.save(book);
        return "Book borrowed successfully.";
    }

    public String returnBook(String title, String token) {
        Optional<User> userOpt = userRepository.findByToken(token);
        if (userOpt.isEmpty()) return "Invalid token.";
        User user = userOpt.get();

        Optional<Book> bookOpt = bookRepository.findByTitle(title);
        Book book = bookOpt.orElse(new Book(title, 0));

        if (user.returnBook(book)) {
            book.addCopy();
            userRepository.save(user);
            bookRepository.save(book);
            return "Book returned successfully.";
        }
        return "Book not found in your borrowed list.";
    }

    public String addBook(String title, int copies, String token) {
        Optional<User> userOpt = userRepository.findByToken(token);
        if (userOpt.isEmpty() || !(userOpt.get() instanceof Admin)) {
            return "Only admins can add books.";
        }

        Book book = bookRepository.findByTitle(title).orElse(new Book(title, 0));
        book.addCopies(copies);
        bookRepository.save(book);
        return "Book added successfully.";
    }
}