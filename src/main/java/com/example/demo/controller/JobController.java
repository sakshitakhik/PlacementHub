package com.example.demo.controller;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Job;
import com.example.demo.service.JobService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class JobController {
	private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Create job
    @PostMapping("/jobs")
    public Job createJob(@RequestBody Job job) {
        return jobService.saveJob(job);
    }

    // Get all jobs
    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Get job by ID
    @GetMapping("/jobs/{id}")
    public Job getJobById(@PathVariable("id") Long id) {
        return jobService.getJobById(id);
    }

    // Update job
    @PutMapping("/jobs/{id}")
    public Job updateJob(
            @PathVariable("id") Long id,
            @RequestBody Job job) {

        return jobService.updateJob(id, job);
    }

    // Delete job
    @DeleteMapping("/jobs/{id}")
    public String deleteJob(@PathVariable("id") Long id) {

        jobService.deleteJob(id);

        return "Job deleted successfully";
    }
}
