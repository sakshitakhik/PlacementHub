package com.example.demo.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Skill;
import com.example.demo.repository.SkillRepository;

@Service
public class SkillService {
	 private final SkillRepository skillRepository;

	    public SkillService(SkillRepository skillRepository) {
	        this.skillRepository = skillRepository;
	    }

	    // Create skill
	    public Skill saveSkill(Skill skill) {
	        return skillRepository.save(skill);
	    }

	    // Get all skills
	    public List<Skill> getAllSkills() {
	        return skillRepository.findAll();
	    }

	    // Get skill by ID
	    public Skill getSkillById(Long id) {
	        return skillRepository.findById(id).orElse(null);
	    }

	    // Update skill
	    public Skill updateSkill(Long id, Skill skill) {

	        Skill existingSkill = skillRepository.findById(id).orElse(null);

	        if (existingSkill == null) {
	            return null;
	        }

	        existingSkill.setName(skill.getName());

	        return skillRepository.save(existingSkill);
	    }

	    // Delete skill
	    public void deleteSkill(Long id) {
	        skillRepository.deleteById(id);
	    }
}
