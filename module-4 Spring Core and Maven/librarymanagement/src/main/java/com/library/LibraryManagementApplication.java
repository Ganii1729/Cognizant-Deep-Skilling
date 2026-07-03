package com.library;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.library.service.BookService;

public class LibraryManagementApplication {

    public static void main(String[] args) {

        // Load the Spring configuration file
        ApplicationContext context
                = new ClassPathXmlApplicationContext("applicationContext.xml");

        // Get the beans from Spring
        BookService service = context.getBean("bookService", BookService.class);
        // BookRepository repository = context.getBean("bookRepository", BookRepository.class);

        // Call methods
        service.service();
        // repository.display();
    }
}
