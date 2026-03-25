package com.telusko.ProductSpring.service;

import com.telusko.ProductSpring.dto.IssueRequest;
import com.telusko.ProductSpring.dto.IssueResponse;
import com.telusko.ProductSpring.entity.Issue;
import com.telusko.ProductSpring.entity.Product;
import com.telusko.ProductSpring.entity.User;
import com.telusko.ProductSpring.enums.IssueStatus;
import com.telusko.ProductSpring.repository.IssueRepository;
import com.telusko.ProductSpring.repository.ProductRepository;
import com.telusko.ProductSpring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public IssueResponse createIssue(IssueRequest issueRequest, Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (issueRequest.getProductId() == null) {
            throw new RuntimeException("Product id is required");
        }

        Product product = productRepository.findById(issueRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Issue issue = new Issue();
        issue.setUser(user);
        issue.setProduct(product);
        issue.setTitle(issueRequest.getTitle());
        issue.setDescription(issueRequest.getDescription());
        issue.setStatus(IssueStatus.OPEN);

        Issue savedIssue = issueRepository.save(issue);
        return mapToResponse(savedIssue);
    }

    public List<IssueResponse> getMyIssues(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return issueRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<IssueResponse> getAllIssues() {
        return issueRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public IssueResponse updateIssueStatus(Integer id, IssueStatus status) {
        Optional<Issue> optionalIssue = issueRepository.findById(id);

        if (optionalIssue.isEmpty()) {
            return null;
        }

        Issue issue = optionalIssue.get();
        issue.setStatus(status);

        Issue updatedIssue = issueRepository.save(issue);
        return mapToResponse(updatedIssue);
    }

    private IssueResponse mapToResponse(Issue issue) {
        return new IssueResponse(
                issue.getId(),
                issue.getProduct() != null ? issue.getProduct().getId() : null,
                issue.getProduct() != null ? issue.getProduct().getName() : null,
                issue.getUser() != null ? issue.getUser().getId() : null,
                issue.getUser() != null ? issue.getUser().getName() : null,
                issue.getUser() != null ? issue.getUser().getEmail() : null,
                issue.getTitle(),
                issue.getDescription(),
                issue.getStatus() != null ? issue.getStatus().name() : null,
                issue.getCreatedAt()
        );
    }
}