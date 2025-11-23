package com.example.freelanceapp.dto;

import java.time.Instant;

public class MessageDTO {

    private Long id;
    private String messageText;
    private Long senderId;
    private String senderName;
    private Long receiverId;
    private String receiverName;
    private Long projectId;
    private Instant timestamp;

    public MessageDTO() {
    }

    public MessageDTO(Long id, String messageText, Long senderId, String senderName, 
                      Long receiverId, String receiverName, Long projectId, Instant timestamp) {
        this.id = id;
        this.messageText = messageText;
        this.senderId = senderId;
        this.senderName = senderName;
        this.receiverId = receiverId;
        this.receiverName = receiverName;
        this.projectId = projectId;
        this.timestamp = timestamp;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMessageText() { return messageText; }
    public void setMessageText(String messageText) { this.messageText = messageText; }

    public Long getSenderId() { return senderId; }
    public void setSenderId(Long senderId) { this.senderId = senderId; }

    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }

    public Long getReceiverId() { return receiverId; }
    public void setReceiverId(Long receiverId) { this.receiverId = receiverId; }

    public String getReceiverName() { return receiverName; }
    public void setReceiverName(String receiverName) { this.receiverName = receiverName; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}