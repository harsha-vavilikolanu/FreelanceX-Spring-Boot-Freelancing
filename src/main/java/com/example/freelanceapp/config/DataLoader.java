package com.example.freelanceapp.config;

import com.example.freelanceapp.model.Role;
import com.example.freelanceapp.model.User;
import com.example.freelanceapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(UserRepository userRepository,
                               PasswordEncoder passwordEncoder) {
        return args -> {

            if (userRepository.count() > 0) {
                // Don’t insert again if data already exists
                return;
            }

            User client = new User(
                    null,
                    "Client One",
                    "client1@example.com",
                    passwordEncoder.encode("123456"),
                    Role.CLIENT,
                    Instant.now()
            );

            User freelancer = new User(
                    null,
                    "Freelancer One",
                    "freelancer1@example.com",
                    passwordEncoder.encode("123456"),
                    Role.FREELANCER,
                    Instant.now()
            );

            User admin = new User(
                    null,
                    "Admin User",
                    "admin@example.com",
                    passwordEncoder.encode("admin123"),
                    Role.ADMIN,
                    Instant.now()
            );

            userRepository.save(client);
            userRepository.save(freelancer);
            userRepository.save(admin);

            System.out.println("✅ Sample users inserted into DB");
        };
    }
}
