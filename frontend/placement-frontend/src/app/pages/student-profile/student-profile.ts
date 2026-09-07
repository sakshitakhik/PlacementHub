import { Component, OnInit } from '@angular/core';
import { Auth, User } from '../../services/auth';
import { Student } from '../../services/student';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentSkill } from '../../services/student-skill';
import { Skill, SkillData } from '../../services/skill';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit {
  user: User | null = null;
  student: any = null;

  skills: any[] = [];
  isSkillsLoading = false;

  availableSkills: SkillData[] = [];
  showAddSkill = false;
  selectedSkillId: number | null = null;

  isLoading = true;
  isSaving = false;

  successMessage = '';
  errorMessage = '';

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  toastTimeout: any;

  constructor(
    private auth: Auth,
    private studentService: Student,
    private studentSkillService: StudentSkill,
    private skillService: Skill
  ) { }

  ngOnInit(): void {

    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.errorMessage = 'User information not found';
      this.isLoading = false;
      return;
    }

    this.loadStudentProfile();

  }

  loadStudentProfile(): void {
    if (!this.user) {
      return;
    }

    this.studentService.getStudentByUserId(this.user.id).subscribe({
      next: (data) => {
        this.student = data;
        this.isLoading = false;
        this.loadStudentSkills();
        this.loadAvailableSkills();
      },
      error: (error) => {
        console.error('ERROR LOADING PROFILE:', error);
        this.errorMessage = 'Unable to load your profile.';
        this.isLoading = false;
      }
    });
  }

  updateProfile(): void {
    if (!this.student) {
      return;
    }

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.studentService.updateStudent(
      this.student.studentId,
      this.student
    ).subscribe({
      next: (updatedStudent) => {
        this.student = updatedStudent;
        this.isSaving = false;

        this.showToast(
          'Profile updated successfully.',
          'success'
        );
      },
      error: (error) => {
        console.error('ERROR UPDATING PROFILE:', error);
        this.isSaving = false;

        this.showToast(
          'Unable to update your profile.',
          'error'
        );
      }
    });
  }



  loadStudentSkills(): void {
    if (!this.student) {
      return;
    }

    this.isSkillsLoading = true;

    this.studentSkillService
      .getStudentSkillsByStudentId(this.student.studentId)
      .subscribe({
        next: (data) => {
          console.log('STUDENT ID:', this.student.studentId);
          console.log('SKILLS API RESPONSE:', data);

          this.skills = data;
          this.isSkillsLoading = false;
        },
        error: (error) => {
          console.error('ERROR LOADING SKILLS:', error);
          this.isSkillsLoading = false;
        }
      });
  }
  loadAvailableSkills(): void {
    this.skillService.getAllSkills().subscribe({
      next: (data) => {
        const addedSkillIds = this.skills.map(
          studentSkill => studentSkill.id.skillId
        );

        this.availableSkills = data.filter(
          skill => !addedSkillIds.includes(skill.skillId)
        );
      },
      error: (error) => {
        console.error('ERROR LOADING AVAILABLE SKILLS:', error);
      }
    });
  }






  addSkill(): void {

    if (!this.user || !this.student || this.selectedSkillId === null) {
      return;
    }

    this.studentSkillService
      .addStudentSkill(this.student.studentId, this.selectedSkillId)
      .subscribe({
        next: () => {
          this.selectedSkillId = null;
          this.showAddSkill = false;

          this.loadStudentSkills();

          this.showToast('Skill added successfully.', 'success');
        },
        error: (error) => {
          console.error('ERROR ADDING SKILL:', error);
          this.showToast('Unable to add skill.', 'error');
        }
      });
  }




  removeSkill(skillId: number): void {

    if (!this.student) {
      return;
    }

    this.studentSkillService
      .removeStudentSkill(this.student.studentId, skillId)
      .subscribe({
        next: () => {
          this.loadStudentSkills();
          this.showToast('Skill removed successfully.', 'success');
        },
        error: (error) => {
          console.error('ERROR REMOVING SKILL:', error);
          this.showToast('Unable to remove skill.', 'error');
        }
      });
  }



  showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }
}
