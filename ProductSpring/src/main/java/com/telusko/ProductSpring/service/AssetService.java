package com.telusko.ProductSpring.service;

import com.telusko.ProductSpring.dto.AssetResponse;
import com.telusko.ProductSpring.entity.Asset;
import com.telusko.ProductSpring.entity.User;
import com.telusko.ProductSpring.repository.AssetRepository;
import com.telusko.ProductSpring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class AssetService {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Asset getAssetById(Integer id) {
        return assetRepository.findById(id).orElse(null);
    }

    public Asset createAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    public Asset updateAsset(Integer id, Asset updatedAsset) {
        Asset existingAsset = assetRepository.findById(id).orElse(null);

        if (existingAsset == null) {
            return null;
        }

        existingAsset.setName(updatedAsset.getName());
        existingAsset.setCategory(updatedAsset.getCategory());
        existingAsset.setBrand(updatedAsset.getBrand());
        existingAsset.setSerialNumber(updatedAsset.getSerialNumber());
        existingAsset.setLocation(updatedAsset.getLocation());
        existingAsset.setAssetCondition(updatedAsset.getAssetCondition());
        existingAsset.setStatus(updatedAsset.getStatus());
        existingAsset.setPurchaseDate(updatedAsset.getPurchaseDate());
        existingAsset.setWarrantyExpiry(updatedAsset.getWarrantyExpiry());
        existingAsset.setAssignedUser(updatedAsset.getAssignedUser());

        return assetRepository.save(existingAsset);
    }

    public boolean deleteAsset(Integer id) {
        if (!assetRepository.existsById(id)) {
            return false;
        }

        assetRepository.deleteById(id);
        return true;
    }

    public List<AssetResponse> getMyAssets(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String sql = """
                SELECT 
                    a.id,
                    a.name,
                    a.category,
                    a.brand,
                    a.serial_number,
                    a.location,
                    a.asset_condition,
                    a.status,
                    a.purchase_date,
                    a.warranty_expiry,
                    a.assigned_user_id,
                    u.name AS assigned_user_name
                FROM assets a
                LEFT JOIN users u ON a.assigned_user_id = u.id
                WHERE a.assigned_user_id = ?
                ORDER BY a.id ASC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> new AssetResponse(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("category"),
                        rs.getString("brand"),
                        rs.getString("serial_number"),
                        rs.getString("location"),
                        rs.getString("asset_condition"),
                        rs.getString("status"),
                        rs.getDate("purchase_date") != null ? rs.getDate("purchase_date").toLocalDate() : null,
                        rs.getDate("warranty_expiry") != null ? rs.getDate("warranty_expiry").toLocalDate() : null,
                        rs.getObject("assigned_user_id") != null ? rs.getInt("assigned_user_id") : null,
                        rs.getString("assigned_user_name")
                ),
                user.getId()
        );
    }
}