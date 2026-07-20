package com.example.customer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @GetMapping("/{id}")
    public Map<String, Object> getCustomerById(@PathVariable Long id) {
        return Map.of(
                "id", id,
                "name", id == 1L ? "John Doe" : "Jane Smith",
                "email", id == 1L ? "john@example.com" : "jane@example.com"
        );
    }

    @GetMapping
    public List<Map<String, Object>> getCustomers() {
        return List.of(
                Map.of("id", 1L, "name", "John Doe"),
                Map.of("id", 2L, "name", "Jane Smith")
        );
    }
}
