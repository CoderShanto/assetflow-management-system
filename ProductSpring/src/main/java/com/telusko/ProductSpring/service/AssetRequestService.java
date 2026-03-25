package com.telusko.ProductSpring.service;

import com.telusko.ProductSpring.entity.AssetRequest;
import com.telusko.ProductSpring.entity.User;
import com.telusko.ProductSpring.enums.RequestStatus;
import com.telusko.ProductSpring.repository.AssetRequestRepository;
import com.telusko.ProductSpring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetRequestService {

    @Autowired
    private AssetRequestRepository assetRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public AssetRequest createRequest(AssetRequest request, Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        request.setUser(user);
        request.setStatus(RequestStatus.PENDING);

        return assetRequestRepository.save(request);
    }

    public List<AssetRequest> getMyRequests(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return assetRequestRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public List<AssetRequest> getAllRequests() {
        return assetRequestRepository.findAllByOrderByCreatedAtDesc();
    }

    public AssetRequest approveRequest(Integer id) {
        Optional<AssetRequest> optionalRequest = assetRequestRepository.findById(id);

        if (optionalRequest.isEmpty()) {
            return null;
        }

        AssetRequest request = optionalRequest.get();
        request.setStatus(RequestStatus.APPROVED);

        return assetRequestRepository.save(request);
    }

    public AssetRequest rejectRequest(Integer id) {
        Optional<AssetRequest> optionalRequest = assetRequestRepository.findById(id);

        if (optionalRequest.isEmpty()) {
            return null;
        }

        AssetRequest request = optionalRequest.get();
        request.setStatus(RequestStatus.REJECTED);

        return assetRequestRepository.save(request);
    }
}