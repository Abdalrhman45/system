import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:5129/api/Auth/login', {
      username: this.username,
      password: this.password
    }, { responseType: 'text' }).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']); // وجهة بعد الدخول
      },
      error: () => {
        this.error = 'Invalid credentials';
      }
    });
  }
}
