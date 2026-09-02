package com.example.demo.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Notification;
import com.example.demo.repository.NotificationRepository;

@Service
public class NotificationService {
	 private final NotificationRepository notificationRepository;

	    public NotificationService(NotificationRepository notificationRepository) {
	        this.notificationRepository = notificationRepository;
	    }

	    // Create notification
	    public Notification saveNotification(Notification notification) {
	        return notificationRepository.save(notification);
	    }

	    // Get all notifications
	    public List<Notification> getAllNotifications() {
	        return notificationRepository.findAll();
	    }

	    // Get notification by ID
	    public Notification getNotificationById(Long id) {
	        return notificationRepository.findById(id).orElse(null);
	    }

	    // Update notification
	    public Notification updateNotification(
	            Long id, Notification notification) {

	        Notification existingNotification =
	                notificationRepository.findById(id).orElse(null);

	        if (existingNotification == null) {
	            return null;
	        }

	        existingNotification.setUser(notification.getUser());
	        existingNotification.setTitle(notification.getTitle());
	        existingNotification.setMessage(notification.getMessage());
	        existingNotification.setType(notification.getType());
	        existingNotification.setIsRead(notification.getIsRead());
	        existingNotification.setReadAt(notification.getReadAt());

	        return notificationRepository.save(existingNotification);
	    }

	    // Delete notification
	    public void deleteNotification(Long id) {
	        notificationRepository.deleteById(id);
	    }
}
