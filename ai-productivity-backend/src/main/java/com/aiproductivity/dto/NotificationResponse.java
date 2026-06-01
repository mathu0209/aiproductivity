package com.aiproductivity.dto;

import com.aiproductivity.entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {
    private Long id;
    private String message;
    private Notification.NotificationType type;
    private Boolean isRead;
    private UserResponse recipient;
    private Long relatedTaskId;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
}
