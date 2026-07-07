package com.hms.projectSpringBoot.security.controller;

import com.hms.projectSpringBoot.security.dto.LoginRequest;
import com.hms.projectSpringBoot.security.service.AuthService;
import com.hms.projectSpringBoot.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthRestController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ApiResponse login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty()) {
            return new ApiResponse(false, "Email is required");
        }
        if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return new ApiResponse(false, "Password is required");
        }
        return authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
    }

}
