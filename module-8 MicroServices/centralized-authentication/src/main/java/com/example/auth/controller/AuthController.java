package com.example.auth.controller;

import com.example.auth.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/")
    public String home() {
        return "Centralized Authentication Service";
    }

    @GetMapping("/public")
    public String publicEndpoint() {
        return "This endpoint is public";
    }

    @PostMapping("/auth/token")
    public ResponseEntity<Map<String, String>> token(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        if (username == null || username.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "username is required"));
        }
        return ResponseEntity.ok(Map.of("token", jwtTokenProvider.createToken(username)));
    }

    @GetMapping("/user")
    public Map<String, Object> user(Authentication authentication) {
        return Map.of("username", authentication.getName());
    }

    @GetMapping("/secure")
    public String secure() {
        return "This is a secure endpoint";
    }

    @GetMapping("/api/secure")
    public String apiSecure() {
        return "This is an API secure endpoint";
    }
}
