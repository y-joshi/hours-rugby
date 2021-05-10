package com.groot.server.service;

import com.groot.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.groot.server.model.User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found : " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), new ArrayList<>());
    }
}
