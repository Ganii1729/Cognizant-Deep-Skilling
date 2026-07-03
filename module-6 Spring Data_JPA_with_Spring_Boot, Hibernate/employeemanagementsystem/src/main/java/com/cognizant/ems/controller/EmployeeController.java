package com.cognizant.ems.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.cognizant.ems.entity.Employee;
import com.cognizant.ems.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Employee> getAll() {
        return service.getAllEmployees();
    }

    @GetMapping("/{id}")
    public Employee get(@PathVariable Long id) {
        return service.getEmployee(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
    }

    @PostMapping
    public Employee save(@Valid @RequestBody Employee employee) {
        return service.saveEmployee(employee);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id, @Valid @RequestBody Employee employee) {
        try {
            return service.updateEmployee(id, employee);
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteEmployee(id);
    }

    @GetMapping("/search")
    public List<Employee> search(@RequestParam String name) {
        return service.search(name);
    }

    @GetMapping("/salary")
    public List<Employee> salary(@RequestParam Double amount) {
        return service.salaryGreaterThan(amount);
    }

    @GetMapping("/page")
    public Page<Employee> page(@RequestParam int page,
            @RequestParam int size) {
        return service.getEmployees(page, size);
    }

    @GetMapping("/sort/name")
    public List<Employee> sortByName() {
        return service.sortByName();
    }

    @GetMapping("/sort/salary")
    public List<Employee> sortBySalary() {
        return service.sortBySalary();
    }
}
