import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {

    return this.http.post<User>(
      `${this.apiUrl}/login`,
      {
        email: email,
        password: password
      }
    );
  }

  saveUser(user: User): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {

    const user = sessionStorage.getItem('currentUser');

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }


  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: string): boolean {
    return this.getCurrentUser()?.role?.toUpperCase() === role.toUpperCase();
  }


  logout(): void {
    sessionStorage.removeItem('currentUser');
  }
}