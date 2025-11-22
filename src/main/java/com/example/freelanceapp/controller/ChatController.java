package com.example.freelanceapp.controller;

import com.example.freelanceapp.dto.MessageRequest;
import com.example.freelanceapp.model.Message;
import com.example.freelanceapp.service.ChatService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/send")
    public Message sendMessage(@RequestBody MessageRequest request,
                               Authentication auth) {
        String email = auth.getName();  // logged-in user
        return chatService.sendMessage(request, email);
    }

    @GetMapping("/project/{projectId}")
    public List<Message> getMessages(@PathVariable Long projectId) {
        return chatService.getMessagesForProject(projectId);
    }
}
