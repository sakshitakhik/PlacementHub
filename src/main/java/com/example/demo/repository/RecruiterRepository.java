
package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Recruiter;

public interface RecruiterRepository
        extends JpaRepository<Recruiter, Long> {

    Recruiter findByUser_Id(Long userId);
}
