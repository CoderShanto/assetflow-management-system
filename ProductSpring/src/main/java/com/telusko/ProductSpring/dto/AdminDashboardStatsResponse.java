package com.telusko.ProductSpring.dto;

import java.util.List;

public class AdminDashboardStatsResponse {

    private long totalAssets;
    private long totalUsers;
    private long pendingRequests;
    private long openIssues;
    private List<ChartItem> assetStatusChart;
    private List<ChartItem> requestStatusChart;

    public AdminDashboardStatsResponse() {
    }

    public AdminDashboardStatsResponse(long totalAssets, long totalUsers, long pendingRequests, long openIssues,
                                       List<ChartItem> assetStatusChart, List<ChartItem> requestStatusChart) {
        this.totalAssets = totalAssets;
        this.totalUsers = totalUsers;
        this.pendingRequests = pendingRequests;
        this.openIssues = openIssues;
        this.assetStatusChart = assetStatusChart;
        this.requestStatusChart = requestStatusChart;
    }

    public long getTotalAssets() {
        return totalAssets;
    }

    public void setTotalAssets(long totalAssets) {
        this.totalAssets = totalAssets;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getPendingRequests() {
        return pendingRequests;
    }

    public void setPendingRequests(long pendingRequests) {
        this.pendingRequests = pendingRequests;
    }

    public long getOpenIssues() {
        return openIssues;
    }

    public void setOpenIssues(long openIssues) {
        this.openIssues = openIssues;
    }

    public List<ChartItem> getAssetStatusChart() {
        return assetStatusChart;
    }

    public void setAssetStatusChart(List<ChartItem> assetStatusChart) {
        this.assetStatusChart = assetStatusChart;
    }

    public List<ChartItem> getRequestStatusChart() {
        return requestStatusChart;
    }

    public void setRequestStatusChart(List<ChartItem> requestStatusChart) {
        this.requestStatusChart = requestStatusChart;
    }

    public static class ChartItem {
        private String name;
        private long value;

        public ChartItem() {
        }

        public ChartItem(String name, long value) {
            this.name = name;
            this.value = value;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public long getValue() {
            return value;
        }

        public void setValue(long value) {
            this.value = value;
        }
    }
}