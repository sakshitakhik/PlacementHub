package com.example.demo.service;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.demo.Application;
import com.example.demo.DuplicateApplicationException;
import com.example.demo.Job;
import com.example.demo.Notification;
import com.example.demo.repository.ApplicationRepository;
import com.example.demo.repository.JobRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final NotificationService notificationService;
    private final JobRepository jobRepository;

    // Constructor
    public ApplicationService(
            ApplicationRepository applicationRepository,
            NotificationService notificationService,
            JobRepository jobRepository) {

        this.applicationRepository = applicationRepository;
        this.notificationService = notificationService;
        this.jobRepository = jobRepository;
    }

    // Create application
    public Application saveApplication(Application application) {

        Long studentId = application.getStudent().getStudentId();
        Long jobId = application.getJob().getJobId();

        // Check if student has already applied for this job
        boolean alreadyApplied =
                applicationRepository
                        .existsByStudent_StudentIdAndJob_JobId(studentId, jobId);

        if (alreadyApplied) {
            throw new DuplicateApplicationException(
                    "You have already applied for this job."
            );
        }

        application.setAppliedAt(LocalDateTime.now());
        application.setUpdatedAt(LocalDateTime.now());

        Application savedApplication =
                applicationRepository.save(application);

        // Get complete job information from database
        Job job = jobRepository.findById(jobId).orElse(null);

        if (job != null) {

            // Create notification for student
            Notification notification = new Notification();

            notification.setUser(
                    savedApplication.getStudent().getUser()
            );

            notification.setTitle("Application Submitted");

            notification.setMessage(
                    "Your application for the "
                    + job.getTitle()
                    + " position at "
                    + (job.getCompany() != null
                        ? job.getCompany().getName()
                        : "the company")
                    + " has been submitted successfully."
            );

            notification.setType("APPLICATION");
            notification.setIsRead(false);
            notification.setCreatedAt(LocalDateTime.now());

            notificationService.saveNotification(notification);
        }

        return savedApplication;
    }

    // Get all applications
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // Get applications by student
    public List<Application> getApplicationsByStudentId(Long studentId) {
        return applicationRepository.findByStudent_StudentId(studentId);
    }

    // Get applications by recruiter
    public List<Application> getApplicationsByRecruiterId(Long recruiterId) {
        return applicationRepository.findByJob_Recruiter_RecruiterId(recruiterId);
    }

    // Get application by ID
    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id).orElse(null);
    }

    // Update application
    public Application updateApplication(
            Long id,
            Application application) {

        Application existingApplication =
                applicationRepository.findById(id).orElse(null);

        if (existingApplication == null) {
            return null;
        }

        existingApplication.setStudent(application.getStudent());
        existingApplication.setJob(application.getJob());
        existingApplication.setStatus(application.getStatus());
        existingApplication.setCoverLetter(application.getCoverLetter());

        return applicationRepository.save(existingApplication);
    }

    // Delete application
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}