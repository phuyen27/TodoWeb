package com.puyen.todoweb.controller;

import com.puyen.todoweb.dto.TaskRequest;
import com.puyen.todoweb.model.Task;
import com.puyen.todoweb.service.TaskService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public Task createTask(
            @Valid @RequestBody TaskRequest taskRequest,
            HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        return taskService.createTask(
                email,
                taskRequest.getTitle(),
                taskRequest.getDescription(),
                taskRequest.getDueDate(),
                taskRequest.getPriority()
        );
    }

    @GetMapping
    public List<Task> getTasks(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        return taskService.getTasks(email);
    }

    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable String id,
            @Valid @RequestBody TaskRequest taskRequest) {

        return taskService.updateTask(
                id,
                taskRequest.getTitle(),
                taskRequest.getDescription(),
                taskRequest.getDueDate(),
                taskRequest.getPriority()
        );
    }

    @PutMapping("/{id}/complete")
    public Task completeTask(@PathVariable String id) {
        return taskService.completeTask(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
    }
}