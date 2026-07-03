package com.cognizant.ems.service;

import org.springframework.stereotype.Service;

import com.cognizant.ems.entity.Attempt;
import com.cognizant.ems.repository.AttemptRepository;

@Service
public class AttemptService {

    private final AttemptRepository repository;

    public AttemptService(AttemptRepository repository) {
        this.repository = repository;
    }

    public Attempt getAttempt(int userId, int attemptId) {
        return repository.getAttempt(userId, attemptId);
    }
}
