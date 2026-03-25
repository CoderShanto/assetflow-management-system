package com.telusko.ProductSpring.dto;

public class IssueRequest {

    private Integer productId;
    private String title;
    private String description;

    public IssueRequest() {
    }

    public IssueRequest(Integer productId, String title, String description) {
        this.productId = productId;
        this.title = title;
        this.description = description;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
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
}