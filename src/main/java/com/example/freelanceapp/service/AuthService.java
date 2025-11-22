package com.example.freelanceapp.service;

import com.example.freelanceapp.dto.AuthResponse;
import com.example.freelanceapp.dto.LoginRequest;
import com.example.freelanceapp.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
