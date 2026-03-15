package com.puyen.todoweb.service;

import com.puyen.todoweb.config.JwtUtil;
import com.puyen.todoweb.dto.LoginRequest;
import com.puyen.todoweb.dto.RegisterRequest;
import com.puyen.todoweb.model.User;
import com.puyen.todoweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public User register(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        user.setPassword(encodedPassword);
        user.setCreatedAt(new Date());
        System.out.println("Register called");
        System.out.println(request.getEmail());
        return userRepository.save(user);
    }

    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Wrong password");
        }

        return jwtUtil.generateToken(user.getId());

    }
}
