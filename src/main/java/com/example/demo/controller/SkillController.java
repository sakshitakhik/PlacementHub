package com.example.demo.controller;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Skill;
import com.example.demo.service.SkillService;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SkillController {
	 private final SkillService skillService;

	    public SkillController(SkillService skillService) {
	        this.skillService = skillService;
	    }

	    // Create skill
	    @PostMapping("/skills")
	    public Skill createSkill(@RequestBody Skill skill) {
	        return skillService.saveSkill(skill);
	    }

	    // Get all skills
	    @GetMapping("/skills")
	    public List<Skill> getAllSkills() {
	        return skillService.getAllSkills();
	    }

	    // Get skill by ID
	    @GetMapping("/skills/{id}")
	    public Skill getSkillById(@PathVariable("id") Long id) {
	        return skillService.getSkillById(id);
	    }

	    // Update skill
	    @PutMapping("/skills/{id}")
	    public Skill updateSkill(
	            @PathVariable("id") Long id,
	            @RequestBody Skill skill) {

	        return skillService.updateSkill(id, skill);
	    }

	    // Delete skill
	    @DeleteMapping("/skills/{id}")
	    public String deleteSkill(@PathVariable("id") Long id) {

	        skillService.deleteSkill(id);

	        return "Skill deleted successfully";
	    }
}
