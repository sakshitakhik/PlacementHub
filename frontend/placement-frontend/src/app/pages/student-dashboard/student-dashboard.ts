import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, User } from '../../services/auth';
import { Application, ApplicationData } from '../../services/application';
import { Student, StudentData } from '../../services/student';
import { Job } from '../../services/job';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Notification, NotificationData } from '../../services/notification';
@Component({
  selector: 'app-student-dashboard',
  imports: [RouterLink, DecimalPipe, DatePipe],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboard implements OnInit {

  user: User | null = null;
  student: StudentData | null = null;
  profileCompletion = 0;

  applications: ApplicationData[] = [];
  recommendedJobs: any[] = [];

  notifications: NotificationData[] = [];
  unreadNotifications = 0;

  totalApplications = 0;
  shortlistedApplications = 0;
  interviewApplications = 0;

  constructor(
    private auth: Auth,
    private router: Router,
    private studentService: Student,
    private applicationService: Application,
    private jobService: Job,
    private notificationService: Notification
  ) { }

  ngOnInit(): void {

    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadDashboardData();
    this.loadRecommendedJobs();
    this.loadNotifications();
  }




  loadDashboardData(): void {

    this.studentService.getStudentByUserId(this.user!.id).subscribe({

      next: (studentData: StudentData) => {

        this.student = studentData;
        this.calculateProfileCompletion();
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




  loadRecommendedJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (jobs: any[]) => {
        this.recommendedJobs = jobs.slice(0, 3);
        console.log('RECOMMENDED JOBS:', this.recommendedJobs);
      },
      error: (error) => {
        console.error('ERROR LOADING RECOMMENDED JOBS:', error);
      }
    });
  }



  loadNotifications(): void {
    if (!this.user) {
      return;
    }

    this.notificationService
      .getNotificationsByUserId(this.user.id)
      .subscribe({
        next: (notifications: NotificationData[]) => {
          this.notifications = notifications;

          this.unreadNotifications = notifications.filter(
            notification => !notification.isRead
          ).length;

          console.log('STUDENT NOTIFICATIONS:', notifications);
          console.log('UNREAD NOTIFICATIONS:', this.unreadNotifications);
        },
        error: (error) => {
          console.error('ERROR LOADING NOTIFICATIONS:', error);
        }
      });
  }



  calculateProfileCompletion(): void {
    if (!this.student) {
      this.profileCompletion = 0;
      return;
    }

    const fields = [
      this.student.college,
      this.student.branch,
      this.student.graduationYear,
      this.student.cgpa,
      this.student.dateOfBirth
    ];

    const completedFields = fields.filter(
      field => field !== null && field !== undefined && field !== ''
    ).length;

    this.profileCompletion = Math.round(
      (completedFields / fields.length) * 100
    );
  }


  logout(): void {

    this.auth.logout();

    this.router.navigate(['/login']);

  }

}