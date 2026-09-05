package com.example.demo.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Recruiter;
import com.example.demo.repository.RecruiterRepository;

@Service
public class RecruiterService {
	 private final RecruiterRepository recruiterRepository;

	    public RecruiterService(RecruiterRepository recruiterRepository) {
	        this.recruiterRepository = recruiterRepository;
	    }

	    // Create recruiter
	    public Recruiter saveRecruiter(Recruiter recruiter) {
	        return recruiterRepository.save(recruiter);
	    }

	    // Get all recruiters
	    public List<Recruiter> getAllRecruiters() {
	        return recruiterRepository.findAll();
	    }

	    // Get recruiter by ID
	    public Recruiter getRecruiterById(Long id) {
	        return recruiterRepository.findById(id).orElse(null);
	    }
	    
	    public Recruiter getRecruiterByUserId(Long userId) {
	        return recruiterRepository.findByUser_Id(userId);
	    }

	    // Update recruiter
	    public Recruiter updateRecruiter(Long id, Recruiter recruiter) {

	        Recruiter existingRecruiter =
	                recruiterRepository.findById(id).orElse(null);

	        if (existingRecruiter == null) {
	            return null;
	        }

	        existingRecruiter.setUser(recruiter.getUser());
	        existingRecruiter.setCompany(recruiter.getCompany());
	        existingRecruiter.setDesignation(recruiter.getDesignation());
	        existingRecruiter.setPhone(recruiter.getPhone());

	        return recruiterRepository.save(existingRecruiter);
	    }

	    // Delete recruiter
	    public void deleteRecruiter(Long id) {
	        recruiterRepository.deleteById(id);
	    }
}
