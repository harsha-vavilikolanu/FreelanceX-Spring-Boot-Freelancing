package com.example.freelanceapp.service;

import com.example.freelanceapp.dto.MessageRequest;
import com.example.freelanceapp.model.Message;
import com.example.freelanceapp.model.Project;
import com.example.freelanceapp.model.User;
import com.example.freelanceapp.repository.MessageRepository;
import com.example.freelanceapp.repository.ProjectRepository;
import com.example.freelanceapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepo;
    private final UserRepository userRepo;
    private final ProjectRepository projectRepo;

    public MessageService(MessageRepository messageRepo,
                          UserRepository userRepo,
                          ProjectRepository projectRepo) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
        this.projectRepo = projectRepo;
    }

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

    public List<Message> getMessages(Long projectId) {
        return messageRepo.findByProjectIdOrderByTimestampAsc(projectId);
    }
}
