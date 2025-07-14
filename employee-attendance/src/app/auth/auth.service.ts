
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return (
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        payload['role'] || ''
      );
    } catch (e) {
      return '';
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // ← وجهه إلى صفحة تسجيل الدخول
  }

  getUserId(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['sub'] || '';
    } catch (e) {
      return '';
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserDetails(): any {
    const token = localStorage.getItem('token');
    if (!token) return {};

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        fullName: payload.name || payload.sub,
        phone: payload.phone,
        nationalId: payload.nationalId,
        age: payload.age,
        signature: payload.signature
      };
    } catch (e) {
      return {};
    }
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post('/api/auth/login', body); // ← عدّل المسار حسب API بتاعك
  }
}

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() {}

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   getRole(): string {
//     const token = this.getToken();
//     if (!token) return '';

//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return (
//         payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
//         payload['role'] || ''
//       );
//     } catch (e) {
//       console.error('Error decoding token:', e);
//       return '';
//     }
//   }

//   getUserId(): string {
//     const token = this.getToken();
//     if (!token) return '';

//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload['sub'] || '';
//     } catch (e) {
//       return '';
//     }
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//   }
// }
