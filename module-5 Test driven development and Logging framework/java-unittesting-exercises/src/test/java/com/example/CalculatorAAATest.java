package com.example;

import org.junit.After;
import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;

public class CalculatorAAATest {

    private Calculator calc;

    @Before
    public void setUp() {
        System.out.println("Setting up...");
        calc = new Calculator();
    }

    @After
    public void tearDown() {
        System.out.println("Cleaning up...");
        calc = null;
    }

    @Test
    public void testAddUsingAAA() {

        // Arrange
        int a = 10;
        int b = 5;

        // Act
        int result = calc.add(a, b);

        // Assert
        assertEquals(15, result);
    }
}