package com.example.demo;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name="student_skills")
public class StudentSkill {
	 @EmbeddedId
	    private StudentSkillId id;

	    @ManyToOne
	    @MapsId("studentId")
	    @JoinColumn(name = "student_id", nullable = false)
	    private Student student;

	    @ManyToOne
	    @MapsId("skillId")
	    @JoinColumn(name = "skill_id", nullable = false)
	    private Skill skill;

	    // Default constructor
	    public StudentSkill() {
	    }

	    public StudentSkillId getId() {
	        return id;
	    }

	    public void setId(StudentSkillId id) {
	        this.id = id;
	    }

	    public Student getStudent() {
	        return student;
	    }

	    public void setStudent(Student student) {
	        this.student = student;
	    }

	    public Skill getSkill() {
	        return skill;
	    }

	    public void setSkill(Skill skill) {
	        this.skill = skill;
	    }
}
