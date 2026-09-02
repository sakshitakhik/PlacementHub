import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Application{
  applicationId:number;
  student:any;
  job:any;
  status:string;
  appliedAt:string|null;
  updatedAt:string|null;
  coverLetter:string|null;
}
@Injectable({
  providedIn: 'root',
})
export class Application {
  private apiUrl='http://localhost:8080/applications';

  constructor(private http:HttpClient){}

  createApplication(application:any):Observable<Application>{
    return this.http.post<Application>(
      this.apiUrl,
      application
    );
  }

  getAllAplications():Observable<Application[]>{
    return this.http.get<Application[]>(
      this.apiUrl);
    
  }

  getApplicationById(id:number):Observable<Application>{
    return this.http.get<Application>(
      `${this.apiUrl}/${id}`
    );
  }
}
