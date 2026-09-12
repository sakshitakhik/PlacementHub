package com.example.demo.controller;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Notification;
import com.example.demo.service.NotificationService;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {
	private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {

        this.notificationService = notificationService;
    }

    // Create notification
    @PostMapping("/notifications")
    public Notification createNotification(
            @RequestBody Notification notification) {

        return notificationService.saveNotification(notification);
    }

    // Get all notifications
    @GetMapping("/notifications")
    public List<Notification> getAllNotifications() {

        return notificationService.getAllNotifications();
    }
    
 // Get notifications by user
    @GetMapping("/notifications/user/{userId}")
    public List<Notification> getNotificationsByUserId(
            @PathVariable("userId") Long userId) {
        return notificationService.getNotificationsByUserId(userId);
    }
    
    @PutMapping("/notifications/{id}/read")
    public Notification markAsRead(
            @PathVariable("id") Long id) {

        return notificationService.markAsRead(id);
    }

    // Get notification by ID
    @GetMapping("/notifications/{id}")
    public Notification getNotificationById(
            @PathVariable("id") Long id) {

        return notificationService.getNotificationById(id);
    }

    // Update notification
    @PutMapping("/notifications/{id}")
    public Notification updateNotification(
            @PathVariable("id") Long id,
            @RequestBody Notification notification) {

        return notificationService.updateNotification(id, notification);
    }

    // Delete notification
    @DeleteMapping("/notifications/{id}")
    public String deleteNotification(
            @PathVariable("id") Long id) {

        notificationService.deleteNotification(id);

        return "Notification deleted successfully";
    }
}
