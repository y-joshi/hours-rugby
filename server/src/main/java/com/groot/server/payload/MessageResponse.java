package com.groot.server.payload;

import java.util.ArrayList;
import java.util.Map;

public class MessageResponse {
    private Map<String, String> messages;

    public MessageResponse() {
    }

    public MessageResponse(Map<String, String> messages) {
        this.messages = messages;
    }

    public Map<String, String> getMessages() {
        return messages;
    }

    public void setMessages(Map<String, String> messages) {
        this.messages = messages;
    }

    public void addMessage(String key, String value) {
        this.messages.put(key, value);
    }
}