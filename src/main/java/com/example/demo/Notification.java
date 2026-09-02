package com.example.demo;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "id")
	    private Long notificationId;

	    @ManyToOne
	    @JoinColumn(name = "user_id", nullable = false)
	    private User user;

	    @Column(name = "title", nullable = false, length = 200)
	    private String title;

	    @Column(name = "message", nullable = false)
	    private String message;

	    @Column(name = "type", length = 50)
	    private String type;

	    @Column(name = "is_read", nullable = false)
	    private Boolean isRead = false;

	    @Column(name = "read_at")
	    private LocalDateTime readAt;

	    @Column(name = "created_at")
	    private LocalDateTime createdAt;

	    // Default constructor
	    public Notification() {
	    }

	    public Long getNotificationId() {
	        return notificationId;
	    }

	    public void setNotificationId(Long notificationId) {
	        this.notificationId = notificationId;
	    }

	    public User getUser() {
	        return user;
	    }

	    public void setUser(User user) {
	        this.user = user;
	    }

	    public String getTitle() {
	        return title;
	    }

	    public void setTitle(String title) {
	        this.title = title;
	    }

	    public String getMessage() {
	        return message;
	    }

	    public void setMessage(String message) {
	        this.message = message;
	    }

	    public String getType() {
	        return type;
	    }

	    public void setType(String type) {
	        this.type = type;
	    }

	    public Boolean getIsRead() {
	        return isRead;
	    }

	    public void setIsRead(Boolean isRead) {
	        this.isRead = isRead;
	    }

	    public LocalDateTime getReadAt() {
	        return readAt;
	    }

	    public void setReadAt(LocalDateTime readAt) {
	        this.readAt = readAt;
	    }

	    public LocalDateTime getCreatedAt() {
	        return createdAt;
	    }

	    public void setCreatedAt(LocalDateTime createdAt) {
	        this.createdAt = createdAt;
	    }
}
