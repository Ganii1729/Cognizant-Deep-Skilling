package com.cognizant.ems.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.cognizant.ems.entity.Employee;
import com.cognizant.ems.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Optional<Employee> getEmployee(Long id) {
        return repository.findById(id);
    }

    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employee) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(employee.getName());
                    existing.setEmail(employee.getEmail());
                    existing.setSalary(employee.getSalary());
                    existing.setDepartment(employee.getDepartment());
                    return repository.save(existing);
                })
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with id " + id));
    }

    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }

    public List<Employee> search(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    public List<Employee> salaryGreaterThan(Double salary) {
        return repository.getEmployeesWithSalaryGreaterThan(salary);
    }

    public Page<Employee> getEmployees(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    public List<Employee> sortBySalary() {
        return repository.findByOrderBySalaryDesc();
    }

    public List<Employee> sortByName() {
        return repository.findByOrderByNameAsc();
    }
}
