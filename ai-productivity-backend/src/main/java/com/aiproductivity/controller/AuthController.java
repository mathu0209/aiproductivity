package com.aiproductivity.controller;

import com.aiproductivity.dto.AuthResponse;
import com.aiproductivity.dto.LoginRequest;
import com.aiproductivity.dto.RegisterRequest;
import com.aiproductivity.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req) {
        AuthResponse res = authService.register(req);
        if (res.getToken() == null) {
            return ResponseEntity.badRequest().body(res);
        }
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        AuthResponse res = authService.login(req);
        if (res.getToken() == null) {
            return ResponseEntity.status(401).body(res);
        }
        return ResponseEntity.ok(res);
    }
}
