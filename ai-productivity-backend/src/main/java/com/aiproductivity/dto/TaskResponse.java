package com.aiproductivity.dto;

import com.aiproductivity.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private Task.TaskStatus status;
    private Task.TaskPriority priority;
    private LocalDateTime dueDate;
    private UserResponse createdBy;
    private UserResponse assignedTo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<CommentResponse> comments;
}
