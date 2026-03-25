package com.telusko.ProductSpring.controller;

import com.telusko.ProductSpring.dto.IssueRequest;
import com.telusko.ProductSpring.dto.IssueResponse;
import com.telusko.ProductSpring.enums.IssueStatus;
import com.telusko.ProductSpring.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issues")
@CrossOrigin(origins = "http://localhost:3000")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public IssueResponse createIssue(@RequestBody IssueRequest issueRequest, Authentication authentication) {
        return issueService.createIssue(issueRequest, authentication);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<IssueResponse> getMyIssues(Authentication authentication) {
        return issueService.getMyIssues(authentication);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<IssueResponse> getAllIssues() {
        return issueService.getAllIssues();
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public IssueResponse updateIssueStatus(@PathVariable Integer id, @RequestParam IssueStatus status) {
        return issueService.updateIssueStatus(id, status);
    }
}