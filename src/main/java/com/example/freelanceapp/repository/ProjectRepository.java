package com.example.freelanceapp.repository;

import com.example.freelanceapp.model.Project;
import com.example.freelanceapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByClient(User client);
}
