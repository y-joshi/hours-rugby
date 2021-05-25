package com.groot.server.payload;

public class SubjectRequest {
    private String subject;
    private Long user_id;

    public SubjectRequest() {
    }

    public SubjectRequest(String subject, Long user_id) {
        this.subject = subject;
        this.user_id = user_id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}
