import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Student {
  studentId: number;
  user: any;
  phone: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  college: string | null;
  branch: string | null;
  graduationYear: number | null;
  cgpa: number | null;
  resumeUrl: string | null;
  profileSummary: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class Student {
  private apiUrl = 'http://localhost:8080/students';

  constructor(private http: HttpClient) { }

  getStudentByUserId(userId: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/user/${userId}`);
  }
}
