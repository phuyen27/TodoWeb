package com.puyen.todoweb.repository;


import com.puyen.todoweb.model.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, String> {
    List<Task> findAllByUserId(String userId);
}
