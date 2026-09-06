package com.example.demo.controller;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.StudentSkill;
import com.example.demo.service.StudentSkillService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StudentSkillController {
	private final StudentSkillService studentSkillService;

    public StudentSkillController(
            StudentSkillService studentSkillService) {

        this.studentSkillService = studentSkillService;
    }

    // Add skill to student
    @PostMapping("/student-skills")
    public StudentSkill createStudentSkill(
            @RequestBody StudentSkill studentSkill) {

        return studentSkillService.saveStudentSkill(studentSkill);
    }

    // Get all student skills
    @GetMapping("/student-skills")
    public List<StudentSkill> getAllStudentSkills() {

        return studentSkillService.getAllStudentSkills();
    }
    
    
    
    @GetMapping("/student-skills/student/{studentId}")
    public List<StudentSkill> getStudentSkillsByStudentId(
            @PathVariable("studentId") Long studentId) {

        return studentSkillService.getStudentSkillsByStudentId(studentId);
    }

    // Get a specific student-skill relationship
    @GetMapping("/student-skills/{studentId}/{skillId}")
    public StudentSkill getStudentSkillById(
            @PathVariable("studentId") Long studentId,
            @PathVariable("skillId") Long skillId) {

        return studentSkillService.getStudentSkillById(
                studentId, skillId);
    }

    // Remove skill from student
    @DeleteMapping("/student-skills/{studentId}/{skillId}")
    public String deleteStudentSkill(
            @PathVariable("studentId") Long studentId,
            @PathVariable("skillId") Long skillId) {

        studentSkillService.deleteStudentSkill(studentId, skillId);

        return "Skill removed from student successfully";
    }
}
