package com.telusko.ProductSpring.dto;

public class AssetAssignmentRequest {

    private Integer assetId;
    private Integer userId;

    public AssetAssignmentRequest() {
    }

    public AssetAssignmentRequest(Integer assetId, Integer userId) {
        this.assetId = assetId;
        this.userId = userId;
    }

    public Integer getAssetId() {
        return assetId;
    }

    public void setAssetId(Integer assetId) {
        this.assetId = assetId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}