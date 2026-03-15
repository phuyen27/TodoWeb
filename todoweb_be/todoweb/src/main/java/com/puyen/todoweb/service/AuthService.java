package com.puyen.todoweb.service;

import com.puyen.todoweb.config.JwtUtil;
import com.puyen.todoweb.dto.LoginRequest;
import com.puyen.todoweb.dto.RegisterRequest;
import com.puyen.todoweb.dto.UpdateRequest;
import com.puyen.todoweb.model.User;
import com.puyen.todoweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);

        user.setCreatedAt(new Date());

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

    public User update(UpdateRequest request) {

        String userId = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getUsername() != null) {
            user.setUsername(request.getUsername());
        }


        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(request.getPassword());
            user.setPassword(encodedPassword);
        }

        return userRepository.save(user);
    }
}
