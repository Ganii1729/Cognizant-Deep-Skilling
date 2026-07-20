package com.example.payment.controller;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @GetMapping("/process")
    @CircuitBreaker(name = "paymentCircuitBreaker", fallbackMethod = "processPaymentFallback")
    public ResponseEntity<Map<String, Object>> processPayment(@RequestParam Double amount) {
        logger.info("Initiating payment processing for amount: {}", amount);

        // Simulate third-party latency or failures
        if (amount > 1000.00) {
            throw new RuntimeException("Third-party gateway timeout occurred for high-value transactions!");
        }

        return ResponseEntity.ok(Map.of(
                "status", "SUCCESS",
                "amount", amount,
                "transactionId", "TXN-" + System.currentTimeMillis()
        ));
    }

    public ResponseEntity<Map<String, Object>> processPaymentFallback(Double amount, Throwable t) {
        logger.warn("Circuit Breaker Fallback triggered for payment amount: {}. Cause: {}", amount, t.getMessage());

        return ResponseEntity.ok(Map.of(
                "status", "OFFLINE_FALLBACK",
                "amount", amount,
                "message", "Payment processing is currently degraded. Processed offline/queued.",
                "error", t.getMessage()
        ));
    }
}
