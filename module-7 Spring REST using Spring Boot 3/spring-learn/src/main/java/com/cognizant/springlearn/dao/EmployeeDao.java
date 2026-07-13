package com.cognizant.springlearn.dao;

import java.util.ArrayList;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Repository;

import com.cognizant.springlearn.exception.EmployeeNotFoundException;
import com.cognizant.springlearn.model.Employee;

@Repository
public class EmployeeDao {

    private static ArrayList<Employee> EMPLOYEE_LIST = new ArrayList<>();

    @SuppressWarnings({"unchecked", "resource"})
    public EmployeeDao() {
        ApplicationContext context = new ClassPathXmlApplicationContext("employee.xml");
        EMPLOYEE_LIST = context.getBean("employeeList", ArrayList.class);
    }

    public ArrayList<Employee> getAllEmployees() {
        return EMPLOYEE_LIST;
    }

    public Employee updateEmployee(Employee employee) throws EmployeeNotFoundException {
        for (int i = 0; i < EMPLOYEE_LIST.size(); i++) {
            Employee existing = EMPLOYEE_LIST.get(i);
            if (existing.getId() == employee.getId()) {
                EMPLOYEE_LIST.set(i, employee);
                return employee;
            }
        }
        throw new EmployeeNotFoundException();
    }

    public void deleteEmployee(int id) throws EmployeeNotFoundException {
        for (int i = 0; i < EMPLOYEE_LIST.size(); i++) {
            if (EMPLOYEE_LIST.get(i).getId() == id) {
                EMPLOYEE_LIST.remove(i);
                return;
            }
        }
        throw new EmployeeNotFoundException();
    }
}
