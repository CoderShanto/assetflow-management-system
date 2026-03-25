package com.telusko.ProductSpring.service;

import com.telusko.ProductSpring.dto.AuthResponse;
import com.telusko.ProductSpring.dto.LoginRequest;
import com.telusko.ProductSpring.dto.RegisterRequest;
import com.telusko.ProductSpring.entity.User;
import com.telusko.ProductSpring.enums.Role;
import com.telusko.ProductSpring.repository.UserRepository;
import com.telusko.ProductSpring.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(null, "Email already exists", null, null);
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDepartment(request.getDepartment());
        user.setRole(Role.EMPLOYEE);

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                "User registered successfully",
                user.getRole().name(),
                user.getName()
        );
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

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
}