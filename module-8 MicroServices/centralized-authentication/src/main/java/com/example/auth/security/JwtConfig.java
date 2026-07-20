package com.example.auth.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Value("${spring.security.jwt.secret:demo-secret-key-for-centralized-authentication-123456}")
    private String secret;

    public String getSecret() {
        return secret;
    }
}
