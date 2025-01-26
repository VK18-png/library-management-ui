package com.library.management.controller;

import com.library.management.service.LibraryService;
import com.library.management.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LibraryController {
    @Autowired
    private LibraryService libraryService;
    @GetMapping("/books")
    public List<Book> getAvailableBooks() {
        return libraryService.getAvailableBooks();
    }

    @PostMapping("/borrow")
    public String borrowBook(@RequestParam String title, @RequestParam String token) {
        return libraryService.borrowBook(title, token);
    }

    @PostMapping("/return")
    public String returnBook(@RequestParam String title, @RequestParam String token) {
        return libraryService.returnBook(title, token);
    }

    @PostMapping("/admin/add-book")
    public String addBook(@RequestParam String title, @RequestParam int copies, @RequestParam String token) {
        return libraryService.addBook(title, copies, token);
    }
}