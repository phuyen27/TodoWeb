package com.puyen.todoweb.controller;


import com.puyen.todoweb.dto.LoginRequest;
import com.puyen.todoweb.dto.RegisterRequest;
import com.puyen.todoweb.dto.UpdateRequest;
import com.puyen.todoweb.model.User;
import com.puyen.todoweb.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

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
}
