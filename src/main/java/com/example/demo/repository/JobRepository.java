package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.demo.Job;
public interface JobRepository extends JpaRepository<Job, Long>{
	List<Job> findByRecruiter_RecruiterId(Long recruiterId);
}
