package com.telusko.ProductSpring.repository;

import com.telusko.ProductSpring.entity.AssetAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetAssignmentRepository extends JpaRepository<AssetAssignment, Integer> {
    List<AssetAssignment> findAllByOrderByAssignedDateDesc();
}