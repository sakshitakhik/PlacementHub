package com.example.demo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "skills")
public class Skill {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "id")
	    private Long skillId;

	    @Column(name = "name", nullable = false, unique = true, length = 100)
	    private String name;

	    // Default constructor
	    public Skill() {
	    }

	    public Long getSkillId() {
	        return skillId;
	    }

	    public void setSkillId(Long skillId) {
	        this.skillId = skillId;
	    }

	    public String getName() {
	        return name;
	    }

	    public void setName(String name) {
	        this.name = name;
	    }
}
