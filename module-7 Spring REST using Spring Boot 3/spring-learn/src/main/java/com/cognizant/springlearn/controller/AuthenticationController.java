package com.cognizant.springlearn.controller;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class AuthenticationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    @GetMapping("/authenticate")
    public Map<String, String> authenticate(@RequestHeader("Authorization") String authHeader) {
        LOGGER.info("START - authenticate()");
        LOGGER.debug("Authorization header: {}", authHeader);

        String user = getUser(authHeader);
        Map<String, String> response = new HashMap<>();
        response.put("token", generateJwt(user));

        LOGGER.info("END - authenticate()");
        return response;
    }

    private String getUser(String authHeader) {
        LOGGER.debug("Decoding auth header: {}", authHeader);
        String encodedCredentials = authHeader.substring("Basic ".length());
        byte[] decoded = Base64.getDecoder().decode(encodedCredentials);
        String credentials = new String(decoded);
        return credentials.substring(0, credentials.indexOf(':'));
    }

    private String generateJwt(String user) {
        JwtBuilder builder = Jwts.builder();
        builder.setSubject(user);
        builder.setIssuedAt(new Date());
        builder.setExpiration(new Date((new Date()).getTime() + 1200000));
        builder.signWith(SignatureAlgorithm.HS256, "secretkey");
        return builder.compact();
    }
}
