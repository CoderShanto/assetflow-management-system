package com.telusko.ProductSpring.repository;

import com.telusko.ProductSpring.entity.AssetRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AssetRequestRepository extends JpaRepository<AssetRequest, Integer> {

    List<AssetRequest> findByUserIdOrderByCreatedAtDesc(Integer userId);

    List<AssetRequest> findAllByOrderByCreatedAtDesc();

    @Query("SELECT COUNT(a) FROM AssetRequest a WHERE a.status = :status")
    long countByStatusValue(@Param("status") String status);
}