package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

public class CalculatorServiceParameterizedTest {

    CalculatorService calculatorService
            = new CalculatorService();

    @ParameterizedTest
    @CsvSource({
        "2, 3, 5",
        "10, 20, 30",
        "5, 5, 10",
        "-1, 1, 0"
    })
    void testAdd(int a, int b, int expected) {

        int result
                = calculatorService.add(a, b);

        System.out.println(
                a + " + " + b + " = " + result);

        assertEquals(expected, result);
    }
}
