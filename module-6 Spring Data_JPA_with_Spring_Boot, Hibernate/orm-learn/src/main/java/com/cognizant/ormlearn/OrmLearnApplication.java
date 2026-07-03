package com.cognizant.ormlearn;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.model.Department;
import com.cognizant.ormlearn.model.Employee;
import com.cognizant.ormlearn.model.Skill;
import com.cognizant.ormlearn.service.CountryService;
import com.cognizant.ormlearn.service.EmployeeService;
import com.cognizant.ormlearn.service.SkillService;
import com.cognizant.ormlearn.service.exception.CountryNotFoundException;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.cognizant.ormlearn.model.Stock;
import com.cognizant.ormlearn.service.DepartmentService;
import com.cognizant.ormlearn.service.StockService;

@SpringBootApplication
public class OrmLearnApplication {

    private static final Logger LOGGER
            = LoggerFactory.getLogger(OrmLearnApplication.class);

    private static CountryService countryService;

    private static StockService stockService;
    private static EmployeeService employeeService;
    private static DepartmentService departmentService;
    @SuppressWarnings("unused")
    private static SkillService skillService;

    @SuppressWarnings("unused")
    private static void testGetAllCountries() {

        LOGGER.info("Start");

        List<Country> countries = countryService.getAllCountries();

        LOGGER.debug("Countries: {}", countries);

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testFindCountryByCode() {

        LOGGER.info("Start");

        try {
            Country country = countryService.findCountryByCode("IN");
            LOGGER.debug("Country: {}", country);
        } catch (CountryNotFoundException e) {
            LOGGER.error(e.getMessage());
        }

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testAddCountry() {

        LOGGER.info("Start");

        Country country = new Country("ZZ", "Test Country");

        countryService.addCountry(country);

        try {
            Country result = countryService.findCountryByCode("ZZ");
            LOGGER.debug("Added Country: {}", result);
        } catch (CountryNotFoundException e) {
            LOGGER.error(e.getMessage());
        }

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testUpdateCountry() {

        LOGGER.info("Start");

        try {
            countryService.updateCountry("ZZ", "Updated Test Country");

            Country country = countryService.findCountryByCode("ZZ");

            LOGGER.debug("Updated Country: {}", country);

        } catch (CountryNotFoundException e) {
            LOGGER.error(e.getMessage());
        }

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testDeleteCountry() {

        LOGGER.info("Start");

        countryService.deleteCountry("ZZ");

        try {
            countryService.findCountryByCode("ZZ");
        } catch (CountryNotFoundException e) {
            LOGGER.debug("Country deleted successfully.");
        }

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testSearchCountries() {

        LOGGER.info("Start");

        List<Country> countries = countryService.searchCountries("ou");

        LOGGER.debug("Countries: {}", countries);

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testSearchCountriesSorted() {

        LOGGER.info("Start");

        List<Country> countries = countryService.searchCountriesSorted("ou");

        LOGGER.debug("Countries: {}", countries);

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testGetCountriesStartingWith() {

        LOGGER.info("Start");

        List<Country> countries = countryService.getCountriesStartingWith("Z");

        LOGGER.debug("Countries: {}", countries);

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testGetFacebookStocksForSeptember2019() {

        LOGGER.info("Start");

        List<Stock> stocks = stockService.getFacebookStocksForSeptember2019();

        LOGGER.debug("Stocks: {}", stocks);

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testGetGoogleStocksWithCloseGreaterThan() {

        LOGGER.info("Start");

        List<Stock> stocks
                = stockService.getGoogleStocksWithCloseGreaterThan(
                        new BigDecimal("1270.00"));

        LOGGER.debug("Stocks: {}", stocks);

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testGetTop3ByVolume() {

        LOGGER.info("Start");

        List<Stock> stocks = stockService.getTop3ByVolume();

        LOGGER.debug("Top 3 Stocks: {}", stocks);

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testGetLowestNetflixStocks() {

        LOGGER.info("Start");

        List<Stock> stocks = stockService.getLowestNetflixStocks();

        LOGGER.debug("Lowest Netflix Stocks: {}", stocks);

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testGetEmployee() {

        LOGGER.info("Start");

        Employee employee = employeeService.get(1);

        LOGGER.debug("Employee : {}", employee);
        LOGGER.debug("Department : {}", employee.getDepartment());

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testAddEmployee() {

        Employee employee = new Employee();

        employee.setName("David");
        employee.setSalary(80000);
        employee.setPermanent(true);
        employee.setDateOfBirth(LocalDate.of(1996, 8, 18));

        Department department = departmentService.get(1);

        employee.setDepartment(department);

        employeeService.save(employee);

        LOGGER.debug("{}", employee);
    }

    @SuppressWarnings("unused")
    private static void testUpdateEmployee() {

        Employee employee = employeeService.get(1);

        Department department = departmentService.get(2);

        employee.setDepartment(department);

        employeeService.save(employee);

        LOGGER.debug("{}", employee);
    }

    @SuppressWarnings("unused")
    private static void testGetDepartment() {

        LOGGER.info("Start");

        Department department = departmentService.get(1);

        LOGGER.debug("Department : {}", department);

        LOGGER.debug("Employees : {}", department.getEmployeeList());

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testGetEmployeeSkills() {

        LOGGER.info("Start");

        Employee employee = employeeService.get(1);

        LOGGER.debug("Employee : {}", employee);

        LOGGER.debug("Skills : {}", employee.getSkillList());

        LOGGER.info("End");
    }

    @SuppressWarnings("unused")
    private static void testGetSkillEmployees() {

        LOGGER.info("Start");

        Skill skill = skillService.getSkill(2);

        LOGGER.debug("Skill : {}", skill);

        LOGGER.debug("Employees : {}", skill.getEmployeeList());

        LOGGER.info("End");
    }

    private static void testGetPermanentEmployees() {

        LOGGER.info("Start");

        List<Employee> employees = employeeService.getPermanentEmployees();

        for (Employee employee : employees) {
            LOGGER.debug("Employee : {}", employee);
            LOGGER.debug("Department : {}", employee.getDepartment());
            LOGGER.debug("Skills : {}", employee.getSkillList());
        }

        LOGGER.info("End");
    }

    private static void testAverageSalary() {

        LOGGER.info("Start");

        double avg = employeeService.getAverageSalary(1);

        LOGGER.debug("Average Salary : {}", avg);

        LOGGER.info("End");
    }

    private static void testNativeQuery() {

        LOGGER.info("Start");

        List<Employee> employees = employeeService.getAllEmployeesNative();

        employees.forEach(employee -> LOGGER.debug("{}", employee));

        LOGGER.info("End");
    }

    public static void main(String[] args) {

        ApplicationContext context
                = SpringApplication.run(OrmLearnApplication.class, args);

        LOGGER.info("Inside main");

        countryService = context.getBean(CountryService.class);
        stockService = context.getBean(StockService.class);
        employeeService = context.getBean(EmployeeService.class);
        departmentService = context.getBean(DepartmentService.class);
        skillService = context.getBean(SkillService.class);
        // testFindCountryByCode();
        // testAddCountry();
        // testUpdateCountry();
        // testGetAllCountries();
        // testDeleteCountry();
        // testSearchCountries();
        // testSearchCountriesSorted();
        // testGetCountriesStartingWith();
        // testGetFacebookStocksForSeptember2019();
        // testGetGoogleStocksWithCloseGreaterThan();
        // testGetTop3ByVolume();
        // testGetLowestNetflixStocks();
        // testGetEmployee();
        // testAddEmployee();
        // testUpdateEmployee();
        // testGetDepartment();
        // testGetEmployeeSkills();
        // testGetSkillEmployees();
        // testGetPermanentEmployees();
        testAverageSalary();
        testNativeQuery();
    }

}
