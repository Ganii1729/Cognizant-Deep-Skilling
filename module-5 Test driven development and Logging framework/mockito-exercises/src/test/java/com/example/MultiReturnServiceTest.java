package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class MultiReturnServiceTest {

    @Test
    void testServiceWithMultipleReturnValues() {

        Repository mockRepository = mock(Repository.class);

        when(mockRepository.getData())
                .thenReturn("First Mock Data")
                .thenReturn("Second Mock Data");

        Service service = new Service(mockRepository);

        String firstResult = service.processData();
        String secondResult = service.processData();

        System.out.println("First Result = " + firstResult);
        System.out.println("Second Result = " + secondResult);

        assertEquals(
                "Processed First Mock Data",
                firstResult
        );

        assertEquals(
                "Processed Second Mock Data",
                secondResult
        );
    }
}
