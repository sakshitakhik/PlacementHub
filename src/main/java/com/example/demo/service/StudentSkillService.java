package com.example.demo.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.StudentSkill;
import com.example.demo.StudentSkillId;
import com.example.demo.repository.StudentSkillRepository;

@Service
public class StudentSkillService {
	 private final StudentSkillRepository studentSkillRepository;

	    public StudentSkillService(StudentSkillRepository studentSkillRepository) {
	        this.studentSkillRepository = studentSkillRepository;
	    }

	    // Add skill to student
	    public StudentSkill saveStudentSkill(StudentSkill studentSkill) {
	        return studentSkillRepository.save(studentSkill);
	    }

	    // Get all student skills
	    public List<StudentSkill> getAllStudentSkills() {
	        return studentSkillRepository.findAll();
	    }
	 // Get all skills of a specific student
	    public List<StudentSkill> getStudentSkillsByStudentId(Long studentId) {
	        return studentSkillRepository.findByStudent_StudentId(studentId);
	    }
	    // Get student skill by composite ID
	    public StudentSkill getStudentSkillById(
	            Long studentId, Long skillId) {

	        StudentSkillId id =
	                new StudentSkillId(studentId, skillId);

	        return studentSkillRepository.findById(id).orElse(null);
	    }

	    // Delete skill from student
	    public void deleteStudentSkill(
	            Long studentId, Long skillId) {

	        StudentSkillId id =
	                new StudentSkillId(studentId, skillId);

	        studentSkillRepository.deleteById(id);
	    }
}
