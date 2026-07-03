package com.library.springbootlibrarymanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.springbootlibrarymanagement.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
