package com.example;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({
    CalculatorTest.class,
    AssertionsTest.class,
    CalculatorAAATest.class,
    EvenCheckerTest.class
})
public class AllTests {
}
