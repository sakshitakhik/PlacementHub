import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Application } from '../../services/application';
import { Auth, User } from '../../services/auth';
import { ApplicationData } from '../../services/application';
import { Student, StudentData } from '../../services/student';
@Component({
  selector: 'app-my-applications',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css',
})
export class MyApplications implements OnInit {

  applications: ApplicationData[] = [];
  user: User | null = null;
  student: StudentData | null = null;

  isLoading = true;
  errorMessage = '';

  constructor(
    private applicationService: Application,
    private auth: Auth,
    private studentService: Student,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.isLoading = false;
      this.errorMessage = 'Please login to view your applications.';
      return;
    }

    this.studentService.getStudentByUserId(this.user.id).subscribe({
      next: (data: StudentData) => {
        this.student = data;
        this.loadApplications(data.studentId);
      },
      error: () => {
        this.errorMessage = 'Unable to load your student information.';
        this.isLoading = false;
      }
    });
  }

  loadApplications(studentId: number): void {
    this.applicationService
      .getApplicationsByStudentId(studentId)
      .subscribe({
        next: (data: ApplicationData[]) => {
          this.applications = data;
          this.isLoading = false;

          console.log('MY APPLICATIONS:', data);
        },
        error: (error) => {
          console.error(
            'ERROR LOADING APPLICATIONS:',
            error
          );

          this.errorMessage =
            'Unable to load your applications.';
          this.isLoading = false;
        }
      });
  }
  withdrawApplication(applicationId: number): void {
    this.applicationService.deleteApplication(applicationId).subscribe({
      next: () => {
        this.applications = this.applications.filter(
          app => app.applicationId !== applicationId
        );
      },
      error: (error) => {
        console.error('ERROR WITHDRAWING APPLICATION:', error);
        this.errorMessage = 'Unable to withdraw application.';
      }
    });
  }
}
