import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: Auth,
    private router: Router
  ) { }
  login(): void {
    console.log('LOGIN BUTTON CLICKED')
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter your email and password';
      return;

    }
    this.isLoading = true;
    this.authService.login(this.email, this.password)
      .subscribe({
        next: (user) => {
          console.log('USER RECEIVED FROM BACKEND:', user);
          this.isLoading = false;
          if (!user) {
            this.errorMessage = 'Backend returned no user.';
            return;
          }
          this.authService.saveUser(user);
          if (user.role.toLowerCase() === 'student') {
            this.router.navigate(['/student-dashboard']);
          }
          else if (user.role.toLowerCase() === 'recruiter') {
            this.router.navigate(['/recruiter-dashboard']);
          }
          else {
            this.router.navigate(['/'])
          }
        },
        error: (error) => {

          this.isLoading = false;
          console.log('Login error:', error);
          if (error.status === 0) {
            this.errorMessage =
              'Unable to connect to the server. Please make sure Spring Boot is running.';
          }
          else {
            this.errorMessage = 'Invalid email or password';
          }
        }
      }
      );
  }
}
