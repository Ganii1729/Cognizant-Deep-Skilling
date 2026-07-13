package com.cognizant.springlearn;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.cognizant.springlearn.controller.CountryController;

@SpringBootTest
@AutoConfigureMockMvc // Configures the MockMvc instance dynamically
class SpringLearnApplicationTests {

    @Autowired
    private CountryController countryController;

    @Autowired
    private MockMvc mvc;

    @Test
    void contextLoads() {
        // Test if the CountryController is correctly loaded into the ApplicationContext
        assertNotNull(countryController);
    }

    @Test
    public void testGetCountry() throws Exception {
        ResultActions actions = mvc.perform(get("/country"));

        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.code").exists())
                .andExpect(jsonPath("$.code").value("IN"))
                .andExpect(jsonPath("$.name").exists())
                .andExpect(jsonPath("$.name").value("India"));
    }

    @Test
    public void testUpdateEmployeeWithInvalidNumberFormatReturnsBadRequest() throws Exception {
        String payload = "{\"id\":\"not-a-number\",\"name\":\"John\",\"salary\":50000,\"permanent\":true,\"dateOfBirth\":\"01/01/2000\",\"department\":{\"id\":1,\"name\":\"Tech\"},\"skills\":[{\"id\":1,\"name\":\"Java\"}]}";

        mvc.perform(put("/employees")
                .contentType("application/json")
                .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Incorrect format for field 'id'"));
    }
}
