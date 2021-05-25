package com.groot.server.service;

import com.groot.server.model.User;
import com.groot.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public Optional<User> findByUsername(String username) {
        return  null;
    }

}
