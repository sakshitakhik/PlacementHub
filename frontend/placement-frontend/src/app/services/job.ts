import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Company {
  companyId: number;
  name: string;
  description: string;
  industry: string;
  location: string;
  website: string;
  createdAt: string | null;
  updatedAt: string | null;
}
export interface Recruiter {
  recruiterId: number;
  designation: string;
  phone: string;
  company: Company;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string | null;
  };
  createdAt: string | null;
  updatedAt: string | null;
}

export interface JobData {
  jobId: number;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  salaryMin: number;
  salaryMax: number;
  minCgpa: number;
  experienceRequired: string;
  graduationYear: number;
  applicationDeadline: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  company: Company;
  recruiter: Recruiter;
}
@Injectable({
  providedIn: 'root',
})
export class Job {
  private apiUrl = 'http://localhost:8080/jobs';
  constructor(private http: HttpClient) { }
  getAllJobs(): Observable<JobData[]> {
    return this.http.get<JobData[]>(this.apiUrl);

  }
  getJobById(id: number): Observable<JobData> {
    return this.http.get<JobData>(`${this.apiUrl}/${id}`);

  }
  getJobsByRecruiterId(recruiterId: number): Observable<JobData[]> {
    return this.http.get<JobData[]>(
      `${this.apiUrl}/recruiter/${recruiterId}`
    );
  }
  createJob(job: any): Observable<JobData> {
    return this.http.post<JobData>(this.apiUrl, job);
  }
  updateJob(id: number, job: any): Observable<JobData> {
    return this.http.put<JobData>(`${this.apiUrl}/${id}`, job);
  }
  deleteJob(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }
}
