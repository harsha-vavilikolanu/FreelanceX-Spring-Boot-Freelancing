package com.example.freelanceapp.service.impl;

import com.example.freelanceapp.dto.BidRequest;
import com.example.freelanceapp.model.Bid;
import com.example.freelanceapp.model.Project;
import com.example.freelanceapp.model.User;
import com.example.freelanceapp.repository.BidRepository;
import com.example.freelanceapp.repository.ProjectRepository;
import com.example.freelanceapp.repository.UserRepository;
import com.example.freelanceapp.service.BidService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidServiceImpl implements BidService {

    private final BidRepository bidRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public BidServiceImpl(BidRepository bidRepository,
                          UserRepository userRepository,
                          ProjectRepository projectRepository) {

        this.bidRepository = bidRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public Bid placeBid(BidRequest request, String freelancerEmail) {

        User freelancer = userRepository.findByEmail(freelancerEmail)
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Bid bid = new Bid();
        bid.setProject(project);
        bid.setFreelancer(freelancer);
        bid.setBidAmount(request.getBidAmount());
        bid.setProposalText(request.getProposalText());

        return bidRepository.save(bid);
    }

    @Override
    public List<Bid> getBidsForProject(Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return bidRepository.findByProject(project);
    }
}
