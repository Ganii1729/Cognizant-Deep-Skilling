package com.cognizant.ems;

import java.util.Comparator;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.cognizant.ems.entity.Attempt;
import com.cognizant.ems.entity.AttemptOption;
import com.cognizant.ems.entity.Option;
import com.cognizant.ems.service.AttemptService;

@SpringBootApplication
public class EmployeemanagementsystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeemanagementsystemApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(AttemptService attemptService) {
        return args -> {
            int userId = 1;
            int attemptId = 1;
            Attempt attempt = attemptService.getAttempt(userId, attemptId);

            if (attempt == null) {
                System.out.println("No attempt found for user " + userId + " and attempt " + attemptId);
                return;
            }

            System.out.println("Username: " + attempt.getUser().getUsername());
            System.out.println("Attempted Date: " + attempt.getAttemptedDate());
            System.out.println();

            attempt.getAttemptQuestions().stream()
                    .sorted(Comparator.comparing(aq -> aq.getQuestion().getId()))
                    .forEach(aq -> {
                        System.out.println(aq.getQuestion().getText());
                        List<Option> options = aq.getQuestion().getOptions().stream().toList();
                        List<AttemptOption> selectedOptions = aq.getAttemptOptions().stream().filter(AttemptOption::isSelected).toList();

                        for (int i = 0; i < options.size(); i++) {
                            Option option = options.get(i);
                            boolean selected = selectedOptions.stream().anyMatch(ao -> ao.getOption().getId().equals(option.getId()));
                            String answer = selected ? "true" : "false";
                            System.out.printf(" %d) %s       %.1f     %s%n", i + 1, option.getText(), aq.getQuestion().getScore(), answer);
                        }
                        System.out.println();
                    });
        };
    }
}
