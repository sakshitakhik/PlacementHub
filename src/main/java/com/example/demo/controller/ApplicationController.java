package com.example.demo.controller;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Application;
import com.example.demo.service.ApplicationService;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class ApplicationController {
	private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Create application
    @PostMapping("/applications")
    public Application createApplication(
            @RequestBody Application application) {

        return applicationService.saveApplication(application);
    }

    // Get all applications
    @GetMapping("/applications")
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    // Get application by ID
    @GetMapping("/applications/{id}")
    public Application getApplicationById(
            @PathVariable("id") Long id) {

        return applicationService.getApplicationById(id);
    }

    // Update application
    @PutMapping("/applications/{id}")
    public Application updateApplication(
            @PathVariable("id") Long id,
            @RequestBody Application application) {

        return applicationService.updateApplication(id, application);
    }

    // Delete application
    @DeleteMapping("/applications/{id}")
    public String deleteApplication(
            @PathVariable("id") Long id) {

        applicationService.deleteApplication(id);

        return "Application deleted successfully";
    }
}
