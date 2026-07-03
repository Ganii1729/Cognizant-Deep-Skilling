package com.example;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(()
                        -> new NoSuchElementException("User not found"));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
