package com.example.freelanceapp.repository;

import com.example.freelanceapp.model.User;
import com.example.freelanceapp.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);
}
