import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface StudentSkillData {
  id: {
    studentId: number;
    skillId: number;
  };
  skill: {
    skillId: number;
    name: string;
  };
  student: any;
}
@Injectable({
  providedIn: 'root',
})
export class StudentSkill {
  private apiUrl = 'http://localhost:8080/student-skills';

  constructor(private http: HttpClient) { }

  getStudentSkillsByStudentId(
    studentId: number
  ): Observable<StudentSkillData[]> {
    return this.http.get<StudentSkillData[]>(
      `${this.apiUrl}/student/${studentId}`
    );
  }
  addStudentSkill(studentId: number, skillId: number): Observable<any> {
    return this.http.post(this.apiUrl, {
      id: {
        studentId: studentId,
        skillId: skillId
      },
      student: {
        studentId: studentId
      },
      skill: {
        skillId: skillId
      }
    });
  }


  removeStudentSkill(studentId: number, skillId: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/${studentId}/${skillId}`,
      { responseType: 'text' }
    );
  }
}
