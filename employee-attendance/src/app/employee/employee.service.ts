import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'https://localhost:5001/api/employees';

  constructor(private http: HttpClient) {}

  // 🧑‍💼 جلب بيانات الموظف الحالي (المسجل حالياً)
  getMyProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`);
    
  }
  getMyProfile() {
    return this.http.get<any>('/api/employees/me');
  }
  

  // 📤 رفع توقيع الموظف
  uploadSignature(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload-signature`, formData);
  }

  // ✅ (Admin) جلب جميع الموظفين
  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // ✅ (Admin) جلب موظف حسب ID
  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // ✅ (Admin) إنشاء موظف جديد
  createEmployee(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  // ✅ (Admin) تعديل موظف
  updateEmployee(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, formData);
  }

  // ✅ (Admin) حذف موظف
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {
//   private baseUrl = 'https://localhost:7199/api/employees'; // عدّل الرابط حسب الـ backend

//   constructor(private http: HttpClient) {}

//   getMyProfile(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/me`);
//   }

//   uploadSignature(formData: FormData): Observable<any> {
//     return this.http.post(`${this.baseUrl}/upload-signature`, formData);
//   }
// }
