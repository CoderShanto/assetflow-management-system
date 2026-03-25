package com.telusko.ProductSpring.repository;

import com.telusko.ProductSpring.entity.Asset;
import com.telusko.ProductSpring.enums.AssetStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Integer> {

    List<Asset> findByStatus(AssetStatus status);

    long countByStatus(AssetStatus status);

    List<Asset> findByAssignedUserId(Integer userId);
}