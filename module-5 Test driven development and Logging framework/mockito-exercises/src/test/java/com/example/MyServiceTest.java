package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.InOrder;
import org.mockito.Mockito;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class MyServiceTest {

    @Test
    void testExternalApi() {

        // Create mock object
        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        // Stub method
        when(mockApi.getData()).thenReturn("Mock Data");

        // Inject mock into service
        MyService service = new MyService(mockApi);

        // Call method
        String result = service.fetchData();

        // Verify result
        assertEquals("Mock Data", result);
    }

    @Test
    void testVerifyInteraction() {

        // Create mock object
        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        // Create service
        MyService service = new MyService(mockApi);

        // Call method
        service.fetchData();

        // Verify interaction
        Mockito.verify(mockApi).getData();
    }

    @Test
    void testArgumentMatching() {

        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        when(mockApi.getDataById(anyString()))
                .thenReturn("User Data");

        MyService service = new MyService(mockApi);

        service.fetchDataById("101");

        verify(mockApi).getDataById(eq("101"));
    }

    @Test
    void testVoidMethod() {

        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        // Stub void method
        doNothing().when(mockApi).sendData("Hello");

        MyService service = new MyService(mockApi);

        // Call method
        service.submitData("Hello");

        // Verify interaction
        verify(mockApi).sendData("Hello");
    }

    @Test
    void testMultipleReturns() {

        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        when(mockApi.getData())
                .thenReturn("First Call")
                .thenReturn("Second Call")
                .thenReturn("Third Call");

        MyService service = new MyService(mockApi);

        assertEquals("First Call", service.fetchData());
        assertEquals("Second Call", service.fetchData());
        assertEquals("Third Call", service.fetchData());
    }

    @Test
    void testInteractionOrder() {

        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        MyService service = new MyService(mockApi);

        service.fetchData();
        service.fetchDataById("101");

        InOrder inOrder = inOrder(mockApi);

        inOrder.verify(mockApi).getData();
        inOrder.verify(mockApi).getDataById("101");
    }

    @Test
    void testVoidMethodWithException() {

        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        doThrow(new RuntimeException("Error"))
                .when(mockApi)
                .sendData("Hello");

        MyService service = new MyService(mockApi);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.submitData("Hello")
        );

        assertEquals("Error", exception.getMessage());
    }
}
