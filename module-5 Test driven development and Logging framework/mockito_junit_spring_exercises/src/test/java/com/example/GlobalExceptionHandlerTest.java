package com.example;

import java.util.NoSuchElementException;

import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class GlobalExceptionHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void testUserNotFoundException() throws Exception {

        when(userService.getUserById(99L))
                .thenThrow(
                        new NoSuchElementException(
                                "User not found"));

        mockMvc.perform(get("/users/99"))
                .andDo(result
                        -> System.out.println(
                        "Response = "
                        + result.getResponse()
                                .getContentAsString()))
                .andExpect(status().isNotFound())
                .andExpect(content()
                        .string("User not found"));
    }
}
