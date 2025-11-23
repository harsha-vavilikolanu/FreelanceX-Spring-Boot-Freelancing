package com.example.freelanceapp.service.impl;

import com.example.freelanceapp.dto.ChatConversationDTO;
import com.example.freelanceapp.dto.MessageRequest;
import com.example.freelanceapp.model.Message;
import com.example.freelanceapp.model.Project;
import com.example.freelanceapp.model.User;
import com.example.freelanceapp.repository.MessageRepository;
import com.example.freelanceapp.repository.ProjectRepository;
import com.example.freelanceapp.repository.UserRepository;
import com.example.freelanceapp.service.ChatService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class ChatServiceImpl implements ChatService {

    private final MessageRepository messageRepo;
    private final UserRepository userRepo;
    private final ProjectRepository projectRepo;

    public ChatServiceImpl(MessageRepository messageRepo,
                           UserRepository userRepo,
                           ProjectRepository projectRepo) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
        this.projectRepo = projectRepo;
    }

    @Override
    public Message sendMessage(MessageRequest req, String senderEmail) {
        User sender = userRepo.findByEmail(senderEmail)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        User receiver = userRepo.findById(req.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Project project = projectRepo.findById(req.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Message msg = new Message();
        msg.setSender(sender);
        msg.setReceiver(receiver);
        msg.setProject(project);
        msg.setMessageText(req.getMessageText());
        msg.setTimestamp(Instant.now());

        return messageRepo.save(msg);
    }

    @Override
    public List<Message> getConversation(Long projectId, Long user1Id, Long user2Id) {
        return messageRepo.findConversation(projectId, user1Id, user2Id);
    }

    @Override
    public List<ChatConversationDTO> getUserConversations(String userEmail) {
        User currentUser = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Message> allMessages = messageRepo.findMessagesByUser(currentUser.getId());

        // Use a map to keep only unique conversations (Project + Other User)
        // Key: "projectId-otherUserId"
        Map<String, ChatConversationDTO> conversationMap = new LinkedHashMap<>();

        for (Message m : allMessages) {
            User otherUser = m.getSender().getId().equals(currentUser.getId()) ? m.getReceiver() : m.getSender();
            Long projectId = m.getProject().getId();
            
            String key = projectId + "-" + otherUser.getId();

            if (!conversationMap.containsKey(key)) {
                ChatConversationDTO dto = new ChatConversationDTO(
                        projectId,
                        m.getProject().getTitle(),
                        otherUser.getId(),
                        otherUser.getFullName(),
                        m.getMessageText() // Since we ordered by DESC, the first one encountered is the latest
                );
                conversationMap.put(key, dto);
            }
        }

        return new ArrayList<>(conversationMap.values());
    }
}