package com.example.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class CustomCacheGatewayFilterFactory extends AbstractGatewayFilterFactory<CustomCacheGatewayFilterFactory.Config> {

    private final Map<String, String> cache = new ConcurrentHashMap<>();

    public CustomCacheGatewayFilterFactory() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getURI().getPath();
            System.out.println("Checking cache for path: " + path);
            return chain.filter(exchange);
        };
    }

    public static class Config {
    }
}
