import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Application, ApplicationData } from '../../services/application';
import { Auth, User } from '../../services/auth';
import { Recruiter, RecruiterData } from '../../services/recruiter';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recruiter-applications',
  imports: [CommonModule, FormsModule],
  templateUrl: './recruiter-applications.html',
  styleUrl: './recruiter-applications.css',
})
export class RecruiterApplications implements OnInit {
  applications: ApplicationData[] = [];
  selectedStatuses: { [key: number]: string } = {};
  user: User | null = null;
  recruiter: RecruiterData | null = null;

  isLoading = true;
  errorMessage = '';
  constructor(
    private applicationService: Application,
    private auth: Auth,
    private recruiterService: Recruiter
  ) { }
  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.isLoading = false;
      this.errorMessage = 'Please login as a recruiter.';
      return;
    }

    this.recruiterService.getRecruiterByUserId(this.user.id).subscribe({
      next: (data: RecruiterData) => {
        this.recruiter = data;
        this.loadApplications(data.recruiterId);
      },
      error: () => {
        this.errorMessage = 'Unable to load recruiter information.';
        this.isLoading = false;
      }
    });
  }
  loadApplications(recruiterId: number): void {
    this.applicationService
      .getApplicationsByRecruiterId(recruiterId)
      .subscribe({
        next: (data: ApplicationData[]) => {
          this.applications = data;

          data.forEach(application => {
            this.selectedStatuses[application.applicationId] = application.status;
          });

          this.isLoading = false;
          console.log('RECRUITER APPLICATIONS:', data);
        },
        error: (error) => {
          console.error('ERROR LOADING RECRUITER APPLICATIONS:', error);
          this.errorMessage = 'Unable to load applications.';
          this.isLoading = false;
        }
      });
  }
  updateStatus(application: ApplicationData): void {
    const newStatus = this.selectedStatuses[application.applicationId];

    if (!newStatus || newStatus === application.status) {
      return;
    }

    const updatedApplication = {
      student: {
        studentId: application.student.studentId
      },
      job: {
        jobId: application.job.jobId
      },
      status: newStatus,
      coverLetter: application.coverLetter
    };

    this.applicationService
      .updateApplication(application.applicationId, updatedApplication)
      .subscribe({
        next: (data: ApplicationData) => {
          application.status = data.status;
          this.selectedStatuses[application.applicationId] = data.status;
        },
        error: (error) => {
          console.error('ERROR UPDATING STATUS:', error);
          this.errorMessage = 'Unable to update application status.';
        }
      });
  }
}
