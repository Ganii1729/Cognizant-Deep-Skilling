package com.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ParameterizedLoggingExample {

    private static final Logger logger
            = LoggerFactory.getLogger(ParameterizedLoggingExample.class);

    public static void main(String[] args) {

        String user = "John";
        int age = 25;

        logger.info("User {} is {} years old", user, age);

        logger.warn("User {} has low balance", user);

        logger.error("Error processing user {}", user);
    }
}
