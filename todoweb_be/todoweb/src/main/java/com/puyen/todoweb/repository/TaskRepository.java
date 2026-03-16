package com.puyen.todoweb.repository;


import com.puyen.todoweb.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends CrudRepository<Task, String> {

    Optional<Task> findByIdAndUserId(String id, String userId);

    Page<Task> findByUserId(String userId, Pageable pageable);

    Page<Task> findByUserIdAndCompleted(String userId, Boolean completed, Pageable pageable);

    Page<Task> findByUserIdAndPriority(String userId, String priority, Pageable pageable);
    long countByUserIdAndCompletedFalse(String userId);
    Page<Task> findByUserIdAndCompletedAndPriority(
            String userId,
            Boolean completed,
            String priority,
            Pageable pageable
    );

    Page<Task> findByUserIdAndTitleContainingIgnoreCase(
            String userId,
            String title,
            Pageable pageable
    );
}
