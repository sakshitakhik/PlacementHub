import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NotificationData {
  notificationId: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string | null;
  };
}

@Injectable({
  providedIn: 'root'
})
export class Notification {

  private apiUrl = 'http://localhost:8080/notifications';

  constructor(private http: HttpClient) { }

  getNotificationsByUserId(
    userId: number
  ): Observable<NotificationData[]> {

    return this.http.get<NotificationData[]>(
      `${this.apiUrl}/user/${userId}`
    );
  }

  markAsRead(
    notificationId: number
  ): Observable<NotificationData> {

    return this.http.put<NotificationData>(
      `${this.apiUrl}/${notificationId}/read`,
      {}
    );
  }
}