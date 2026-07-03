package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ServiceTest {

    @Test
    void testServiceWithMockRepository() {

        // Create mock repository
        Repository mockRepository = mock(Repository.class);

        // Stub method
        when(mockRepository.getData()).thenReturn("Mock Data");

        // Inject mock
        Service service = new Service(mockRepository);

        // Call method
        String result = service.processData();

        // Verify result
        assertEquals("Processed Mock Data", result);
    }
}
