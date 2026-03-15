package com.puyen.todoweb.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    private String email;
}
