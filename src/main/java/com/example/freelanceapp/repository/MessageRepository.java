package com.example.freelanceapp.repository;

import com.example.freelanceapp.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    // Old method (Group Chat style) - Keeping for backward compatibility if needed
    List<Message> findByProjectIdOrderByTimestampAsc(Long projectId);

    // Fetch all messages for a specific user (sent or received) to build the "Inbox" list
    @Query("SELECT m FROM Message m WHERE m.sender.id = :userId OR m.receiver.id = :userId ORDER BY m.timestamp DESC")
    List<Message> findMessagesByUser(@Param("userId") Long userId);

    // Fetch private conversation between two users within a specific project
    @Query("SELECT m FROM Message m WHERE m.project.id = :projectId AND " +
           "((m.sender.id = :user1Id AND m.receiver.id = :user2Id) OR " +
           "(m.sender.id = :user2Id AND m.receiver.id = :user1Id)) " +
           "ORDER BY m.timestamp ASC")
    List<Message> findConversation(@Param("projectId") Long projectId, 
                                   @Param("user1Id") Long user1Id, 
                                   @Param("user2Id") Long user2Id);
}