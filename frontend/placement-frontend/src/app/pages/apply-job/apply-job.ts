import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Job } from '../../services/job';
import { Auth, User } from '../../services/auth';
import { Application } from '../../services/application';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Student } from '../../services/student';
@Component({
  selector: 'app-apply-job',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './apply-job.html',
  styleUrl: './apply-job.css',
})
export class ApplyJob implements OnInit {

  job: Job | null = null;
  user: User | null = null;
  student: Student | null = null;
  coverLetter = '';
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: Job,
    private applicationService: Application,
    private auth: Auth,
    private studentService: Student
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    this.studentService.getStudentByUserId(this.user.id).subscribe({
      next: (data: Student) => {
        this.student = data;
        console.log('LOGGED IN STUDENT:', data);


        const jobId = Number(this.route.snapshot.paramMap.get('id'));

        if (!jobId) {
          this.errorMessage = 'invalid job id';
          this.isLoading = false;
          return;

        }
        this.loadJob(jobId);
      },

      error: (error) => {
        console.error('ERROR LOADING JOB:', error);
        this.errorMessage = 'Unable to load job details.';
        this.isLoading = false;
      }
    });
  }


  // Load job details
  loadJob(jobId: number): void {

    this.jobService.getJobById(jobId).subscribe({

      next: (data: Job) => {

        this.job = data;

        this.isLoading = false;

        console.log('JOB:', data);
      },

      error: (error) => {

        console.error('ERROR LOADING JOB:', error);

        this.errorMessage =
          'Unable to load job details.';

        this.isLoading = false;
      }
    });
  }

  submitApplication(): void {
    if (!this.job || !this.user) {
      return;
    }
    if (!this.coverLetter.trim()) {
      this.errorMessage = 'please enter a cover letter';
      return;
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;
    if (!this.student) {
      this.errorMessage = 'Student information not available.';
      this.isSubmitting = false;
      return;
    }

    const application = {
      student: {
        studentId: this.student.studentId
      },
      job: {
        jobId: this.job.jobId
      },
      status: 'APPLIED',
      coverLetter: this.coverLetter.trim()
    };
    this.applicationService.createApplication(application).subscribe({
      next: (response) => {
        console.log('APPLICATION CREATED:', response);

        this.isSubmitting = false;
        this.successMessage = 'Application submitted successfully!';

        setTimeout(() => {
          this.router.navigate(['/student-dashboard']);
        }, 1500);
      },
      error: (error) => {
        console.error('ERROR SUBMITTING APPLICATION:', error);

        this.isSubmitting = false;
        this.errorMessage = 'Unable to submit application. Please try again.';
      }
    });
  }
}





