package com.example.demo;

public class RegistrationRequest {




    // Common account fields
    private String name;
    private String email;
    private String password;
    private String role;

    // Student fields
    private String phone;
    private String college;
    private String branch;
    private Integer graduationYear;

    // Recruiter and company fields
    private String companyName;
    private String industry;
    private String location;
    private String website;
    private String designation;

    public RegistrationRequest() {
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) {
        this.graduationYear = graduationYear;
    }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getLocation() { return location; }
    public void setLocation(String location) {
        this.location = location;
    }

    public String getWebsite() { return website; }
    public void setWebsite(String website) {
        this.website = website;
    }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
