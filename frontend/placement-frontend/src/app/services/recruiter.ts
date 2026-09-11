import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface RecruiterData {
  recruiterId: number;
  user: any;
  company: any;
  designation: string;
  phone: string;
  createdAt: string | null;
  updatedAt: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class Recruiter {
  private apiUrl = 'http://localhost:8080/recruiters';

  constructor(private http: HttpClient) { }

  getRecruiterByUserId(userId: number): Observable<RecruiterData> {
    return this.http.get<RecruiterData>(`${this.apiUrl}/user/${userId}`);
  }

  updateRecruiter(id: number, recruiter: any): Observable<RecruiterData> {
    return this.http.put<RecruiterData>(
      `${this.apiUrl}/${id}`,
      recruiter
    );
  }
}
