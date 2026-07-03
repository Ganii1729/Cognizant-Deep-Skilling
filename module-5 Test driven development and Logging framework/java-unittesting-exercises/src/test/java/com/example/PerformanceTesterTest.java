package com.example;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTimeout;
import org.junit.jupiter.api.Test;

public class PerformanceTesterTest {

    @Test
    void testPerformTaskTimeout() {
        PerformanceTester pt = new PerformanceTester();

        assertTimeout(Duration.ofSeconds(2), () -> {
            pt.performTask();
        });
    }
}
