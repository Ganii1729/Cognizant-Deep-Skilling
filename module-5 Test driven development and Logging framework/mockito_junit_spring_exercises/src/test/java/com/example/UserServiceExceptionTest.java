package com.example;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

public class UserServiceExceptionTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    public UserServiceExceptionTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUserNotFound() {

        when(userRepository.findById(99L))
                .thenReturn(Optional.empty());

        Exception exception = assertThrows(
                NoSuchElementException.class,
                () -> userService.getUserById(99L)
        );

        System.out.println(
                "Exception Message = "
                + exception.getMessage());

        assertEquals(
                "User not found",
                exception.getMessage()
        );
    }
}
