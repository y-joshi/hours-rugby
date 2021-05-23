package com.groot.server.controller;

import com.groot.server.model.Subject;
import com.groot.server.model.UserTask;
import com.groot.server.payload.SubjectRequest;
import com.groot.server.repository.SubjectRepository;
import com.groot.server.repository.UserRepository;
import com.groot.server.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class TaskController {
    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/addSubject")
    public ResponseEntity<?> addSubject(
            @RequestHeader Map<String, String> header,
            @RequestBody Map<String, String> body
    ) {
        Subject subject = new Subject(
                body.get("subject"),
                jwtUtils.getUserByToken(header.get("authorization").substring(7)));
        subjectRepository.save(subject);
        return ResponseEntity.ok("Subject Added");
    }

    @GetMapping("/getTasks")
    public ResponseEntity<?> getTasks(@RequestHeader Long user_id) {
        Set<UserTask> userTasks = userRepository.getOne(user_id).getUserTasks();
        return ResponseEntity.ok(userTasks);
    }
}
