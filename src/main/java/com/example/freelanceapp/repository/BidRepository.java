package com.example.freelanceapp.repository;

import com.example.freelanceapp.model.Bid;
import com.example.freelanceapp.model.Project;
import com.example.freelanceapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByProject(Project project);
    List<Bid> findByFreelancer(User freelancer);
}
