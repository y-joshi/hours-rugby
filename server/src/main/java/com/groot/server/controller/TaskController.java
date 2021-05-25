package com.groot.server.controller;

import com.groot.server.model.Subject;
import com.groot.server.model.User;
import com.groot.server.model.UserTask;
import com.groot.server.repository.SubjectRepository;
import com.groot.server.repository.UserRepository;
import com.groot.server.repository.UserTaskRepository;
import com.groot.server.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

@RestController
@RequestMapping("/api")
public class TaskController {
    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    UserTaskRepository userTaskRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/addSubject")
    public ResponseEntity<?> addSubject(
            @RequestHeader Map<String, String> requestHeader,
            @RequestBody Map<String, String> requestBody
    ) {
        User user = jwtUtils.getUserByToken(requestHeader.get("authorization").substring(7));
        Subject subject = new Subject(requestBody.get("subject"), user);
        subjectRepository.save(subject);

        Map<String, Object> response = new HashMap<>();
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/getTasks")
    public ResponseEntity<?> getTasks(@RequestHeader Long user_id) {
       // Set<UserTask> userTasks = userRepository.getOne(user_id).getUserTasks();
        return ResponseEntity.ok(null);
    }

    @PostMapping("/addTask")
    public  ResponseEntity<?> addTask(
            @RequestHeader Map<String, String> requestHeader,
            @RequestBody Map<String, String> requestBody
    ){
        User user = jwtUtils.getUserByToken(requestHeader.get("authorization").substring(7));
        Subject subject = new Subject(requestBody.get("subject"),user);
        UserTask userTask = new UserTask(
                user,
                subject,
                false,
                LocalDateTime.ofInstant(Instant.ofEpochMilli(Long.parseLong(requestBody.get("startedAt"))),
                        TimeZone.getDefault().toZoneId()),
                LocalDateTime.ofInstant(Instant.ofEpochMilli(Long.parseLong(requestBody.get("endedAt"))),
                        TimeZone.getDefault().toZoneId()),
                Long.parseLong(requestBody.get("time")),
                requestBody.get("name"),
                requestBody.get("description")
        );
        userTaskRepository.save(userTask);

        Map<String, Object> response = new HashMap<>();
        response.put("user", user);

        return ResponseEntity.ok(response);
    }
}
