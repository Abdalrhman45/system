import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  loginError = ''; // ⛔ متغير للخطأ

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.isLoading = true;
    this.loginError = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        const role = this.authService.getRole(); // ⬅️ استخرج الدور
        this.isLoading = false;

        if (role === 'Admin') {
          this.router.navigate(['/dashboard']); // ⬅️ صفحة الأدمن
        } else {
          this.router.navigate(['/']); // ⬅️ الموظف العادي
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.loginError = 'بيانات الدخول غير صحيحة. حاول مرة أخرى.';
      }
    });
  }
}

// import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   username = '';
//   password = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   login(): void {
//     this.authService.login(this.username, this.password).subscribe({
//       next: (response) => {
//         localStorage.setItem('token', response.token);
//         this.router.navigate(['/']); // ✅ توجيه بعد تسجيل الدخول
//       },
//       error: (err) => {
//         console.error('Login failed', err);
//         // عرض رسالة خطأ للمستخدم
//       }
//     });
//   }
// }
