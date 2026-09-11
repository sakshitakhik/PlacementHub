import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface CompanyData {
  companyId: number;
  name: string;
  description: string;
  industry: string;
  location: string;
  website: string;
  createdAt: string | null;
  updatedAt: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class Company {
private apiUrl = 'http://localhost:8080/companies';

  constructor(private http: HttpClient) {}

  getCompanyById(id: number): Observable<CompanyData> {
    return this.http.get<CompanyData>(
      `${this.apiUrl}/${id}`
    );
  }

  updateCompany(
    id: number,
    company: any
  ): Observable<CompanyData> {

    return this.http.put<CompanyData>(
      `${this.apiUrl}/${id}`,
      company
    );
  }
}
