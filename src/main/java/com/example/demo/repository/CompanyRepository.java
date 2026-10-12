
package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Company;

public interface CompanyRepository
        extends JpaRepository<Company, Long> {

    Company findByNameIgnoreCase(String name);
}
