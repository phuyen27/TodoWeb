package com.puyen.todoweb.dto;

import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.Date;

@Data
public class UpdateRequest {
    private String username;
    private String password;
}
