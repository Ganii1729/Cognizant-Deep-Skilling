package com.cognizant.ormlearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cognizant.ormlearn.model.Employee;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query("""
    SELECT DISTINCT e
    FROM Employee e
    LEFT JOIN FETCH e.department
    LEFT JOIN FETCH e.skillList
    WHERE e.permanent = true
    """)
    List<Employee> getPermanentEmployees();

    @Query("SELECT AVG(e.salary) FROM Employee e WHERE e.department.id = :id")
    double getAverageSalary(@Param("id") int id);

    @Query(value = "SELECT * FROM employee", nativeQuery = true)
    List<Employee> getAllEmployeesNative();
}
