import { Routes } from '@angular/router';
import { AttendanceReportComponent } from './attendance/attendance-report/attendance-report.component';
import { LoginComponent } from './auth/login/login.component';
import { Dashboard } from './dashboard/dashboard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './auth/auth-guard';
import { ProfileComponent } from './employee/profile.component';
import { EmployeeManagementComponent } from './admin/employee-management/employee-management.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '', component: AttendanceReportComponent, canActivate: [AuthGuard] },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: 'admin/employees', component: EmployeeManagementComponent }
  ];