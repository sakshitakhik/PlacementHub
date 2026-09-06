package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.demo.StudentSkill;
import com.example.demo.StudentSkillId;
public interface StudentSkillRepository extends JpaRepository<StudentSkill, StudentSkillId>{
	List<StudentSkill> findByStudent_StudentId(Long studentId);
}
