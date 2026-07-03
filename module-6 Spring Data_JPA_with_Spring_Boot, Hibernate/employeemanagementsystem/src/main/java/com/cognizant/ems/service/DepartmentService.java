package com.cognizant.ems.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cognizant.ems.entity.Department;
import com.cognizant.ems.repository.DepartmentRepository;

@Service
public class DepartmentService {

    private final DepartmentRepository repository;

    public DepartmentService(DepartmentRepository repository) {
        this.repository = repository;
    }

    public List<Department> getAllDepartments() {
        return repository.findAll();
    }

    public Optional<Department> getDepartment(Long id) {
        return repository.findById(id);
    }

    public Department saveDepartment(Department department) {
        return repository.save(department);
    }

    public Department updateDepartment(Long id, Department department) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(department.getName());
                    return repository.save(existing);
                })
                .orElseThrow(() -> new IllegalArgumentException("Department not found with id " + id));
    }

    public void deleteDepartment(Long id) {
        repository.deleteById(id);
    }
}
