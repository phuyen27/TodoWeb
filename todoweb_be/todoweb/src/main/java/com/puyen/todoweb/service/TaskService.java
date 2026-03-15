package com.puyen.todoweb.service;

import com.puyen.todoweb.model.Task;
import com.puyen.todoweb.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(String userId, String title, String description, Date deadline,String priority) {

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

    public List<Task> getTasks(String userId) {
        return taskRepository.findAllByUserId(userId);
    }

    public Task completeTask(String id) {
        Task task = taskRepository.findById(id).orElseThrow();

        task.setCompleted(true);

        return taskRepository.save(task);
    }

    public Task updateTask(String id, String title, String description, Date dueDate, String priority) {

        Task task = taskRepository.findById(id).orElseThrow();

        task.setTitle(title);
        task.setDescription(description);
        task.setDueDate(dueDate);
        task.setPriority(priority);

        return taskRepository.save(task);
    }

    public Task toggleComplete(String id) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setCompleted(!task.isCompleted());
        return taskRepository.save(task);
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }
}
