import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, User } from '../../services/auth';
@Component({
  selector: 'app-student-dashboard',
  imports: [RouterLink],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboard {
  user: User | null = null;

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.router.navigate(['/login']);
    }

  }

  logout(): void {

    this.auth.logout();

    this.router.navigate(['/login']);

  }

}
