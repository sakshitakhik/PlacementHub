import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
accountType: string = 'STUDENT';

name: string = '';
email: string = '';
password: string = '';
phone: string = '';

college: string = '';
branch: string = '';
graduationYear: number | null = null;

companyName: string = '';
industry: string = '';
location: string = '';
website: string = '';
designation: string = '';

message: string = '';
errorMessage: string = '';
isLoading: boolean = false;

private apiUrl = 'http://localhost:8080/register';

constructor(private http: HttpClient) {}

register(): void {
this.message = '';
this.errorMessage = '';

const request: any = {
  name: this.name.trim(),
  email: this.email.trim(),
  password: this.password,
  phone: this.phone,
  role: this.accountType,
};

if (this.accountType === 'STUDENT') {
  request.college = this.college;
  request.branch = this.branch;
  request.graduationYear = this.graduationYear;
} else {
  request.companyName = this.companyName;
  request.industry = this.industry;
  request.location = this.location;
  request.website = this.website;
  request.designation = this.designation;
}

this.isLoading = true;

this.http.post(this.apiUrl, request, { responseType: 'text' }).subscribe({
  next: (response) => {
    this.message = response;
    this.isLoading = false;
  },
  error: (error) => {
    this.errorMessage =
      typeof error.error === 'string'
        ? error.error
        : 'Registration failed. Please check the backend and try again.';

    this.isLoading = false;
  },
});

}
}
