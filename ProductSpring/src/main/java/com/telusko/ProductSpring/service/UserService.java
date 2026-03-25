package com.telusko.ProductSpring.service;

import com.telusko.ProductSpring.dto.UserResponse;
import com.telusko.ProductSpring.entity.User;
import com.telusko.ProductSpring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<UserResponse> getAllUsers() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public UserResponse getUserById(int id) {
        User user = repository.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        return mapToResponse(user);
    }

    private UserResponse mapToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole() != null ? user.getRole().name() : null,
                user.getDepartment()
        );
    }
}