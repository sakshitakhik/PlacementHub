package com.example.demo.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Job;
import com.example.demo.repository.JobRepository;
import com.example.demo.repository.ApplicationRepository;
@Service
public class JobService {
	private final JobRepository jobRepository;
	private final ApplicationRepository applicationRepository;

	public JobService(
	        JobRepository jobRepository,
	        ApplicationRepository applicationRepository) {
	    this.jobRepository = jobRepository;
	    this.applicationRepository = applicationRepository;
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
    public List<Job> getJobsByRecruiterId(Long recruiterId) {
        return jobRepository.findByRecruiter_RecruiterId(recruiterId);
    }
    // Update job
    public Job updateJob(Long id, Job job) {

        Job existingJob = jobRepository.findById(id).orElse(null);

        if (existingJob == null) {
            return null;
        }

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

        return jobRepository.save(existingJob);
    }

    // Delete job
    public void deleteJob(Long id) {

        if (applicationRepository.existsByJob_JobId(id)) {
            throw new IllegalStateException(
                "This job cannot be deleted because candidates have already applied to it."
            );
        }

        jobRepository.deleteById(id);
    }
}
