package com.groot.server.service;

import com.groot.server.model.Subject;
import com.groot.server.model.User;
import com.groot.server.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubjectService {
    @Autowired
    SubjectRepository subjectRepository;

}
