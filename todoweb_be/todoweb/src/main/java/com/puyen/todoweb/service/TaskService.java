package com.puyen.todoweb.service;

import com.puyen.todoweb.model.Task;
import com.puyen.todoweb.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private PetService petService;

    private String getCurrentUserId() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    public Task createTask(String title, String description, Date deadline, String priority) {

        String userId = getCurrentUserId();

        Task task = new Task();
        task.setUserId(userId);
        task.setTitle(title);
        task.setDescription(description);
        task.setDueDate(deadline);
        task.setCompleted(false);
        task.setPriority(priority);
        task.setCreatedAt(new Date());

        return taskRepository.save(task);
    }

    public Page<Task> getTasks(
            int page,
            int size,
            Boolean completed,
            String priority,
            String search,
            String sortBy,
            String direction) {

        String userId = getCurrentUserId();

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        if (search != null && !search.isEmpty()) {
            return taskRepository.findByUserIdAndTitleContainingIgnoreCase(userId, search, pageable);
        }

        if (completed != null && priority != null) {
            return taskRepository.findByUserIdAndCompletedAndPriority(userId, completed, priority, pageable);
        }

        if (completed != null) {
            return taskRepository.findByUserIdAndCompleted(userId, completed, pageable);
        }

        if (priority != null) {
            return taskRepository.findByUserIdAndPriority(userId, priority, pageable);
        }

        return taskRepository.findByUserId(userId, pageable);
    }



    public Task updateTask(
            String id,
            String title,
            String description,
            Date dueDate,
            String priority,
            Boolean completed) {

        String userId = getCurrentUserId();

        Task task = taskRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        Boolean oldCompleted = task.getCompleted();
        if (title != null) task.setTitle(title);
        if (description != null) task.setDescription(description);
        if (dueDate != null) task.setDueDate(dueDate);
        if (priority != null) task.setPriority(priority);
        if (completed != null) {
            task.setCompleted(completed);

            if (oldCompleted == false && completed == true) {
                petService.growFromTask(userId);
            }
        }

        return taskRepository.save(task);
    }

    public void deleteTask(String id) {

        String userId = getCurrentUserId();

        Task task = taskRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        taskRepository.delete(task);
    }
}