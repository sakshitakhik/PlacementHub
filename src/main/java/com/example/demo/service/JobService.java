package com.example.demo.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Job;
import com.example.demo.repository.JobRepository;

@Service
public class JobService {
	private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // Create job
    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    // Get all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Get job by ID
    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    // Update job
    public Job updateJob(Long id, Job job) {

        Job existingJob = jobRepository.findById(id).orElse(null);

        if (existingJob == null) {
            return null;
        }

        existingJob.setCompany(job.getCompany());
        existingJob.setRecruiter(job.getRecruiter());
        existingJob.setTitle(job.getTitle());
        existingJob.setDescription(job.getDescription());
        existingJob.setLocation(job.getLocation());
        existingJob.setEmploymentType(job.getEmploymentType());
        existingJob.setSalaryMin(job.getSalaryMin());
        existingJob.setSalaryMax(job.getSalaryMax());
        existingJob.setMinCgpa(job.getMinCgpa());
        existingJob.setExperienceRequired(job.getExperienceRequired());
        existingJob.setGraduationYear(job.getGraduationYear());
        existingJob.setApplicationDeadline(job.getApplicationDeadline());
        existingJob.setStatus(job.getStatus());

        return jobRepository.save(existingJob);
    }

    // Delete job
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
