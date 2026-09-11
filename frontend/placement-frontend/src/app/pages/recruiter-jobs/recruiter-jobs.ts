import { Component, OnInit } from '@angular/core';
import { Job } from '../../services/job';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '../../services/auth';
import { Recruiter } from '../../services/recruiter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recruiter-jobs',
  imports: [CommonModule, FormsModule],
  templateUrl: './recruiter-jobs.html',
  styleUrl: './recruiter-jobs.css',
})
export class RecruiterJobs implements OnInit {
  showJobForm = false;
  editingJobId: number | null = null;
  newJob = {
    title: '',
    description: '',
    location: '',
    employmentType: 'Full-time',
    salaryMin: null,
    salaryMax: null,
    minCgpa: null,
    graduationYear: null,
    applicationDeadline: ''
  };

  user: User | null = null;
  recruiter: any = null;

  jobs: any[] = [];
  isLoading = true;
  errorMessage = '';
  constructor(private jobService: Job,
    private auth: Auth,
    private recruiterService: Recruiter,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.isLoading = false;
      this.errorMessage = 'Please login as a recruiter.';
      return;
    }

    this.recruiterService.getRecruiterByUserId(this.user.id).subscribe({
      next: (data) => {
        this.recruiter = data;
        this.loadJobs();
        const newJob = this.route.snapshot.queryParamMap.get('new');

        if (newJob === 'true') {
          this.openJobForm();
        }
      },
      error: () => {
        this.errorMessage = 'Unable to load recruiter information.';
        this.isLoading = false;
      }
    });
  }
  loadJobs(): void {
    this.jobService.getJobsByRecruiterId(this.recruiter.recruiterId).subscribe({
      next: (data: any[]) => {
        this.jobs = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('ERROR LOADING JOBS:', error);
        this.errorMessage = 'Unable to load your jobs.';
        this.isLoading = false;
      }
    });
  }


  openJobForm(): void {
    console.log('POST JOB BUTTON CLICKED');
    this.editingJobId = null;
    this.showJobForm = true;
    console.log('showJobForm:', this.showJobForm);
  }
  editJob(job: any): void {
    this.editingJobId = job.jobId;

    this.newJob = {
      title: job.title,
      description: job.description,
      location: job.location,
      employmentType: job.employmentType,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      minCgpa: job.minCgpa,
      graduationYear: job.graduationYear,
      applicationDeadline: job.applicationDeadline
    };

    this.showJobForm = true;
  }

  postJob(): void {
    console.log('POST JOB STARTED');
    console.log('RECRUITER:', this.recruiter);
    if (this.editingJobId !== null) {
      this.updateJob();
      return;
    }

    if (!this.recruiter) {
      this.errorMessage = 'Recruiter information is not available.';
      return;
    }
    const jobData = {
      title: this.newJob.title,
      description: this.newJob.description,
      location: this.newJob.location,
      employmentType: this.newJob.employmentType,
      salaryMin: this.newJob.salaryMin,
      salaryMax: this.newJob.salaryMax,
      minCgpa: this.newJob.minCgpa,
      graduationYear: this.newJob.graduationYear,
      applicationDeadline: this.newJob.applicationDeadline,
      status: 'OPEN',
      company: {
        companyId: this.recruiter.company.companyId
      },
      recruiter: {
        recruiterId: this.recruiter.recruiterId
      }
    };

    this.jobService.createJob(jobData).subscribe({
      next: (createdJob) => {
        this.jobs.unshift(createdJob);
        this.showJobForm = false;

        this.newJob = {
          title: '',
          description: '',
          location: '',
          employmentType: 'Full-time',
          salaryMin: null,
          salaryMax: null,
          minCgpa: null,
          graduationYear: null,
          applicationDeadline: ''
        };
      },
      error: (error) => {
        console.error('ERROR CREATING JOB:', error);
        this.errorMessage = 'Unable to post the job.';
      }
    });
  }

  updateJob(): void {
    if (this.editingJobId === null) {
      return;
    }

    const jobData = {
      title: this.newJob.title,
      description: this.newJob.description,
      location: this.newJob.location,
      employmentType: this.newJob.employmentType,
      salaryMin: this.newJob.salaryMin,
      salaryMax: this.newJob.salaryMax,
      minCgpa: this.newJob.minCgpa,
      graduationYear: this.newJob.graduationYear,
      applicationDeadline: this.newJob.applicationDeadline
    };

    this.jobService.updateJob(this.editingJobId, jobData).subscribe({
      next: (updatedJob) => {

        const index = this.jobs.findIndex(
          job => job.jobId === this.editingJobId
        );

        if (index !== -1) {
          this.jobs[index] = updatedJob;
        }

        this.showJobForm = false;
        this.editingJobId = null;

      },
      error: (error) => {
        console.error('ERROR UPDATING JOB:', error);
        this.errorMessage = 'Unable to update the job.';
      }
    });
  }



  deleteJob(jobId: number): void {
    const confirmed = confirm('Are you sure you want to delete this job?');

    if (!confirmed) {
      return;
    }

    this.jobService.deleteJob(jobId).subscribe({
      next: () => {
        this.jobs = this.jobs.filter(
          job => job.jobId !== jobId
        );

        this.errorMessage = '';
      },
      error: (error) => {
        console.error('ERROR DELETING JOB:', error);

        if (error.status === 409 && error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Unable to delete the job.';
        }
      }
    });
  }
}
