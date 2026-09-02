package com.example.demo.controller;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Company;
import com.example.demo.service.CompanyService;

@RestController
public class CompanyController {
	 private final CompanyService companyService;

	    public CompanyController(CompanyService companyService) {
	        this.companyService = companyService;
	    }

	    // Create company
	    @PostMapping("/companies")
	    public Company createCompany(@RequestBody Company company) {
	        return companyService.saveCompany(company);
	    }

	    // Get all companies
	    @GetMapping("/companies")
	    public List<Company> getAllCompanies() {
	        return companyService.getAllCompanies();
	    }

	    // Get company by ID
	    @GetMapping("/companies/{id}")
	    public Company getCompanyById(@PathVariable("id") Long id) {
	        return companyService.getCompanyById(id);
	    }

	    // Update company
	    @PutMapping("/companies/{id}")
	    public Company updateCompany(
	            @PathVariable("id") Long id,
	            @RequestBody Company company) {

	        return companyService.updateCompany(id, company);
	    }

	    // Delete company
	    @DeleteMapping("/companies/{id}")
	    public String deleteCompany(@PathVariable("id") Long id) {

	        companyService.deleteCompany(id);

	        return "Company deleted successfully";
	    }

}
