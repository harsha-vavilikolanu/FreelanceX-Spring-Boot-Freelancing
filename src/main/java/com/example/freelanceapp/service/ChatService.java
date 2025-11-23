package com.example.freelanceapp.service;

import com.example.freelanceapp.dto.ChatConversationDTO;
import com.example.freelanceapp.dto.MessageRequest;
import com.example.freelanceapp.model.Message;

import java.util.List;

public interface ChatService {
    Message sendMessage(MessageRequest request, String senderEmail);
    
    // Updated to support private chats
    List<Message> getConversation(Long projectId, Long user1Id, Long user2Id);
    
    // New method to get list of active chats
    List<ChatConversationDTO> getUserConversations(String userEmail);
}