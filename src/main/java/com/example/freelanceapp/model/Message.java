package com.example.freelanceapp.model;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(length = 2000)
    private String messageText;

    private Instant timestamp;

    public Message() {
    }

    public Message(Long id,
                   User sender,
                   User receiver,
                   Project project,
                   String messageText,
                   Instant timestamp) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.project = project;
        this.messageText = messageText;
        this.timestamp = timestamp;
    }

    @PrePersist
    public void prePersist() {
        if (timestamp == null) {
            timestamp = Instant.now();
        }
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", messageText='" + messageText + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
