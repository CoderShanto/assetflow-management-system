package com.telusko.ProductSpring.dto;

import java.time.LocalDate;

public class AssetResponse {

    private Integer id;
    private String name;
    private String category;
    private String brand;
    private String serialNumber;
    private String location;
    private String assetCondition;
    private String status;
    private LocalDate purchaseDate;
    private LocalDate warrantyExpiry;
    private Integer assignedUserId;
    private String assignedUserName;

    public AssetResponse() {
    }

    public AssetResponse(Integer id, String name, String category, String brand, String serialNumber,
                         String location, String assetCondition, String status,
                         LocalDate purchaseDate, LocalDate warrantyExpiry,
                         Integer assignedUserId, String assignedUserName) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.serialNumber = serialNumber;
        this.location = location;
        this.assetCondition = assetCondition;
        this.status = status;
        this.purchaseDate = purchaseDate;
        this.warrantyExpiry = warrantyExpiry;
        this.assignedUserId = assignedUserId;
        this.assignedUserName = assignedUserName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAssetCondition() {
        return assetCondition;
    }

    public void setAssetCondition(String assetCondition) {
        this.assetCondition = assetCondition;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public LocalDate getWarrantyExpiry() {
        return warrantyExpiry;
    }

    public void setWarrantyExpiry(LocalDate warrantyExpiry) {
        this.warrantyExpiry = warrantyExpiry;
    }

    public Integer getAssignedUserId() {
        return assignedUserId;
    }

    public void setAssignedUserId(Integer assignedUserId) {
        this.assignedUserId = assignedUserId;
    }

    public String getAssignedUserName() {
        return assignedUserName;
    }

    public void setAssignedUserName(String assignedUserName) {
        this.assignedUserName = assignedUserName;
    }
}