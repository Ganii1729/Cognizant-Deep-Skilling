package com.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AppenderExample {

    private static final Logger logger
            = LoggerFactory.getLogger(AppenderExample.class);

    public static void main(String[] args) {

        logger.info("Application Started");

        logger.warn("This is a warning");

        logger.error("Something went wrong");

        logger.debug("Debug message");
    }
}
