package com.cognizant.ormlearn.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cognizant.ormlearn.model.Employee;
import com.cognizant.ormlearn.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public Employee get(int id) {

        Employee employee = employeeRepository.findById(id).get();

        employee.getSkillList().size();

        return employee;
    }

    @Transactional
    public void save(Employee employee) {
        employeeRepository.save(employee);
    }

    @Transactional
    public List<Employee> getPermanentEmployees() {
        return employeeRepository.getPermanentEmployees();
    }

    @Transactional
    public double getAverageSalary(int id) {
        return employeeRepository.getAverageSalary(id);
    }

    @Transactional
    public List<Employee> getAllEmployeesNative() {
        return employeeRepository.getAllEmployeesNative();
    }
}
