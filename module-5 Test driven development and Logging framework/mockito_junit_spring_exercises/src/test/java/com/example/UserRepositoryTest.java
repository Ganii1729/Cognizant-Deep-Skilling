package com.example;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByName() {

        userRepository.save(
                new User(1L, "John"));

        userRepository.save(
                new User(2L, "John"));

        userRepository.save(
                new User(3L, "Alice"));

        List<User> users
                = userRepository.findByName("John");

        System.out.println(
                "Users Found = "
                + users.size());

        assertEquals(2, users.size());
    }
}
