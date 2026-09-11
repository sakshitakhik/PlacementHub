import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, User } from '../../services/auth';
import { Application, ApplicationData } from '../../services/application';
import { Student, StudentData } from '../../services/student';

@Component({
  selector: 'app-student-dashboard',
  imports: [RouterLink],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboard implements OnInit {

  user: User | null = null;
  student: StudentData | null = null;

  applications: ApplicationData[] = [];

  totalApplications = 0;
  shortlistedApplications = 0;
  interviewApplications = 0;

  constructor(
    private auth: Auth,
    private router: Router,
    private studentService: Student,
    private applicationService: Application
  ) { }

  ngOnInit(): void {

    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadDashboardData();
  }


  loadDashboardData(): void {

    this.studentService.getStudentByUserId(this.user!.id).subscribe({

      next: (studentData: StudentData) => {

        this.student = studentData;

        this.applicationService
          .getApplicationsByStudentId(studentData.studentId)
          .subscribe({

            next: (applications: ApplicationData[]) => {

              this.applications = applications;

              this.totalApplications = applications.length;

              this.shortlistedApplications = applications.filter(
                application => application.status === 'SHORTLISTED'
              ).length;

              this.interviewApplications = applications.filter(
                application => application.status === 'INTERVIEW'
              ).length;

              console.log('STUDENT DASHBOARD APPLICATIONS:', applications);
              console.log('TOTAL APPLICATIONS:', this.totalApplications);
              console.log('SHORTLISTED:', this.shortlistedApplications);
              console.log('INTERVIEWS:', this.interviewApplications);
            },

            error: (error) => {
              console.error(
                'ERROR LOADING STUDENT APPLICATIONS:',
                error
              );
            }

          });
      },

      error: (error) => {
        console.error(
          'ERROR LOADING STUDENT PROFILE:',
          error
        );
      }

    });
  }


  logout(): void {

    this.auth.logout();

    this.router.navigate(['/login']);

  }

}