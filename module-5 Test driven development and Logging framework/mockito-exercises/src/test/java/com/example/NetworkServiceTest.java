package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class NetworkServiceTest {

    @Test
    void testServiceWithMockNetworkClient() {

        NetworkClient mockNetworkClient = mock(NetworkClient.class);

        when(mockNetworkClient.connect())
                .thenReturn("Mock Connection");

        NetworkService networkService
                = new NetworkService(mockNetworkClient);

        String result = networkService.connectToServer();

        System.out.println("Network Result = " + result);

        assertEquals("Connected to Mock Connection", result);
    }
}
