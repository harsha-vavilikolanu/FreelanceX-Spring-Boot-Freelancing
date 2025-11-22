package com.example.freelanceapp.dto;

import java.math.BigDecimal;

public class ProjectResponse {

    private Long id;
    private String title;
    private String description;
    private BigDecimal budget;
    private Long clientId;
    private String clientName;

    public ProjectResponse() {
    }

    public ProjectResponse(Long id,
                           String title,
                           String description,
                           BigDecimal budget,
                           Long clientId,
                           String clientName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.budget = budget;
        this.clientId = clientId;
        this.clientName = clientName;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getBudget() {
        return budget;
    }

    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }
}
