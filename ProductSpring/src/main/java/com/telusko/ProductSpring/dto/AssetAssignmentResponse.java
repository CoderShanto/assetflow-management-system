package com.telusko.ProductSpring.dto;

import java.time.LocalDateTime;

public class AssetAssignmentResponse {

    private Integer id;
    private Integer assetId;
    private String assetName;
    private String assetCategory;
    private String assetBrand;
    private String serialNumber;
    private Integer userId;
    private String userName;
    private String userEmail;
    private String department;
    private LocalDateTime assignedDate;
    private LocalDateTime returnedDate;
    private String status;

    public AssetAssignmentResponse() {
    }

    public AssetAssignmentResponse(Integer id, Integer assetId, String assetName, String assetCategory,
                                   String assetBrand, String serialNumber, Integer userId, String userName,
                                   String userEmail, String department, LocalDateTime assignedDate,
                                   LocalDateTime returnedDate, String status) {
        this.id = id;
        this.assetId = assetId;
        this.assetName = assetName;
        this.assetCategory = assetCategory;
        this.assetBrand = assetBrand;
        this.serialNumber = serialNumber;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.department = department;
        this.assignedDate = assignedDate;
        this.returnedDate = returnedDate;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAssetId() {
        return assetId;
    }

    public void setAssetId(Integer assetId) {
        this.assetId = assetId;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public String getAssetCategory() {
        return assetCategory;
    }

    public void setAssetCategory(String assetCategory) {
        this.assetCategory = assetCategory;
    }

    public String getAssetBrand() {
        return assetBrand;
    }

    public void setAssetBrand(String assetBrand) {
        this.assetBrand = assetBrand;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDateTime getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(LocalDateTime assignedDate) {
        this.assignedDate = assignedDate;
    }

    public LocalDateTime getReturnedDate() {
        return returnedDate;
    }

    public void setReturnedDate(LocalDateTime returnedDate) {
        this.returnedDate = returnedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}