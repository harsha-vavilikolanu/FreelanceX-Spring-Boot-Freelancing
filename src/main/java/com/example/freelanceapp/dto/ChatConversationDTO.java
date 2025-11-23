package com.example.freelanceapp.dto;

public class ChatConversationDTO {

    private Long projectId;
    private String projectTitle;
    private Long otherUserId;
    private String otherUserName;
    private String lastMessage;

    public ChatConversationDTO() {
    }

    public ChatConversationDTO(Long projectId, String projectTitle, Long otherUserId, String otherUserName, String lastMessage) {
        this.projectId = projectId;
        this.projectTitle = projectTitle;
        this.otherUserId = otherUserId;
        this.otherUserName = otherUserName;
        this.lastMessage = lastMessage;
    }

    // Getters & Setters

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public Long getOtherUserId() {
        return otherUserId;
    }

    public void setOtherUserId(Long otherUserId) {
        this.otherUserId = otherUserId;
    }

    public String getOtherUserName() {
        return otherUserName;
    }

    public void setOtherUserName(String otherUserName) {
        this.otherUserName = otherUserName;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }
}