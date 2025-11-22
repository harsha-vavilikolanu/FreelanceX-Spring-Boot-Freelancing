package com.example.freelanceapp.service;

import com.example.freelanceapp.dto.ProjectRequest;
import com.example.freelanceapp.dto.ProjectResponse;

import java.util.List;

public interface ProjectService {
    ProjectResponse createProject(ProjectRequest request, String clientEmail);
    List<ProjectResponse> getAllProjects();
    List<ProjectResponse> getProjectsForClient(String clientEmail);
}
