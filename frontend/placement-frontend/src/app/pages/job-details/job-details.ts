import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Job, JobData } from '../../services/job';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-job-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails implements OnInit {
  job: JobData | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: Job
  ) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage = 'Invalid job Id';
      this.isLoading = false;
      return;
    }
    this.loadJob(id);
  }
  loadJob(id: number): void {
    this.jobService.getJobById(id).subscribe({
      next: (data: JobData) => {
        console.log('JOB DETAILS:', data);

        this.job = data;
        this.isLoading = false;
      },

      error: (error) => {
        console.error('ERROR LOADING JOB', error);
        this.errorMessage = 'UNABLE to load job details';
        this.isLoading = false;
      }
    });
  }

}
