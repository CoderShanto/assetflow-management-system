package com.telusko.ProductSpring.controller;

import com.telusko.ProductSpring.entity.AssetRequest;
import com.telusko.ProductSpring.service.AssetRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "http://localhost:3000")
public class AssetRequestController {

    @Autowired
    private AssetRequestService assetRequestService;

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public AssetRequest createRequest(@RequestBody AssetRequest request, Authentication authentication) {
        return assetRequestService.createRequest(request, authentication);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<AssetRequest> getMyRequests(Authentication authentication) {
        return assetRequestService.getMyRequests(authentication);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AssetRequest> getAllRequests() {
        return assetRequestService.getAllRequests();
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public AssetRequest approveRequest(@PathVariable Integer id) {
        return assetRequestService.approveRequest(id);
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public AssetRequest rejectRequest(@PathVariable Integer id) {
        return assetRequestService.rejectRequest(id);
    }
}