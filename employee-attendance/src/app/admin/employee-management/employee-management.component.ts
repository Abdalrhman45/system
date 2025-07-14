import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {
  employees: any[] = [];
  editMode: boolean = false;
  employeeToEdit: any = null;
  editMessage: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  confirmDelete(id: number): void {
    if (confirm('هل أنت متأكد من حذف الموظف؟')) {
      this.employeeService.deleteEmployee(id).subscribe(() => this.loadEmployees());
    }
  }

  editEmployee(emp: any): void {
    this.editMode = true;
    this.editMessage = '';
    this.employeeToEdit = { ...emp }; // نسخة قابلة للتعديل
  }

  submitEdit(): void {
    if (!this.employeeToEdit.firstName || !this.employeeToEdit.lastName ||
        !this.employeeToEdit.phone || !this.employeeToEdit.nationalId || !this.employeeToEdit.age) {
      this.editMessage = '❌ جميع الحقول مطلوبة';
      return;
    }

    const formData = new FormData();
    for (let key in this.employeeToEdit) {
      if (this.employeeToEdit[key] !== null) {
        formData.append(key, this.employeeToEdit[key]);
      }
    }

    this.employeeService.updateEmployee(this.employeeToEdit.id, formData).subscribe({
      next: () => {
        this.editMessage = '✅ تم التعديل بنجاح';
        this.editMode = false;
        this.loadEmployees();
      },
      error: () => {
        this.editMessage = '❌ حدث خطأ أثناء التعديل';
      }
    });
  }

  openAddForm(): void {
    // هنضيفها لاحقًا
  }

  onEditSignatureSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.employeeToEdit.signature = file;
    }
  }
}
