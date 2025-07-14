import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmployee(formData: FormData) {
    return this.http.post('/api/employees', formData);
  }

  updateEmployee(id: number, formData: FormData) {
    return this.http.put(`/api/employees/${id}`, formData);
  }
}
  