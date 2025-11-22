package com.example.freelanceapp.controller;

import com.example.freelanceapp.dto.BidRequest;
import com.example.freelanceapp.model.Bid;
import com.example.freelanceapp.service.BidService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bids")
@CrossOrigin
public class BidController {

    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    // Freelancer: place bid
    @PostMapping
    public Bid placeBid(@RequestBody BidRequest request,
                        Authentication auth) {
        String email = auth.getName();
        return bidService.placeBid(request, email);
    }

    // Client: get bids for a project
    @GetMapping("/project/{projectId}")
    public List<Bid> getBidsForProject(@PathVariable Long projectId) {
        return bidService.getBidsForProject(projectId);
    }
}
