package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserIntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    void testFullFlow() {

        User user = new User(1L, "John");

        userRepository.save(user);

        User result = userService.getUserById(1L);

        System.out.println("User From DB = " + result.getName());

        assertNotNull(result);
        assertEquals("John", result.getName());
    }
}
