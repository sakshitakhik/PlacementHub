import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Component } from '@angular/core';
import { StudentDashboard } from './pages/student-dashboard/student-dashboard';
import { Jobs } from './pages/jobs/jobs';
import { JobDetails } from './pages/job-details/job-details';
import { ApplyJob } from './pages/apply-job/apply-job';

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
  }
];
