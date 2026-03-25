package com.telusko.ProductSpring.controller;

import com.telusko.ProductSpring.dto.AdminDashboardStatsResponse;
import com.telusko.ProductSpring.dto.EmployeeDashboardStatsResponse;
import com.telusko.ProductSpring.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/admin-stats")
    @PreAuthorize("hasRole('ADMIN')")
    public AdminDashboardStatsResponse getAdminStats() {
        return dashboardService.getAdminStats();
    }

    @GetMapping("/employee-stats")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public EmployeeDashboardStatsResponse getEmployeeStats(Authentication authentication) {
        return dashboardService.getEmployeeStats(authentication.getName());
    }
}