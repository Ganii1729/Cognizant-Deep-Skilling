package com.cognizant.springlearn.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Employee {

    @NotNull(message = "Employee id should not be null")
    private Integer id;

    @NotNull(message = "Employee name should not be null")
    @NotBlank(message = "Employee name should not be blank")
    @Size(min = 1, max = 30, message = "Employee name should be between 1 and 30 characters")
    private String name;

    @NotNull(message = "Employee salary should not be null")
    @Min(value = 0, message = "Employee salary should be zero or above")
    private Double salary;

    @NotNull(message = "Employee permanent should not be null")
    private Boolean permanent;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private String dateOfBirth;

    @NotNull(message = "Employee department should not be null")
    @Valid
    private Department department;

    @NotNull(message = "Employee skills should not be null")
    private List<@Valid Skill> skills;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    @Override
    public String toString() {
        return "Employee [id=" + id + ", name=" + name + ", salary=" + salary
                + ", department=" + department + ", skills=" + skills + "]";
    }
}
