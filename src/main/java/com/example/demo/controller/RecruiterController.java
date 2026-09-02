package com.example.demo.controller;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Recruiter;
import com.example.demo.service.RecruiterService;

@RestController
public class RecruiterController {
	 private final RecruiterService recruiterService;

	    public RecruiterController(RecruiterService recruiterService) {
	        this.recruiterService = recruiterService;
	    }

	    // Create recruiter
	    @PostMapping("/recruiters")
	    public Recruiter createRecruiter(@RequestBody Recruiter recruiter) {
	        return recruiterService.saveRecruiter(recruiter);
	    }

	    // Get all recruiters
	    @GetMapping("/recruiters")
	    public List<Recruiter> getAllRecruiters() {
	        return recruiterService.getAllRecruiters();
	    }

	    // Get recruiter by ID
	    @GetMapping("/recruiters/{id}")
	    public Recruiter getRecruiterById(@PathVariable("id") Long id) {
	        return recruiterService.getRecruiterById(id);
	    }

	    // Update recruiter
	    @PutMapping("/recruiters/{id}")
	    public Recruiter updateRecruiter(
	            @PathVariable("id") Long id,
	            @RequestBody Recruiter recruiter) {

	        return recruiterService.updateRecruiter(id, recruiter);
	    }

	    // Delete recruiter
	    @DeleteMapping("/recruiters/{id}")
	    public String deleteRecruiter(@PathVariable("id") Long id) {

	        recruiterService.deleteRecruiter(id);

	        return "Recruiter deleted successfully";
	    }
}
