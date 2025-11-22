package com.example.freelanceapp.service;

import com.example.freelanceapp.dto.BidRequest;
import com.example.freelanceapp.model.Bid;

import java.util.List;

public interface BidService {
    Bid placeBid(BidRequest request, String freelancerEmail);
    List<Bid> getBidsForProject(Long projectId);
}
