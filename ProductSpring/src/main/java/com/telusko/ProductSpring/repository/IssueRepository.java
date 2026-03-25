package com.telusko.ProductSpring.repository;

import com.telusko.ProductSpring.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Integer> {

    List<Issue> findByUserIdOrderByCreatedAtDesc(Integer userId);

    List<Issue> findAllByOrderByCreatedAtDesc();

    @Query("SELECT COUNT(i) FROM Issue i WHERE i.status = :status")
    long countByStatusValue(@Param("status") String status);
}