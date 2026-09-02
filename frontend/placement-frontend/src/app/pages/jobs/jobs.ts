import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Job } from '../../services/job';
@Component({
  selector: 'app-jobs',
  imports: [RouterLink, CommonModule],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
})
export class Jobs implements OnInit {
  jobs: Job[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private jobService: Job) { }
  ngOnInit(): void {
    this.loadJobs();
  }
  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data: Job[]) => {
        console.log('JOBS RECEIVED', data);
        this.jobs = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('ERROR LOADING JOBS:', error);
        this.errorMessage = 'Unable to load jobs.';
        this.isLoading = false;
      }
    });
  }
}
