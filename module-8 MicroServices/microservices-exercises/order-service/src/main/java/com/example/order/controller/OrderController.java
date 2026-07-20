package com.example.order.controller;

import com.example.order.client.UserClient;
import com.example.order.model.Order;
import com.example.order.model.UserDto;
import com.example.order.repository.OrderRepository;
import feign.FeignException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final UserClient userClient;

    public OrderController(OrderRepository orderRepository, UserClient userClient) {
        this.orderRepository = orderRepository;
        this.userClient = userClient;
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody Order order) {
        try {
            UserDto user = userClient.getUserById(order.getUserId());
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found!");
            }
            return ResponseEntity.ok(orderRepository.save(order));
        } catch (FeignException.NotFound e) {
            return ResponseEntity.badRequest().body("User service returned 404: User not found!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error validating user: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
