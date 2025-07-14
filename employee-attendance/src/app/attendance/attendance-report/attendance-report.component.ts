import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../attendance.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attendance-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {
  attendanceRecords: any[] = [];
  selectedDate: string = '';
  role: string = '';
  checkInDisabled: boolean = false;
  checkInMessage: string = '';

  constructor(
    private attendanceService: AttendanceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole(); // استخراج الدور من JWT
    this.loadAttendance();
  }

  loadAttendance(): void {
    const filter = { date: this.selectedDate || undefined };

    if (this.role === 'Employee') {
      this.attendanceService.getMyAttendance(filter).subscribe(data => {
        this.attendanceRecords = data;
      });
    } else {
      this.attendanceService.getAllAttendance(filter).subscribe(data => {
        this.attendanceRecords = data;
      });
    }
  }

  onDateChange(date: string): void {
    this.selectedDate = date;
    this.loadAttendance();
  }

  checkIn(): void {
    this.checkInDisabled = true;
    this.attendanceService.checkIn().subscribe({
      next: (res: any) => {
        this.checkInMessage = res.message || 'تم تسجيل الحضور بنجاح.';
        this.loadAttendance();
      },
      error: (err) => {
        this.checkInMessage = err.error || 'حدث خطأ أثناء تسجيل الحضور.';
        this.checkInDisabled = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
