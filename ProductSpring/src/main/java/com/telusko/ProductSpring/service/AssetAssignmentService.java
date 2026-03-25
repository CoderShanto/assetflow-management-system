package com.telusko.ProductSpring.service;

import com.telusko.ProductSpring.dto.AssetAssignmentRequest;
import com.telusko.ProductSpring.dto.AssetAssignmentResponse;
import com.telusko.ProductSpring.dto.UserResponse;
import com.telusko.ProductSpring.entity.Asset;
import com.telusko.ProductSpring.entity.AssetAssignment;
import com.telusko.ProductSpring.entity.User;
import com.telusko.ProductSpring.enums.AssetStatus;
import com.telusko.ProductSpring.enums.AssignmentStatus;
import com.telusko.ProductSpring.enums.Role;
import com.telusko.ProductSpring.repository.AssetAssignmentRepository;
import com.telusko.ProductSpring.repository.AssetRepository;
import com.telusko.ProductSpring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssetAssignmentService {

    @Autowired
    private AssetAssignmentRepository assetAssignmentRepository;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Asset> getAvailableAssets() {
        return assetRepository.findByStatus(AssetStatus.AVAILABLE);
    }

    public List<UserResponse> getEmployees() {
        return userRepository.findByRole(Role.EMPLOYEE)
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.getDepartment()
                ))
                .toList();
    }

    public AssetAssignmentResponse assignAsset(AssetAssignmentRequest request) {
        Asset asset = assetRepository.findById(request.getAssetId())
                .orElseThrow(() -> new RuntimeException("Asset not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (asset.getStatus() == AssetStatus.ASSIGNED) {
            throw new RuntimeException("Asset is already assigned");
        }

        asset.setAssignedUser(user);
        asset.setStatus(AssetStatus.ASSIGNED);
        assetRepository.save(asset);

        AssetAssignment assignment = new AssetAssignment();
        assignment.setAsset(asset);
        assignment.setUser(user);
        assignment.setAssignedDate(LocalDateTime.now());
        assignment.setStatus(AssignmentStatus.ASSIGNED);

        AssetAssignment savedAssignment = assetAssignmentRepository.save(assignment);

        return mapToResponse(savedAssignment);
    }

    public List<AssetAssignmentResponse> getAllAssignments() {
        return assetAssignmentRepository.findAllByOrderByAssignedDateDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public AssetAssignmentResponse returnAsset(Integer id) {
        AssetAssignment assignment = assetAssignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        if (assignment.getStatus() == AssignmentStatus.RETURNED) {
            throw new RuntimeException("Asset already returned");
        }

        assignment.setStatus(AssignmentStatus.RETURNED);
        assignment.setReturnedDate(LocalDateTime.now());

        Asset asset = assignment.getAsset();
        asset.setAssignedUser(null);
        asset.setStatus(AssetStatus.AVAILABLE);

        assetRepository.save(asset);
        AssetAssignment updatedAssignment = assetAssignmentRepository.save(assignment);

        return mapToResponse(updatedAssignment);
    }

    private AssetAssignmentResponse mapToResponse(AssetAssignment assignment) {
        Asset asset = assignment.getAsset();
        User user = assignment.getUser();

        return new AssetAssignmentResponse(
                assignment.getId(),
                asset != null ? asset.getId() : null,
                asset != null ? asset.getName() : null,
                asset != null ? asset.getCategory() : null,
                asset != null ? asset.getBrand() : null,
                asset != null ? asset.getSerialNumber() : null,
                user != null ? user.getId() : null,
                user != null ? user.getName() : null,
                user != null ? user.getEmail() : null,
                user != null ? user.getDepartment() : null,
                assignment.getAssignedDate(),
                assignment.getReturnedDate(),
                assignment.getStatus() != null ? assignment.getStatus().name() : null
        );
    }
}