package com.example.freelanceapp.dto;

import java.math.BigDecimal;

public class BidRequest {

    private Long projectId;
    private BigDecimal bidAmount;
    private String proposalText;

    public BidRequest() {
    }

    public BidRequest(Long projectId, BigDecimal bidAmount, String proposalText) {
        this.projectId = projectId;
        this.bidAmount = bidAmount;
        this.proposalText = proposalText;
    }

    // Getters & Setters

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public BigDecimal getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(BigDecimal bidAmount) {
        this.bidAmount = bidAmount;
    }

    public String getProposalText() {
        return proposalText;
    }

    public void setProposalText(String proposalText) {
        this.proposalText = proposalText;
    }
}
