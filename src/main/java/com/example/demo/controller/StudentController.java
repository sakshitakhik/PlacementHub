package com.example.demo.controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.demo.Student;
import com.example.demo.service.StudentService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class StudentController {
	 private final StudentService studentService;

	    public StudentController(StudentService studentService) {
	        this.studentService = studentService;
	    }

	    @PostMapping("/students")
	    public Student createStudent(@RequestBody Student student) {
	        return studentService.saveStudent(student);
	    }
	    @GetMapping("/students")
	    public List<Student> getAllStudents() {
	        return studentService.getAllStudents();
	    }

	    // Get student by ID
	    @GetMapping("/students/{id}")
	    public Student getStudentById(@PathVariable Long id) {
	        return studentService.getStudentById(id);
	    }
	    
	    @GetMapping("/students/user/{userId}")
	    public Student getStudentByUserId(@PathVariable("userId") Long userId) {
	        return studentService.getStudentByUserId(userId);
	    }

	    // Update student
	    @PutMapping("/students/{id}")
	    public Student updateStudent(@PathVariable Long id,
	                                 @RequestBody Student student) {
	        return studentService.updateStudent(id, student);
	    }

	    // Delete student
	    @DeleteMapping("/students/{id}")
	    public String deleteStudent(@PathVariable Long id) {
	        studentService.deleteStudent(id);
	        return "Student deleted successfully";
	    }
}
