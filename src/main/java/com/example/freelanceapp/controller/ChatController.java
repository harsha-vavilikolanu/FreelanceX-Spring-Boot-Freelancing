package com.example.freelanceapp.controller;

import com.example.freelanceapp.dto.ChatConversationDTO;
import com.example.freelanceapp.dto.MessageDTO;
import com.example.freelanceapp.dto.MessageRequest;
import com.example.freelanceapp.model.Message;
import com.example.freelanceapp.model.User;
import com.example.freelanceapp.repository.UserRepository;
import com.example.freelanceapp.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chat")
@CrossOrigin
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepo;

    public ChatController(ChatService chatService, 
                          SimpMessagingTemplate messagingTemplate,
                          UserRepository userRepo) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
        this.userRepo = userRepo;
    }

    // WebSocket: Send Message
    @MessageMapping("/sendMessage")
    public void receiveMessage(@Payload MessageRequest request, Principal principal) {
        String email = principal.getName();
        Message saved = chatService.sendMessage(request, email);
        MessageDTO dto = convertToDTO(saved);

        // Broadcast to project room
        messagingTemplate.convertAndSend("/topic/project/" + request.getProjectId(), dto);
    }

    // REST: Send Message
    @PostMapping("/send")
    public MessageDTO sendMessageRest(@RequestBody MessageRequest request,
                                      Authentication auth) {
        String email = auth.getName();
        Message saved = chatService.sendMessage(request, email);
        MessageDTO dto = convertToDTO(saved);
        
        messagingTemplate.convertAndSend("/topic/project/" + request.getProjectId(), dto);
        return dto;
    }

    // REST: Get My Conversations
    @GetMapping("/conversations")
    public List<ChatConversationDTO> getMyConversations(Authentication auth) {
        return chatService.getUserConversations(auth.getName());
    }

    // REST: Get History (Now returns DTOs to prevent recursion)
    @GetMapping("/history/{projectId}/{otherUserId}")
    public List<MessageDTO> getConversationHistory(@PathVariable Long projectId,
                                                   @PathVariable Long otherUserId,
                                                   Authentication auth) {
        String email = auth.getName();
        User currentUser = userRepo.findByEmail(email).orElseThrow();
        
        List<Message> messages = chatService.getConversation(projectId, currentUser.getId(), otherUserId);
        
        return messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private MessageDTO convertToDTO(Message msg) {
        return new MessageDTO(
                msg.getId(),
                msg.getMessageText(),
                msg.getSender().getId(),
                msg.getSender().getFullName(),
                msg.getReceiver().getId(),
                msg.getReceiver().getFullName(),
                msg.getProject().getId(),
                msg.getTimestamp()
        );
    }
}