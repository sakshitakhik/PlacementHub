package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.example.demo.Student;
import com.example.demo.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Create student
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    // Get student by user ID
    public Student getStudentByUserId(Long userId) {
        return studentRepository.findByUser_Id(userId);
    }

    // Update student
    public Student updateStudent(Long id, Student student) {

        Student existingStudent =
                studentRepository.findById(id).orElse(null);

        if (existingStudent != null) {

            //existingStudent.setUser(student.getUser());
            existingStudent.setPhone(student.getPhone());
            existingStudent.setDateOfBirth(student.getDateOfBirth());
            existingStudent.setGender(student.getGender());
            existingStudent.setCollege(student.getCollege());
            existingStudent.setBranch(student.getBranch());
            existingStudent.setGraduationYear(student.getGraduationYear());
            existingStudent.setCgpa(student.getCgpa());
            existingStudent.setResumeUrl(student.getResumeUrl());
            existingStudent.setProfileSummary(student.getProfileSummary());
            existingStudent.setUpdatedAt(java.time.LocalDateTime.now());

            return studentRepository.save(existingStudent);
        }

        return null;
    }

    // Delete student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}