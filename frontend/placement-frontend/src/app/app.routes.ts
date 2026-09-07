import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Component } from '@angular/core';
import { StudentDashboard } from './pages/student-dashboard/student-dashboard';
import { Jobs } from './pages/jobs/jobs';
import { JobDetails } from './pages/job-details/job-details';
import { ApplyJob } from './pages/apply-job/apply-job';
import { MyApplications } from './pages/my-applications/my-applications';
import { RecruiterApplications } from './pages/recruiter-applications/recruiter-applications';
import { RecruiterJobs } from './pages/recruiter-jobs/recruiter-jobs';
import { StudentProfile } from './pages/student-profile/student-profile';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'student-dashboard',
    component: StudentDashboard
  },
  {
    path: 'jobs',
    component: Jobs
  },
  {
    path: 'jobs/:id',
    component: JobDetails
  },
  {
    path: 'jobs/:id/apply',
    component: ApplyJob
  },
  {
    path: 'my-applications',
    component: MyApplications
  },
  {
    path: 'recruiter-applications',
    component: RecruiterApplications
  },
  {
    path: 'recruiter-jobs',
    component: RecruiterJobs
  },
  {
    path: 'student-profile',
    component: StudentProfile
  }
];
