package com.telusko.ProductSpring.service;

import com.telusko.ProductSpring.dto.AdminDashboardStatsResponse;
import com.telusko.ProductSpring.dto.EmployeeDashboardStatsResponse;
import com.telusko.ProductSpring.entity.User;
import com.telusko.ProductSpring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UserRepository userRepository;

    public AdminDashboardStatsResponse getAdminStats() {
        long totalAssets = getCount("SELECT COUNT(*) FROM assets");
        long totalUsers = getCount("SELECT COUNT(*) FROM users");
        long pendingRequests = getCount("SELECT COUNT(*) FROM asset_requests WHERE status = 'PENDING'");
        long openIssues = getCount("SELECT COUNT(*) FROM issues WHERE status = 'OPEN'");

        List<AdminDashboardStatsResponse.ChartItem> assetStatusChart = new ArrayList<>();
        assetStatusChart.add(new AdminDashboardStatsResponse.ChartItem("AVAILABLE",
                getCount("SELECT COUNT(*) FROM assets WHERE status = 'AVAILABLE'")));
        assetStatusChart.add(new AdminDashboardStatsResponse.ChartItem("ASSIGNED",
                getCount("SELECT COUNT(*) FROM assets WHERE status = 'ASSIGNED'")));
        assetStatusChart.add(new AdminDashboardStatsResponse.ChartItem("IN_REPAIR",
                getCount("SELECT COUNT(*) FROM assets WHERE status = 'IN_REPAIR'")));
        assetStatusChart.add(new AdminDashboardStatsResponse.ChartItem("LOST",
                getCount("SELECT COUNT(*) FROM assets WHERE status = 'LOST'")));
        assetStatusChart.add(new AdminDashboardStatsResponse.ChartItem("RETIRED",
                getCount("SELECT COUNT(*) FROM assets WHERE status = 'RETIRED'")));

        List<AdminDashboardStatsResponse.ChartItem> requestStatusChart = new ArrayList<>();
        requestStatusChart.add(new AdminDashboardStatsResponse.ChartItem("PENDING",
                getCount("SELECT COUNT(*) FROM asset_requests WHERE status = 'PENDING'")));
        requestStatusChart.add(new AdminDashboardStatsResponse.ChartItem("APPROVED",
                getCount("SELECT COUNT(*) FROM asset_requests WHERE status = 'APPROVED'")));
        requestStatusChart.add(new AdminDashboardStatsResponse.ChartItem("REJECTED",
                getCount("SELECT COUNT(*) FROM asset_requests WHERE status = 'REJECTED'")));

        return new AdminDashboardStatsResponse(
                totalAssets,
                totalUsers,
                pendingRequests,
                openIssues,
                assetStatusChart,
                requestStatusChart
        );
    }

    public EmployeeDashboardStatsResponse getEmployeeStats(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long myAssets = getCount("SELECT COUNT(*) FROM assets WHERE assigned_user_id = " + user.getId());
        long myRequests = getCount("SELECT COUNT(*) FROM asset_requests WHERE user_id = " + user.getId());
        long myIssues = getCount("SELECT COUNT(*) FROM issues WHERE user_id = " + user.getId());

        return new EmployeeDashboardStatsResponse(myAssets, myRequests, myIssues);
    }

    private long getCount(String sql) {
        Long result = jdbcTemplate.queryForObject(sql, Long.class);
        return result != null ? result : 0L;
    }
}