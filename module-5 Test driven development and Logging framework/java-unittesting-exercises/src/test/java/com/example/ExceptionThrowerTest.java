package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;

public class ExceptionThrowerTest {

    @Test
    void testThrowException() {
        ExceptionThrower et = new ExceptionThrower();

        ArithmeticException exception = assertThrows(
                ArithmeticException.class,
                () -> et.throwException()
        );

        assertEquals("Exception occurred", exception.getMessage());
    }
}
