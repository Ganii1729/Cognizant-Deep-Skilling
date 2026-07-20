package com.example.inventory.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Value("${app.message:Default Inventory Message (Config Server not running)}")
    private String configMessage;

    @GetMapping("/message")
    public String getConfigMessage() {
        return configMessage;
    }

    @GetMapping("/{productId}")
    public Map<String, Object> getStockByProductId(@PathVariable Long productId) {
        int stock = productId == 101L ? 50 : (productId == 102L ? 150 : 0);
        return Map.of(
                "productId", productId,
                "inStock", stock > 0,
                "quantity", stock
        );
    }
}
