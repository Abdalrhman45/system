import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  attendance: any[] = [];
  selectedSignature: File | null = null;
  uploadMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getMyAttendance();
  }

  getProfile() {
    this.employeeService.getMyProfile().subscribe({
      next: (data) => (this.user = data),
      error: () => alert('حدث خطأ أثناء تحميل البيانات'),
    });
  }

  getMyAttendance() {
    this.attendanceService.getMyAttendance().subscribe({
      next: (data) => (this.attendance = data),
      error: () => alert('تعذر تحميل الحضور'),
    });
  }

  onSignatureSelected(event: any) {
    this.selectedSignature = event.target.files[0];
  }

  uploadSignature() {
    if (!this.selectedSignature) return;
    const formData = new FormData();
    formData.append('signature', this.selectedSignature);

    this.attendanceService.uploadSignature(formData).subscribe({
      next: (res: any) => {
        this.user.signatureUrl = res.signatureUrl;
        this.uploadMessage = '✅ تم رفع التوقيع بنجاح';
        this.selectedSignature = null;
      },
      error: () => {
        this.uploadMessage = '❌ فشل في رفع التوقيع';
      },
    });
  }

  calcHours(start: string, end: string): string {
    if (!start || !end) return '—';
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.abs(e.getTime() - s.getTime()) / (1000 * 60 * 60);
    return diff.toFixed(2) + ' ساعة';
  }
}


// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/auth/auth.service';
// import { EmployeeService } from '../employee.service';
// import { AttendanceService } from '../attendance.service';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss'],
//   standalone: true,
//   imports: [] // أضف CommonModule و FormsModule في حالة الحاجة
// })
// export class ProfileComponent implements OnInit {
//   user: any = {};
//   attendance: any[] = [];
//   selectedSignature: File | null = null;
//   uploadMessage = '';
//   checkInMessage = '';
//   hasCheckedInToday = false;

//   constructor(
//     private authService: AuthService,
//     private employeeService: EmployeeService,
//     private attendanceService: AttendanceService
//   ) {}

//   ngOnInit(): void {
//     this.loadProfile();
//     this.loadAttendance();
//   }

//   loadProfile() {
//     this.employeeService.getMyProfile().subscribe({
//       next: (res) => this.user = res,
//       error: () => console.error('Failed to load profile')
//     });
//   }

//   loadAttendance() {
//     this.attendanceService.getMyWeeklyAttendance().subscribe({
//       next: (data) => {
//         this.attendance = data;
//         const today = new Date().toISOString().split('T')[0];
//         this.hasCheckedInToday = data.some(a => a.date.startsWith(today));
//       },
//       error: () => console.error('Failed to load attendance')
//     });
//   }

//   onSignatureSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedSignature = input.files[0];
//     }
//   }

//   uploadSignature() {
//     if (!this.selectedSignature) return;

//     const formData = new FormData();
//     formData.append('signature', this.selectedSignature);

//     this.employeeService.uploadSignature(formData).subscribe({
//       next: () => {
//         this.uploadMessage = '✅ تم رفع التوقيع بنجاح';
//         this.loadProfile();
//       },
//       error: () => {
//         this.uploadMessage = '❌ حدث خطأ أثناء رفع التوقيع';
//       }
//     });
//   }

//   checkIn() {
//     this.attendanceService.checkIn().subscribe({
//       next: (res) => {
//         this.checkInMessage = '✅ تم تسجيل الحضور بنجاح';
//         this.hasCheckedInToday = true;
//         this.loadAttendance();
//       },
//       error: (err) => {
//         this.checkInMessage = err.error?.message || '❌ لم يتم تسجيل الحضور';
//       }
//     });
//   }

//   calcHours(checkIn: string, checkOut: string): string {
//     if (!checkIn || !checkOut) return '—';
//     const inTime = new Date(checkIn);
//     const outTime = new Date(checkOut);
//     const diff = (outTime.getTime() - inTime.getTime()) / 1000 / 60 / 60;
//     return diff.toFixed(2) + ' ساعة';
//   }
// }
