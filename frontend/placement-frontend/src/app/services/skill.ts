import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface SkillData {
  skillId: number;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class Skill {
  private apiUrl = 'http://localhost:8080/skills';

  constructor(private http: HttpClient) { }

  getAllSkills(): Observable<SkillData[]> {
    return this.http.get<SkillData[]>(this.apiUrl);
  }
}
