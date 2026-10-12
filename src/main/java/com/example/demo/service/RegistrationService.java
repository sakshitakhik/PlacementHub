


package com.example.demo.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Company;
import com.example.demo.Recruiter;
import com.example.demo.Student;
import com.example.demo.User;
import com.example.demo.RegistrationRequest;
import com.example.demo.repository.CompanyRepository;
import com.example.demo.repository.RecruiterRepository;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final RecruiterRepository recruiterRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    public RegistrationService(
            UserRepository userRepository,
            StudentRepository studentRepository,
            RecruiterRepository recruiterRepository,
            CompanyRepository companyRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.recruiterRepository = recruiterRepository;
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public String register(RegistrationRequest request) {

        if (request.getName() == null || request.getName().isBlank()
                || request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()
                || request.getRole() == null || request.getRole().isBlank()) {
            throw new IllegalArgumentException(
                    "Name, email, password and account type are required.");
        }

        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.findByEmail(email) != null) {
            throw new IllegalArgumentException(
                    "An account with this email already exists.");
        }

        String role = request.getRole().trim().toUpperCase();

        if (!role.equals("STUDENT") && !role.equals("RECRUITER")) {
            throw new IllegalArgumentException(
                    "Account type must be STUDENT or RECRUITER.");
        }

        LocalDateTime now = LocalDateTime.now();

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(email);

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setStatus("ACTIVE");
        user.setCreatedAt(now);

        user = userRepository.save(user);

        if ("STUDENT".equals(role)) {

            Student student = new Student();
            student.setUser(user);
            student.setPhone(request.getPhone());
            student.setCollege(request.getCollege());
            student.setBranch(request.getBranch());
            student.setGraduationYear(request.getGraduationYear());
            student.setCreatedAt(now);
            student.setUpdatedAt(now);

            studentRepository.save(student);

            return "Student registered successfully.";

        } else {

            if (request.getCompanyName() == null
                    || request.getCompanyName().isBlank()) {
                throw new IllegalArgumentException(
                        "Company name is required for recruiter registration.");
            }

            String companyName = request.getCompanyName().trim();

            Company company =
                    companyRepository.findByNameIgnoreCase(companyName);

            if (company == null) {
                company = new Company();
                company.setName(companyName);
                company.setIndustry(request.getIndustry());
                company.setLocation(request.getLocation());
                company.setWebsite(request.getWebsite());
                company.setCreatedAt(now);
                company.setUpdatedAt(now);

                company = companyRepository.save(company);
            }

            Recruiter recruiter = new Recruiter();
            recruiter.setUser(user);
            recruiter.setCompany(company);
            recruiter.setDesignation(request.getDesignation());
            recruiter.setPhone(request.getPhone());
            recruiter.setCreatedAt(now);
            recruiter.setUpdatedAt(now);

            recruiterRepository.save(recruiter);

            return "Recruiter registered successfully.";
        }
    }

}
