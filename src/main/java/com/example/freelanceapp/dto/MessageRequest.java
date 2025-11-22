package com.example.freelanceapp.dto;

public class MessageRequest {

    private Long projectId;
    private Long receiverId;
    private String messageText;

    public MessageRequest() {
    }

    public MessageRequest(Long projectId, Long receiverId, String messageText) {
        this.projectId = projectId;
        this.receiverId = receiverId;
        this.messageText = messageText;
    }

    // Getters & Setters

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }
}
