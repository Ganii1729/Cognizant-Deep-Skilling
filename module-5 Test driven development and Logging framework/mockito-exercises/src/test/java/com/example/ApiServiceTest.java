package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ApiServiceTest {

    @Test
    void testServiceWithMockRestClient() {

        // Create mock REST client
        RestClient mockRestClient = mock(RestClient.class);

        // Stub method
        when(mockRestClient.getResponse())
                .thenReturn("Mock Response");

        // Inject mock
        ApiService apiService = new ApiService(mockRestClient);

        // Call method
        String result = apiService.fetchData();

        // Verify result
        assertEquals("Fetched Mock Response", result);
    }
}
