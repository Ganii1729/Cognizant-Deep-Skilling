package com.example.product.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Value("${app.message:Default Product Message (Config Server not running)}")
    private String configMessage;

    @GetMapping("/message")
    public String getConfigMessage() {
        return configMessage;
    }

    @GetMapping
    public List<Map<String, Object>> getProducts() {
        return List.of(
                Map.of("id", 101L, "name", "Laptop", "price", 999.99),
                Map.of("id", 102L, "name", "Smartphone", "price", 499.99)
        );
    }
}
