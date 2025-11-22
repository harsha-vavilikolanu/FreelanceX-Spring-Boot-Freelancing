package com.example.freelanceapp.dto;

import java.math.BigDecimal;

public class ProjectRequest {

    private String title;
    private String description;
    private BigDecimal budget;

    public ProjectRequest() {
    }

    public ProjectRequest(String title, String description, BigDecimal budget) {
        this.title = title;
        this.description = description;
        this.budget = budget;
    }

    // Getters & Setters

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
}
