
package com.library.management.user;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String token;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List borrowedBooks = new ArrayList<>();
    private static final int BORROW_LIMIT = 2;

    public User() {}

    public User(String name, String token) {
        this.name = name;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public boolean canBorrow() {
        return borrowedBooks.size() < BORROW_LIMIT;
    }

    public void borrowBook(Book book) {
        borrowedBooks.add(book);
    }

    public boolean returnBook(Book book) {
        return borrowedBooks.remove(book);
    }

    public boolean hasBorrowed(com.library.management.model.Book book) {
        return borrowedBooks.stream().anyMatch(b -> b.getTitle().equals(book.getTitle()));
    }}