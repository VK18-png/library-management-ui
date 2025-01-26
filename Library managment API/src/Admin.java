@Entity
public class Admin extends User {
    public Admin(String name, String token) {
        super(name, token);
    }
}

// Repository Layer
package com.library.management.repository;

import com.library.management.model.Book;
import com.library.management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    Optional findByTitle(String title);
}

public interface UserRepository extends JpaRepository<User, Long> {
    Optional findByToken(String token);
}