package com.cognizant.springlearn;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class SpringLearnApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(SpringLearnApplication.class, args);
        displayDate();
        // displayCountry();
        displayCountries();
    }

    // public static void displayDate() {
    //     ApplicationContext context = new ClassPathXmlApplicationContext("date-format.xml");
    //     SimpleDateFormat format = context.getBean("dateFormat", SimpleDateFormat.class);
    //     try {
    //         Date date = format.parse("31/12/2018");
    //         System.out.println(date);
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     }
    // }
    @SuppressWarnings("UseSpecificCatch")
    public static void displayDate() {
        LOGGER.info("START"); // Start log

        @SuppressWarnings("resource")
        ApplicationContext context = new ClassPathXmlApplicationContext("date-format.xml");
        SimpleDateFormat format = context.getBean("dateFormat", SimpleDateFormat.class);

        try {
            Date date = format.parse("31/12/2018");
            LOGGER.debug("Current Date: {}", date);
        } catch (Exception e) {
            LOGGER.error("Error parsing date", e);
        }

        LOGGER.info("END");
    }

    // public static void displayCountry() {
    //     LOGGER.info("START");
    //     @SuppressWarnings("resource")
    //     ApplicationContext context = new ClassPathXmlApplicationContext("country.xml"); //[cite: 1]
    //     Country country = context.getBean("country", Country.class); //[cite: 1]
    //     LOGGER.debug("Country : {}", country.toString()); //[cite: 1]
    //     LOGGER.info("END");
    // }
    @SuppressWarnings("resource")
    public static void displayCountry() {
        LOGGER.info("START");

        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");

        // Retrieve the bean twice
        Country country = context.getBean("country", Country.class);
        Country anotherCountry = context.getBean("country", Country.class);

        LOGGER.debug("Country 1: {}", country.toString());
        LOGGER.debug("Country 2: {}", anotherCountry.toString());

        LOGGER.info("END");
    }

    @SuppressWarnings("resource")
    public static void displayCountries() {
        LOGGER.info("START");

        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");

        @SuppressWarnings("unchecked")
        ArrayList<Country> countries = context.getBean("countryList", ArrayList.class);

        // Log the list as a debug trace
        LOGGER.debug("Countries List: {}", countries);

        LOGGER.info("END");
    }
}
