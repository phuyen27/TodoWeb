package com.puyen.todoweb.controller;


import com.puyen.todoweb.dto.LoginRequest;
import com.puyen.todoweb.dto.RegisterRequest;
import com.puyen.todoweb.dto.UpdateRequest;
import com.puyen.todoweb.model.User;
import com.puyen.todoweb.repository.UserRepository;
import com.puyen.todoweb.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PatchMapping("/me")
    public User update(@RequestBody UpdateRequest request) {
        return authService.update(request);
    }

    @GetMapping("/me")
    public User getMe() {
        String userId = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
