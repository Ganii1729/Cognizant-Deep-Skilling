package com.example.billing.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/billing")
public class BillingController {

    @GetMapping("/{id}")
    public Map<String, Object> getBillById(@PathVariable Long id) {
        return Map.of(
                "billId", id,
                "amount", id == 1L ? 250.00 : 750.00,
                "status", id == 1L ? "PAID" : "PENDING"
        );
    }

    @GetMapping
    public List<Map<String, Object>> getBills() {
        return List.of(
                Map.of("billId", 1L, "amount", 250.00, "status", "PAID"),
                Map.of("billId", 2L, "amount", 750.00, "status", "PENDING")
        );
    }
}
