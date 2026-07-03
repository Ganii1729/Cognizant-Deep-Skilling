package com.cognizant.ems.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cognizant.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByNameContainingIgnoreCase(String name);

    List<Employee> findByDepartmentId(Long departmentId);

    @Query("SELECT e FROM Employee e WHERE e.salary > :salary")
    List<Employee> getEmployeesWithSalaryGreaterThan(Double salary);

    Page<Employee> findAll(Pageable pageable);

    List<Employee> findByOrderBySalaryDesc();

    List<Employee> findByOrderByNameAsc();
}
