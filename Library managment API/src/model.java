package com.library.management.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private int copies;

    public Book() {}

    public Book(String title, int copies) {
        this.title = title;
        this.copies = copies;
    }

    public String getTitle() {
        return title;
    }

    public int getCopies() {
        return copies;
    }

    public void addCopies(int copies) {
        this.copies += copies;
    }

    public void addCopy() {
        copies++;
    }

    public boolean borrowCopy() {
        if (copies > 0) {
            copies--;
            return true;
        }
        return false;
    }
}

