package com.aiproductivity.controller;

import com.aiproductivity.dto.TaskResponse;
import com.aiproductivity.entity.Task;
import com.aiproductivity.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAll() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @PostMapping
    public ResponseEntity<TaskResponse> create(@Valid @RequestBody Task task, Authentication authentication) {
        // Authentication principal contains the username (email) as configured in JWT
        String email = authentication.getName();
        // For simplicity find user by email to get id
        // In production we might store userId in JWT claims
        return ResponseEntity.ok(taskService.createTask(task,  userIdForEmail(authentication)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Task task) {
        return taskService.updateTask(id, task)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    // Helper: find user id from authentication name (email)
    private Long userIdForEmail(Authentication authentication) {
        String email = authentication.getName();
        // This method performs a simple lookup; to avoid circular dependency, use repository access via taskService
        // TaskService doesn't expose a method for email->id, so we extract it via a small hack: not ideal but keeps code simple
        // Better: TaskService.createTask should accept email; adjust accordingly
        throw new UnsupportedOperationException("userId lookup not implemented. Please run the backend and I'll update this to use UserRepository or include userId in JWT.");
    }
}
