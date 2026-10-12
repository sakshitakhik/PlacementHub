import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth, User } from '../../services/auth';
import { Notification, NotificationData } from '../../services/notification';

@Component({
  selector: 'app-notifications',
  imports: [RouterLink, DatePipe],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit {

  user: User | null = null;

  notifications: NotificationData[] = [];

  isLoading = true;
  errorMessage = '';

  constructor(
    private notificationService: Notification,
    private auth: Auth
  ) { }

  ngOnInit(): void {

    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.isLoading = false;
      this.errorMessage = 'Please login to view your notifications.';
      return;
    }

    this.loadNotifications();
  }

  loadNotifications(): void {

    this.notificationService
      .getNotificationsByUserId(this.user!.id)
      .subscribe({

        next: (notifications: NotificationData[]) => {

          this.notifications = notifications;

          this.isLoading = false;

          console.log(
            'NOTIFICATIONS PAGE:',
            this.notifications
          );
        },

        error: (error) => {

          console.error(
            'ERROR LOADING NOTIFICATIONS:',
            error
          );

          this.errorMessage =
            'Unable to load notifications.';

          this.isLoading = false;
        }

      });
  }

  getUnreadCount(): number {

    return this.notifications.filter(
      notification => !notification.isRead
    ).length;
  }

  markAsRead(notification: NotificationData): void {

  if (notification.isRead) {
    return;
  }

  this.notificationService
    .markAsRead(notification.notificationId)
    .subscribe({

      next: (updatedNotification: NotificationData) => {

        notification.isRead = updatedNotification.isRead;
        notification.readAt = updatedNotification.readAt;

        console.log(
          'NOTIFICATION MARKED AS READ:',
          updatedNotification
        );

      },

      error: (error) => {

        console.error(
          'ERROR MARKING NOTIFICATION AS READ:',
          error
        );

      }

    });
}
}
