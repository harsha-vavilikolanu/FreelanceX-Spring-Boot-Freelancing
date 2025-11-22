package com.example.freelanceapp.service;

import com.example.freelanceapp.dto.MessageRequest;
import com.example.freelanceapp.model.Message;

import java.util.List;

public interface ChatService {
    Message sendMessage(MessageRequest request, String senderEmail);
    List<Message> getMessagesForProject(Long projectId);
}
