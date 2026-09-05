import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ApplicationData {
  applicationId: number;
  student: any;
  job: any;
  status: string;
  appliedAt: string | null;
  updatedAt: string | null;
  coverLetter: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class Application {
  private apiUrl = 'http://localhost:8080/applications';

  constructor(private http: HttpClient) { }

  createApplication(application: any): Observable<ApplicationData> {
    return this.http.post<ApplicationData>(
      this.apiUrl,
      application
    );
  }

  getAllAplications(): Observable<ApplicationData[]> {
    return this.http.get<ApplicationData[]>(
      this.apiUrl);

  }

  getApplicationById(id: number): Observable<ApplicationData> {
    return this.http.get<ApplicationData>(
      `${this.apiUrl}/${id}`
    );
  }
  deleteApplication(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }
  getApplicationsByStudentId(studentId: number): Observable<ApplicationData[]> {
    return this.http.get<ApplicationData[]>(
      `${this.apiUrl}/student/${studentId}`
    );
  }

  getApplicationsByRecruiterId(recruiterId: number): Observable<ApplicationData[]> {
    return this.http.get<ApplicationData[]>(
      `${this.apiUrl}/recruiter/${recruiterId}`
    );
  }
  updateApplication(
    id: number,
    application: any
  ): Observable<ApplicationData> {
    return this.http.put<ApplicationData>(
      `${this.apiUrl}/${id}`,
      application
    );
  }
}
