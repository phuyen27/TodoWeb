package com.puyen.todoweb.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TaskRequest {
    @NotBlank
    private String title;

    private String description;

    @Future
    private Date dueDate;

    private String priority;
    private Boolean completed;
}
