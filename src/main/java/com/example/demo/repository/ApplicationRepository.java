package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.demo.Application;
public interface ApplicationRepository extends JpaRepository<Application,Long>{
	boolean existsByStudent_StudentIdAndJob_JobId(Long studentId,Long jobId);
List<Application> findByStudent_StudentId(Long studentId);
}
