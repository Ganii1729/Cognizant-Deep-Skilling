package com.cognizant.springlearn.controller;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.springlearn.exception.EmployeeNotFoundException;
import com.cognizant.springlearn.model.Employee;
import com.cognizant.springlearn.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
public class EmployeeController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmployeeController.class);

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public ArrayList<Employee> getAllEmployees() {
        LOGGER.info("START - getAllEmployees()");

        ArrayList<Employee> employees = employeeService.getAllEmployees();

        LOGGER.info("END - getAllEmployees()");
        return employees;
    }

    @PutMapping("/employees")
    public Employee updateEmployee(@Valid @RequestBody Employee employee) throws EmployeeNotFoundException {
        LOGGER.info("START - updateEmployee()");
        Employee updated = employeeService.updateEmployee(employee);
        LOGGER.info("END - updateEmployee()");
        return updated;
    }

    @DeleteMapping("/employees/{id}")
    public void deleteEmployee(@PathVariable int id) throws EmployeeNotFoundException {
        LOGGER.info("START - deleteEmployee() with id: {}", id);
        employeeService.deleteEmployee(id);
        LOGGER.info("END - deleteEmployee()");
    }
}
