package com.telusko.ProductSpring.controller;

import com.telusko.ProductSpring.dto.AssetResponse;
import com.telusko.ProductSpring.entity.Asset;
import com.telusko.ProductSpring.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
@CrossOrigin(origins = "http://localhost:3000")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public Asset getAssetById(@PathVariable Integer id) {
        return assetService.getAssetById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Asset createAsset(@RequestBody Asset asset) {
        return assetService.createAsset(asset);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Asset updateAsset(@PathVariable Integer id, @RequestBody Asset asset) {
        return assetService.updateAsset(id, asset);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteAsset(@PathVariable Integer id) {
        boolean deleted = assetService.deleteAsset(id);

        if (deleted) {
            return "Asset deleted successfully";
        }

        return "Asset not found";
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<AssetResponse> getMyAssets(Authentication authentication) {
        return assetService.getMyAssets(authentication);
    }
}