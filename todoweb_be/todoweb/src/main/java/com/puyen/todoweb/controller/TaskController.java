package com.puyen.todoweb.controller;

import com.puyen.todoweb.dto.TaskRequest;
import com.puyen.todoweb.model.Task;
import com.puyen.todoweb.service.TaskService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody TaskRequest request) {
        return taskService.createTask(
                request.getTitle(),
                request.getDescription(),
                request.getDueDate(),
                request.getPriority()
        );
    }

    @GetMapping
    public Page<Task> getTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        return taskService.getTasks(page, size, completed, priority, search, sortBy, direction);
    }

    @PatchMapping("/{id}")
    public Task updateTask(
            @PathVariable String id,
            @RequestBody TaskRequest request) {

        return taskService.updateTask(
                id,
                request.getTitle(),
                request.getDescription(),
                request.getDueDate(),
                request.getPriority(),
                request.getCompleted()
        );
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
    }
}