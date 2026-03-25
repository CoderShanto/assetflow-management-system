package com.telusko.ProductSpring.controller;

import com.telusko.ProductSpring.dto.AssetAssignmentRequest;
import com.telusko.ProductSpring.dto.AssetAssignmentResponse;
import com.telusko.ProductSpring.dto.UserResponse;
import com.telusko.ProductSpring.entity.Asset;
import com.telusko.ProductSpring.service.AssetAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asset-assignments")
@CrossOrigin(origins = "http://localhost:3000")
public class AssetAssignmentController {

    @Autowired
    private AssetAssignmentService assetAssignmentService;

    @GetMapping("/available-assets")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Asset> getAvailableAssets() {
        return assetAssignmentService.getAvailableAssets();
    }

    @GetMapping("/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getEmployees() {
        return assetAssignmentService.getEmployees();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public AssetAssignmentResponse assignAsset(@RequestBody AssetAssignmentRequest request) {
        return assetAssignmentService.assignAsset(request);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AssetAssignmentResponse> getAllAssignments() {
        return assetAssignmentService.getAllAssignments();
    }

    @PutMapping("/{id}/return")
    @PreAuthorize("hasRole('ADMIN')")
    public AssetAssignmentResponse returnAsset(@PathVariable Integer id) {
        return assetAssignmentService.returnAsset(id);
    }
}