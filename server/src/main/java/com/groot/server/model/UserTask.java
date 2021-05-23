package com.groot.server.model;

import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_tasks")
public class UserTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    Subject subject;

    @Column(name = "is_active")
    boolean isActive;

    @Column(name = "started_at")
    LocalDateTime startedAt;

    @Column(name = "end_at")
    LocalDateTime endedAt;

    @Column(name = "time")
    Long time;

    @Column(name = "task_name")
    @Size(max = 50)
    String taskName;

    @Column(name = "task_desc")
    @Size(max = 50)
    String taskDescription;

    public UserTask() {
    }

    public UserTask(User user, Subject subject, boolean isActive, LocalDateTime startedAt, LocalDateTime endedAt, Long time, String taskName, String taskDescription) {
        this.user = user;
        this.subject = subject;
        this.isActive = isActive;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.time = time;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(LocalDateTime endedAt) {
        this.endedAt = endedAt;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }
}
