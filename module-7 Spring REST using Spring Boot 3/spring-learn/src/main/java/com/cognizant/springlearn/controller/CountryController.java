package com.cognizant.springlearn.controller;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.springlearn.Country;
import com.cognizant.springlearn.exception.CountryNotFoundException;
import com.cognizant.springlearn.service.CountryService;

@RestController
public class CountryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);

    @SuppressWarnings("resource")
    @RequestMapping(value = "/country", method = RequestMethod.GET)
    public Country getCountryIndia() {
        LOGGER.info("START - getCountryIndia()");

        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        Country country = context.getBean("country", Country.class);

        LOGGER.info("END - getCountryIndia()");
        return country;

    }

    @SuppressWarnings("resource")
    @GetMapping("/countries")
    public ArrayList<Country> getAllCountries() {
        LOGGER.info("START - getAllCountries()"); // Start log

        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        @SuppressWarnings("unchecked")
        ArrayList<Country> list = context.getBean("countryList", ArrayList.class);
        LOGGER.info("END - getAllCountries()"); // End log
        return list; // Automatically serializes into a JSON array!
    }

    @Autowired
    private CountryService countryService;

    @GetMapping("/countries/{code}")
    public Country getCountry(@PathVariable String code) throws CountryNotFoundException {
        LOGGER.info("START - getCountry() with code: {}", code);

        Country country = countryService.getCountry(code);

        LOGGER.info("END - getCountry()");
        return country;
    }

    @PostMapping("/countries")
    public Country addCountry(@jakarta.validation.Valid @RequestBody Country country) {
        LOGGER.info("START - addCountry()");
        LOGGER.debug("Received Country: {}", country);

        LOGGER.info("END - addCountry()");
        return country;
    }
}
