package com.aiproductivity.service;

import com.aiproductivity.dto.TaskResponse;
import com.aiproductivity.entity.Task;
import com.aiproductivity.entity.User;
import com.aiproductivity.repository.TaskRepository;
import com.aiproductivity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public TaskResponse createTask(Task task, Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        task.setCreatedBy(user);
        Task saved = taskRepository.save(task);
        return toResponse(saved);
    }

    public Optional<TaskResponse> updateTask(Long id, Task updated) {
        return taskRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setDescription(updated.getDescription());
            existing.setDueDate(updated.getDueDate());
            existing.setPriority(updated.getPriority());
            existing.setStatus(updated.getStatus());
            Task saved = taskRepository.save(existing);
            return toResponse(saved);
        });
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    private TaskResponse toResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .createdBy(null)
                .assignedTo(null)
                .comments(null)
                .build();
    }
}
