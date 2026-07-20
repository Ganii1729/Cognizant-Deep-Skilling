package com.example.gateway;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.route.RouteLocator;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ApiGatewayApplicationTests {

    @Autowired
    private RouteLocator routeLocator;

    @Test
    void contextLoads() {
    }

    @Test
    void gatewayShouldExposeConfiguredRoutes() {
        List<Route> routes = routeLocator.getRoutes().collectList().block();
        assertThat(routes).extracting(Route::getId)
                .contains("example_route", "load_balanced_route", "resilience_route");
    }
}
