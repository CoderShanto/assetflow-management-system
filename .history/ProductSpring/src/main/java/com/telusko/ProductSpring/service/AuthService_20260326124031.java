package com.telusko.ProductSpring.service;

import com.telusko.ProductSpring.dto.AuthResponse;
import com.telusko.ProductSpring.dto.LoginRequest;
import com.telusko.ProductSpring.dto.RegisterRequest;
import com.telusko.ProductSpring.entity.User;
import com.telusko.ProductSpring.enums.Role;
import com.telusko.ProductSpring.repository.UserRepository;
import com.telusko.ProductSpring.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        validateRegisterRequest(request);

        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            return new AuthResponse(null, "Email already exists", null, null);
        }

        String finalDepartment = normalizeDepartment(request.getDepartment());

        Role selectedRole = request.getRole() != null ? request.getRole() : Role.EMPLOYEE;

        System.out.println("REGISTER DEBUG -> "
                + "name=" + request.getName()
                + ", email=" + email
                + ", password=" + request.getPassword()
                + ", rawDepartment=" + request.getDepartment()
                + ", finalDepartment=" + finalDepartment
                + ", role=" + selectedRole);

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDepartment(finalDepartment);
        user.setRole(selectedRole);

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(savedUser);

        return new AuthResponse(
                token,
                "User registered successfully",
                savedUser.getRole().name(),
                savedUser.getName()
        );
    }

    public AuthResponse login(LoginRequest request) {
        if (request == null
                || request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()) {
            return new AuthResponse(null, "Email and password are required", null, null);
        }

        String email = request.getEmail().trim().toLowerCase();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, request.getPassword())
        );

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return new AuthResponse(null, "User not found", null, null);
        }

        User user = optionalUser.get();
        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                "Login successful",
                user.getRole().name(),
                user.getName()
        );
    }

    private void validateRegisterRequest(RegisterRequest request) {
        if (request == null) {
            throw new RuntimeException("Request body is missing");
        }

        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new RuntimeException("Name is required");
        }

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        if (request.getDepartment() == null || request.getDepartment().trim().isEmpty()) {
            throw new RuntimeException("Department is required");
        }
    }

    private String normalizeDepartment(String department) {
        String value = department == null ? "" : department.trim();

        if (value.isEmpty()) {
            return "IT";
        }

        if (value.matches("\\d+")) {
            return "IT";
        }

        return value;
    }
}