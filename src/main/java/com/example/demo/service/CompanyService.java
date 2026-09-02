package com.example.demo.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Company;
import com.example.demo.repository.CompanyRepository;

@Service
public class CompanyService {
	private final CompanyRepository companyRepository;
	
	public CompanyService(CompanyRepository companyRepository) {
		this.companyRepository=companyRepository;
	}
	//created the company 
	public Company saveCompany(Company company) {
		return companyRepository.save(company);
		
	}
	//to get all the companies
	public List<Company>getAllCompanies(){
		return companyRepository.findAll();
	}
	//to get comapnay by providing id
	public Company getCompanyById(Long id) {
		return companyRepository.findById(id).orElse(null);
	}
	// Update company
    public Company updateCompany(Long id, Company company) {

        Company existingCompany = companyRepository.findById(id).orElse(null);

        if (existingCompany == null) {
            return null;
        }

        existingCompany.setName(company.getName());
        existingCompany.setDescription(company.getDescription());
        existingCompany.setIndustry(company.getIndustry());
        existingCompany.setLocation(company.getLocation());
        existingCompany.setWebsite(company.getWebsite());

        return companyRepository.save(existingCompany);
    }
	 public void deleteCompany(Long id) {
	        companyRepository.deleteById(id);
	    }
	

	}


