package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Application;
import com.example.demo.DuplicateApplicationException;
import com.example.demo.repository.ApplicationRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    // Constructor
    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
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

        return applicationRepository.save(application);
    }

    // Get all applications
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
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