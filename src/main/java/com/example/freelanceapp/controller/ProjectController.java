package com.example.freelanceapp.controller;

import com.example.freelanceapp.dto.ProjectRequest;
import com.example.freelanceapp.dto.ProjectResponse;
import com.example.freelanceapp.model.Role;
import com.example.freelanceapp.service.ProjectService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@CrossOrigin
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // Client: create project
    @PostMapping
    public ProjectResponse createProject(@RequestBody ProjectRequest request,
                                         Authentication auth) {
        // Only CLIENT should call this in frontend (you can also enforce via method security)
        String email = auth.getName();
        return projectService.createProject(request, email);
    }

    // Freelancer: view all projects
    @GetMapping
    public List<ProjectResponse> getAllProjects() {
        return projectService.getAllProjects();
    }

    // Client: view own projects
    @GetMapping("/my")
    public List<ProjectResponse> getMyProjects(Authentication auth) {
        String email = auth.getName();
        return projectService.getProjectsForClient(email);
    }
}
