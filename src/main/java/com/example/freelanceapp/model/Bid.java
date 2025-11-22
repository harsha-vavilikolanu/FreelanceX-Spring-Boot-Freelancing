package com.example.freelanceapp.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "bids")
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal bidAmount;

    @Column(length = 2000)
    private String proposalText;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "freelancer_id")
    private User freelancer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    private Instant createdAt;

    public Bid() {
    }

    public Bid(Long id,
               BigDecimal bidAmount,
               String proposalText,
               User freelancer,
               Project project,
               Instant createdAt) {
        this.id = id;
        this.bidAmount = bidAmount;
        this.proposalText = proposalText;
        this.freelancer = freelancer;
        this.project = project;
        this.createdAt = createdAt;
    }

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public User getFreelancer() {
        return freelancer;
    }

    public void setFreelancer(User freelancer) {
        this.freelancer = freelancer;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Bid{" +
                "id=" + id +
                ", bidAmount=" + bidAmount +
                ", proposalText='" + proposalText + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
