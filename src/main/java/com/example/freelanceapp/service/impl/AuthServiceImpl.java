package com.example.freelanceapp.service.impl;

import com.example.freelanceapp.dto.AuthResponse;
import com.example.freelanceapp.dto.LoginRequest;
import com.example.freelanceapp.dto.RegisterRequest;
import com.example.freelanceapp.model.User;
import com.example.freelanceapp.repository.UserRepository;
import com.example.freelanceapp.security.CustomUserDetails;
import com.example.freelanceapp.security.JwtUtil;
import com.example.freelanceapp.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        User saved = userRepository.save(user);

        String token = jwtUtil.generateToken(saved.getEmail());

        return new AuthResponse(token, saved.getRole().name(), saved.getId(), saved.getFullName());
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        var authToken = new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        );

        var authenticated = authenticationManager.authenticate(authToken);
        CustomUserDetails userDetails = (CustomUserDetails) authenticated.getPrincipal();

        String token = jwtUtil.generateToken(userDetails.getUsername());

        return new AuthResponse(token,
                userDetails.getAuthorities().iterator().next().getAuthority(),
                userDetails.getId(),
                userDetails.getUsername());
    }
}
