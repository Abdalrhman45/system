import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl = 'https://localhost:5001/api/attendance';

  constructor(private http: HttpClient) {}

  getAllAttendance(filter?: { date?: string }): Observable<any[]> {
    let params = new HttpParams();
    if (filter?.date) {
      params = params.set('date', filter.date);
    }
    return this.http.get<any[]>(`${this.baseUrl}/all`, { params });
  }

  getMyAttendance(filter?: { date?: string }): Observable<any[]> {
    let params = new HttpParams();
    if (filter?.date) {
      params = params.set('date', filter.date);
    }
    return this.http.get<any[]>(`${this.baseUrl}/mine`, { params });
  }

  getMyWeeklyAttendance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my-weekly`);
  }

  checkIn() {
    return this.http.post(`${this.baseUrl}/check-in`, {});
  }

  uploadSignature(formData: FormData) {
    return this.http.post('/api/employees/upload-signature', formData);
  }
}


// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AttendanceService {
//   private baseUrl = 'https://localhost:5001/api/attendance';

//   constructor(private http: HttpClient) {}

//   getAllAttendance(filter?: { date?: string }): Observable<any[]> {
//     let params = new HttpParams();
//     if (filter?.date) {
//       params = params.set('date', filter.date);
//     }

//     return this.http.get<any[]>(`${this.baseUrl}/all`, { params });
//   }

//   getMyAttendance(filter?: { date?: string }): Observable<any[]> {
//     let params = new HttpParams();
//     if (filter?.date) {
//       params = params.set('date', filter.date);
//     }

//     return this.http.get<any[]>(`${this.baseUrl}/mine`, { params });
//   }

//   checkIn() {
//     return this.http.post('/api/attendance/check-in', {});
//   }

//   uploadSignature(formData: FormData) {
//     return this.http.post('/api/employees/upload-signature', formData);
//   }
// }
