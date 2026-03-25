package com.telusko.ProductSpring.dto;

public class EmployeeDashboardStatsResponse {

    private long myAssets;
    private long myRequests;
    private long myIssues;

    public EmployeeDashboardStatsResponse() {
    }

    public EmployeeDashboardStatsResponse(long myAssets, long myRequests, long myIssues) {
        this.myAssets = myAssets;
        this.myRequests = myRequests;
        this.myIssues = myIssues;
    }

    public long getMyAssets() {
        return myAssets;
    }

    public void setMyAssets(long myAssets) {
        this.myAssets = myAssets;
    }

    public long getMyRequests() {
        return myRequests;
    }

    public void setMyRequests(long myRequests) {
        this.myRequests = myRequests;
    }

    public long getMyIssues() {
        return myIssues;
    }

    public void setMyIssues(long myIssues) {
        this.myIssues = myIssues;
    }
}