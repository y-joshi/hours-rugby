package com.groot.server.controller;

import com.groot.server.model.User;
import com.groot.server.payload.JwtResponse;
import com.groot.server.payload.MessageResponse;
import com.groot.server.payload.SigninRequest;
import com.groot.server.payload.SignupRequest;
import com.groot.server.repository.UserRepository;
import com.groot.server.service.UserDetailsService;
import com.groot.server.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/auth")
    public ResponseEntity<?> auth(@RequestHeader("Authorization") String requestHeader) {
        String jwt = requestHeader.substring(7);
        Map<String, Object> response = new HashMap<>();
        response.put("user", jwtUtils.getUserByToken(jwt));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody SigninRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );

        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect Username or Password!!", e);
        }
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        Map<String, Object> response = new HashMap<>();
        response.put("jwt", new JwtResponse(jwtUtils.generateToken(userDetails)));
        response.put("user", userRepository.findGrootUser(authenticationRequest.getUsername()));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        boolean badRequest = false;
        Map<String, String> response = new HashMap<>();
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            badRequest = true;
            response.put("username", "Username is already taken!");
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            badRequest = true;
            response.put("email", "Email is already in use!");
        }
        if (badRequest) {
            System.out.println(response);
            return ResponseEntity.badRequest().body(response);
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getName(),
                passwordEncoder.encode(signUpRequest.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse());
    }

}
