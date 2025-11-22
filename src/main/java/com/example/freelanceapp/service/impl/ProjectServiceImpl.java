package com.example.freelanceapp.service.impl;

import com.example.freelanceapp.dto.ProjectRequest;
import com.example.freelanceapp.dto.ProjectResponse;
import com.example.freelanceapp.model.Project;
import com.example.freelanceapp.model.User;
import com.example.freelanceapp.repository.ProjectRepository;
import com.example.freelanceapp.repository.UserRepository;
import com.example.freelanceapp.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository,
                              UserRepository userRepository) {

        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ProjectResponse createProject(ProjectRequest request, String clientEmail) {

        User client = userRepository.findByEmail(clientEmail)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Project project = new Project();
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setBudget(request.getBudget());
        project.setClient(client);

        Project saved = projectRepository.save(project);

        return new ProjectResponse(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getBudget(),
                saved.getClient().getId(),
                saved.getClient().getFullName()
        );
    }

    @Override
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsForClient(String clientEmail) {

        User client = userRepository.findByEmail(clientEmail)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        return projectRepository.findByClient(client)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private ProjectResponse toResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getBudget(),
                project.getClient().getId(),
                project.getClient().getFullName()
        );
    }
}
