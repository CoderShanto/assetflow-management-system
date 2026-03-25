package com.telusko.ProductSpring.controller;

import com.telusko.ProductSpring.dto.AuthResponse;
import com.telusko.ProductSpring.dto.LoginRequest;
import com.telusko.ProductSpring.dto.RegisterRequest;
import com.telusko.ProductSpring.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}