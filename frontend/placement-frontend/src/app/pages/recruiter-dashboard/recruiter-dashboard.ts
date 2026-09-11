import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth, User } from '../../services/auth';
import { Recruiter, RecruiterData } from '../../services/recruiter';
import { Job, JobData } from '../../services/job';
import { Application, ApplicationData } from '../../services/application';

@Component({
  selector: 'app-recruiter-dashboard',
  imports: [RouterLink, CommonModule],
  templateUrl: './recruiter-dashboard.html',
  styleUrl: './recruiter-dashboard.css'
})
export class RecruiterDashboard implements OnInit {

  user: User | null = null;
  recruiter: RecruiterData | null = null;

  jobs: JobData[] = [];
  applications: ApplicationData[] = [];

  isLoading = true;
  errorMessage = '';

  jobsLoading = true;
  applicationsLoading = true;


  constructor(
    private auth: Auth,
    private recruiterService: Recruiter,
    private jobService: Job,
    private applicationService: Application
  ) { }


  ngOnInit(): void {

    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.isLoading = false;
      this.errorMessage = 'Please login as recruiter.';
      return;
    }

    this.recruiterService.getRecruiterByUserId(this.user.id).subscribe({

      next: (data: RecruiterData) => {

        this.recruiter = data;

        this.loadDashboardData(data.recruiterId);
      },

      error: () => {

        this.errorMessage = 'Unable to load recruiter information.';
        this.isLoading = false;

      }

    });
  }


  loadDashboardData(recruiterId: number): void {

    // Load recruiter's jobs
    this.jobService.getJobsByRecruiterId(recruiterId).subscribe({

      next: (data: JobData[]) => {

        this.jobs = data;

        this.jobsLoading = false;

        this.checkLoadingComplete();
      },

      error: (error) => {

        console.error('ERROR LOADING RECRUITER JOBS:', error);

        this.errorMessage = 'Unable to load jobs.';

        this.jobsLoading = false;

        this.checkLoadingComplete();
      }

    });


    // Load applications received by recruiter
    this.applicationService
      .getApplicationsByRecruiterId(recruiterId)
      .subscribe({

        next: (data: ApplicationData[]) => {

          this.applications = data;

          this.applicationsLoading = false;

          this.checkLoadingComplete();
        },

        error: (error) => {

          console.error(
            'ERROR LOADING RECRUITER APPLICATIONS:',
            error
          );

          this.errorMessage = 'Unable to load applications.';

          this.applicationsLoading = false;

          this.checkLoadingComplete();
        }

      });
  }


  checkLoadingComplete(): void {

    if (!this.jobsLoading && !this.applicationsLoading) {

      this.isLoading = false;

    }
  }


  getShortlistedCount(): number {

    return this.applications.filter(
      application => application.status === 'SHORTLISTED'
    ).length;
  }


  getSelectedCount(): number {

    return this.applications.filter(
      application => application.status === 'SELECTED'
    ).length;
  }


  getRecentApplications(): ApplicationData[] {

    return this.applications.slice(0, 5);

  }

}